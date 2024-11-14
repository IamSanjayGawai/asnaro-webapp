import express from "express";
const router = express.Router();
import {
  RegisterParentDisplayId,
  getAllMainCategories,
  getSubcategoriesByCategoryId,
  setSortOrderForCategories,
  setSortOrderForCategoriesToZero,
} from "../controllers/Category.js"; 

router.get("/all", getAllMainCategories);
router.post("/register-parent-id", RegisterParentDisplayId);

router.get("/subcategories/:categoryId", getSubcategoriesByCategoryId);
router.post("/category-sort-rank-zero", setSortOrderForCategoriesToZero);
router.post("/category-sort-rank", setSortOrderForCategories);

export default router;
