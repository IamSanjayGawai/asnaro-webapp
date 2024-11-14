// sesUtils.ts

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const region = process.env.AWS_REGION || "";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";

const sesClient = new SESClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const sendEmail = async (emailParams) => {
  try {
    console.log("This", region, accessKeyId, secretAccessKey);
    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// You can add more SES-related utility functions here like example for image upload

// Initialize the S3 Client with your region
const s3Client = new S3Client({ region: process.env.AWS_BUCKET_REGION });

// export const uploadBase64ImageToS3 = async (
//   base64Image,
//   bucketName,
//   fileName
// ) => {
//   const matches = base64Image.match(/^data:(.+);base64,(.*)$/);
//   if (!matches) {
//     throw new Error("Invalid base64 string");
//   }

//   const mimeType = matches[1];
//   const base64Data = matches[2];
//   const buffer = Buffer.from(base64Data, "base64");

//   const uploadParams = {
//     Bucket: bucketName,
//     Key: fileName,
//     Body: buffer,
//     ContentType: mimeType,
//   };

//   const command = new PutObjectCommand(uploadParams);
//   await s3Client.send(command);
//   return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
// };

export const uploadBase64ImageToS3 = async (base64Image, bucketName, fileName) => {
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
  const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command);
  return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
};


export const deleteImageFromS3 = async (imagePath) => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const key = extractKeyFromPath(imagePath); // Extract the key (file name) from the image path

    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
   
  } catch (error) {
    console.error(`Error deleting image from S3: ${error}`);
    throw error; // Rethrow the error for handling at a higher level (if needed)
  }
};

// Helper function to extract the key from the image path
function extractKeyFromPath(path) {
  const urlParts = path.split("/");
  return urlParts[urlParts.length - 1]; // Return the last part (key)
}

export const uploadChatAttachmentToS3 = async (bucketName, filename, file) => {
  const folderName = "chat_attachments";
  const uploadParams = {
    Bucket: bucketName,
    Key: `${folderName}/${filename}`,
    Body: file,
  };

  const command = new PutObjectCommand(uploadParams);
  try {
    await s3Client.send(command);
    return `https://${bucketName}.s3.amazonaws.com/${folderName}/${filename}`;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};

// aws.js
export const uploadContactAttachmentToS3 = async (
  fileName,
  bucketName,
  fileBuffer,
  mimeType
) => {
  const folderName = "contact_attachments";
  const uploadParams = {
    Bucket: bucketName,
    Key: `${folderName}/${fileName}`,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  const command = new PutObjectCommand(uploadParams);
  try {
    await s3Client.send(command);
    return `https://${bucketName}.s3.amazonaws.com/${folderName}/${fileName}`;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};
