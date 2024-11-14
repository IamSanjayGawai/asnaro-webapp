// routes/newsRoutes.js
import express from 'express';
import { createNews, getAllNews,getNotificationsByUserId ,updateNotificationReadStatus,getNewsById, getAllNewsAdmin,searchNotificationAdmin, searchNotificationUser} from '../controllers/news.js';
// import { authMiddleware } from '../middlewares/adminMiddleware.js';
import { authMiddleware } from "../auth.js";
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import multer from "multer";
import sharp from "sharp"; // Import sharp for image compression
import { Buffer } from "buffer";
const s3 = new S3Client();


// Multer middleware for uploading images to S3
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (_req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (_req, file, cb) {
        const fileName = Date.now().toString() + "-" + file.originalname;
        cb(null, fileName);
      },
    }),
    limits: {
      fileSize: 100 * 1024 * 1024, // Set to 100 MB, adjust as needed
      fieldNameSize: 1000, // Max field name size
      fieldSize: 100 * 1024 * 1024, // Max field size
    },
  });
  
  const imageFields = [
    { name: "img1", maxCount: 1 }
  ];
  
  // Middleware function for image compression
  const compressImages = async (req, res, next) => {
    try {
      // Function to compress base64 image
      const compressBase64Image = async (base64Image) => {
        const imgBuffer = Buffer.from(base64Image.split(",")[1], "base64"); // Convert base64 string to buffer
        const compressedImgBuffer = await sharp(imgBuffer)
          .jpeg({ quality: 60 }) // Convert to JPEG format with 70% quality
          .toBuffer();
        return `data:image/jpeg;base64,${compressedImgBuffer.toString("base64")}`; // Return compressed base64 image
      };
  
      // Check if img1 exists in request body
      if (req.body && req.body.img1) {
        console.log("running!");
        req.body.img1 = await compressBase64Image(req.body.img1);
      }
  
  
      next();
    } catch (error) {
      // Handle any errors
      console.error("Error compressing images:", error);
      res.status(500).json({ error: "Error compressing images" });
    }
  };
  



const router = express.Router();
// Route for adding news (accessible only to admin)
router.post('/add-news',upload.single(imageFields),compressImages,createNews);

// Route for getting all news (publicly accessible)
router.get('/all-news', getAllNews);

// Route for getting all news (publicly accessible)
router.get('/all-news-admin', getAllNewsAdmin);


router.get('/get-by-id/:id', getNewsById);

router.put('/update-notification/:notificationId',authMiddleware, updateNotificationReadStatus);

router.get('/news-notification',authMiddleware, getNotificationsByUserId);
router.post('/search-notification-admin',searchNotificationAdmin);
router.post('/search-notification-user',searchNotificationUser);


export default router;
