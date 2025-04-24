const express = require('express');
const AWS = require('aws-sdk');
const OpenAI = require('openai'); // ✅ updated import
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const BUCKET = process.env.S3_BUCKET;

// Get presigned video URLs
app.get('/videos', async (req, res) => {
  const { Contents } = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
  const videos = await Promise.all(
    Contents.map(async (file) => {
      const url = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.Key,
        Expires: 60 * 5,
      });
      return { name: file.Key, url };
    })
  );
  res.json(videos);
});

// ✅ updated OpenAI client setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ updated API call syntax
app.post('/generate-script', async (req, res) => {
  const prompt = req.body.prompt;
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: `Generate a short, viral hook for: ${prompt}` }]
  });
  res.json({ script: completion.choices[0].message.content });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
