// Import necessary modules
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize the S3 Client with your region
const s3Client = new S3Client({ region: process.env.AWS_BUCKET_REGION });

const uploadBase64ImageToS3 = async (base64Image, bucketName, fileName) => {
  const matches = base64Image.match(/^data:(.+);base64,(.*)$/);
  if (!matches) {
    throw new Error("Invalid base64 string");
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, "base64");

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: mimeType,
  };

  module.exports = { uploadBase64ImageToS3 };

  const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command);
  return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
};
