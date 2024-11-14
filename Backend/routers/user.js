import express from "express";
const router = express.Router();
import {
  registerNewCustomer,
  loginCustomer,
  confirmEmail,
  requestPasswordReset,
  passwordReset,
  termsAccepted,
  deleteUser,
  insertBulkData,
  FindLocation,
  getUserById,
  editUser,
  applyForPartner,
  logoutCustomer,
  markNotificationAsRead,
  ContactAdmin,
  changeAllUserPartnerStatuses,
  registerNewCustomerAdmin,
  getUsageHistory
} from "../controllers/user.js";

import { authMiddleware } from "../auth.js";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import multer from "multer";
import { compressImages } from "../middlewares/compressImages.js";
import { adminMiddleware } from "../adminAuth.js";
const s3 = new S3Client();

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
  { name: "profile_img", maxCount: 1 },
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
];

const singleFileUpload = multer({
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
    fileSize: 10 * 1024 * 1024, // Set to 10 MB for a single file, adjust as needed
  },
}).single("file");

router
  .route("/register")
  .post(upload.fields(imageFields), compressImages, registerNewCustomer);
router
  .route("/register-user-by-admin")
  .post(
    adminMiddleware,
    upload.fields(imageFields),
    compressImages,
    registerNewCustomerAdmin
  );
router.route("/login").post(loginCustomer);
router.route("/confirm-email").put(confirmEmail);
router.route("/request-reset-password").post(requestPasswordReset);
router.route("/resetpassword").post(passwordReset);
router.route("/contact-email").post(singleFileUpload, ContactAdmin);
router.route("/terms-accepted").post(authMiddleware, termsAccepted);
router.route("/get-user").get(authMiddleware, getUserById);
router
  .route("/update-user")
  .put(authMiddleware, upload.fields(imageFields), compressImages, editUser);
router.route("/delete-user").delete(authMiddleware, deleteUser);
router.route("/insert-bulk-data").post(insertBulkData);
router.route("/get-city").post(FindLocation);
router.route("/apply-for-partner").get(authMiddleware, applyForPartner);
router.post("/logout", logoutCustomer);
router.get(
  "/notifications/:notificationId/mark-as-read",
  authMiddleware,
  markNotificationAsRead
);
router.post("/change-user-statuses", changeAllUserPartnerStatuses);
router.get("/current-usage-history",authMiddleware, getUsageHistory);


export default router;
