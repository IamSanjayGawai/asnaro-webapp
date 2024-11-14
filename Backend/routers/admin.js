import express from "express";
import {
  getAllAdmin,
  createAdmin,
  loginAdmin,
  adminUpdateUser,
  applyForPartner,
  downloadCSVofProcessList,
  addTax,
  upperAmountLimits,
  createDefaultUsage,
  createNewsAdmin,
  getAllApprovedPartners,
  applyForPartnerAdminSide,
  logoutAdmin,
  getAllPartners,
  companyInfoListSearch,
  searchProcessAdmin,
  getAllinquiriesAdmin,
  deleteEnquiryAdmin,
  deleteUsage,
  getUserById,
  getUsersByIds,
  getDefaultUsage,
  updateUsage,
  updateDeliveryFlag,
  getAllMailTemplates,
  updateNewsPrivacyAdmin,
  applyRemoveForPartner,
  getAllComponies,
  updateNewsAdmin,
  getTax,
  orderSearchAdmin,
  createParentCategory,
  createSubCategory,
  updateCategory,
  getAllCategories,
  deleteCategoryById,
  getAllOrdersAdmin,
  changeTransactionDetailsAdmin,
  getTransactionDetailsAdmin,
  getupperAmountLimits,
  createCommercialAct,
  getCommercialAct,
  fetchTransactionForAdminView,
  updateMailTemplate,
  makeDefaultUsage,
  deletedCompanies,
  deletedOrders,
  deleteProcesses,
  addTaxAndSystemFeeToDatabase,
} from "../controllers/Admin.js";
const router = express.Router();
import { authMiddleware } from "../auth.js";
import { adminMiddleware } from "../adminAuth.js";
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

const imageFields = [{ name: "img1", maxCount: 1 }];

const imageField = { name: "image", maxCount: 1 };

const imageFieldsUpdateUser = [
  { name: "profile_img", maxCount: 1 },
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

    next();
  } catch (error) {
    // Handle any errors
    console.error("Error compressing images:", error);
    res.status(500).json({ error: "Error compressing images" });
  }
};

router.get("/all", getAllAdmin);
router.post("/create-admin", createAdmin);
router.post("/login", loginAdmin);
router.get("/get-all-approved-partners", getAllApprovedPartners);
router.get("/get-all-componies", getAllComponies);
router.get("/get-all-partners", getAllPartners);
router.post(
  "/applyremove-partners-admin",
  adminMiddleware,
  applyRemoveForPartner
);
router.post("/search-comapnyinfo-admin", companyInfoListSearch);
router.post("/search-process-admin", searchProcessAdmin);
router.post(
  "/apply-for-partners-admin",
  adminMiddleware,
  applyForPartnerAdminSide
);
router.put(
  "/update-user/:id",
  adminMiddleware,
  upload.fields(imageFieldsUpdateUser),
  adminUpdateUser
);

router.post("/logout", logoutAdmin);
router.get("/all/inquiries", getAllinquiriesAdmin);
router.post("/delete/enquiry/:id", deleteEnquiryAdmin);
router.get("/get-user-by-id-admin/:id", getUserById);
router.post(
  "/add-news-admin",
  upload.single(imageFields),
  compressImages,
  createNewsAdmin
);
router.post(
  "/update-news-admin/:id",
  upload.single(imageField),
  compressImages,
  updateNewsAdmin
);
router.post("/upper-amount-limit", upperAmountLimits);
router.get("/get-upperlimits", getupperAmountLimits);
router.post("/add-tax", addTax);
router.get("/get-tax", getTax);
router.post("/default-usage", createDefaultUsage);
router.post("/download/csv", downloadCSVofProcessList);
router.get("/default-usages", getDefaultUsage);
router.patch("/update-usage/:id", updateUsage);
router.delete("/delete-usage/:id", deleteUsage);
router.post("/make-default-usage/:id", makeDefaultUsage);
router.patch("/news/:id/delivery-flag", updateDeliveryFlag);
router.get("/update-news/privacy/:id", updateNewsPrivacyAdmin);
router.get("/mail-templates", adminMiddleware, getAllMailTemplates);
router.put("/update-mail-template", updateMailTemplate);
router.post("/companyInfosearch", companyInfoListSearch);
router.post("/search-orders", adminMiddleware, orderSearchAdmin);
router.post("/create-categories", createParentCategory);
router.post("/create-subcategorie", createSubCategory);
router.post("/edit-categories/:id", updateCategory);
router.get("/getall-categories", getAllCategories);
router.delete("/category-delete/:id", deleteCategoryById);
router.get(
  "/get-transaction-details/:transactionId",
  adminMiddleware,
  getTransactionDetailsAdmin
);
router.get(
  "/fetch-transaction-view/:transactionId",
  adminMiddleware,
  fetchTransactionForAdminView
);
router.post("/get-all-orders", adminMiddleware, getAllOrdersAdmin);
router.put(
  "/change-transaction-details/:transactionId",
  adminMiddleware,
  changeTransactionDetailsAdmin
);
router.post("/create-commercial-act", createCommercialAct);
router.get("/get-commercial-act", getCommercialAct);
router.post("/delete/company-info", deletedCompanies);
router.post("/delete/order-info", deletedOrders);
router.post("/delete/process", deleteProcesses);
router.get("/get-all-users", getUsersByIds);
router.post("/upload-tax-fee", addTaxAndSystemFeeToDatabase);

export default router;
