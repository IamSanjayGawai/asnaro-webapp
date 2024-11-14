import express from "express";
const router = express.Router();
import {
  addProcess,
  getProcessesByUser,
  getByIdProcess,
  updateProcess,
  getAllDataWithPagination,
  getRecommendedProcesses,
  getUserAndProcessData,
  getProcessesByUserWithReleaseStatus,
  getProcessesByUserWithPrivateStatus,
  changeProcessStatus,
  totalProcessCount,
  searchProcesses,
  AdvanceSearchProcesses,
  getTopKeywordsLast30Days,
  searchProcessesTest,
  getAllProcessesAdmin,
  addProcessAdmin,
} from "../controllers/Process.js";
import { authMiddleware } from "../auth.js";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import multer from "multer";
import sharp from "sharp"; // Import sharp for image compression
import { Buffer } from "buffer";
import { adminMiddleware } from "../adminAuth.js";
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

// Define fields for images
const imageFields = [
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
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

    // Repeat the process for img2
    if (req.body && req.body.img2) {
      req.body.img2 = await compressBase64Image(req.body.img2);
    }

    // Repeat the process for img3
    if (req.body && req.body.img3) {
      req.body.img3 = await compressBase64Image(req.body.img3);
    }

    next();
  } catch (error) {
    // Handle any errors
    console.error("Error compressing images:", error);
    res.status(500).json({ error: "Error compressing images" });
  }
};

// Route for adding a new process
router
  .route("/add")
  .post(authMiddleware, upload.fields(imageFields), compressImages, addProcess);
router
  .route("/add-admin")
  .post(
    adminMiddleware,
    upload.fields(imageFields),
    compressImages,
    addProcessAdmin
  );
router.get("/user-processes", authMiddleware, getProcessesByUser);
router.get(
  "/released-processes",
  authMiddleware,
  getProcessesByUserWithReleaseStatus
);
router.get(
  "/private-processes",
  authMiddleware,
  getProcessesByUserWithPrivateStatus
);
router.put("/update-process-status", authMiddleware, changeProcessStatus);
router.get("/total-processes", authMiddleware, totalProcessCount);
router.get("/get-by-id/:id", getByIdProcess);
router.put(
  "/update/:id",
  authMiddleware,
  upload.fields(imageFields),
  compressImages,
  updateProcess
);
router.put(
  "/update-admin/:id",
  adminMiddleware,
  upload.fields(imageFields),
  compressImages,
  updateProcess
);
router.get("/get-all-processes", getAllDataWithPagination);
router.get("/recommended-processes", getRecommendedProcesses);
router.get("/users/:userId", getUserAndProcessData);
router.post("/search", searchProcessesTest);
router.get("/search-test", searchProcessesTest);
router.get("/advance-search", AdvanceSearchProcesses);
router.get("/top-hot-words", getTopKeywordsLast30Days);
router.get("/get-all-processes-admin", getAllProcessesAdmin);

export default router;
