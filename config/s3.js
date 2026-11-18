require('dotenv').config();

const {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand,
} = require("@aws-sdk/client-s3");

const bucket = process.env.S3_BUCKET;

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "eu-weste-3",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

async function initializeStorage() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`Successfully connected to bucket '${bucket}'.`);
  } catch (error) {
    if (
      error.$metadata?.httpStatusCode !== 404 &&
      error.name !== "NotFound" &&
      error.name !== "NoSuchBucket"
    ) {
      throw error;
    }

    await s3.send(new CreateBucketCommand({ Bucket: bucket }));
    console.log(`No S3 bucket found, S3 bucket '${bucket}' created.`);
  }
}

module.exports = {
  s3,
  initializeStorage,
};