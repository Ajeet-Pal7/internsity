const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

app.post("/upload", upload.single("image"), async (req, res) => {
  try {

    const file = req.file;

    const command = new PutObjectCommand({
      Bucket: "profile-photos",
      Key: `images/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    });

    await s3.send(command);

    res.json({
      message: "Image uploaded successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(3000, () => console.log("Server started"));