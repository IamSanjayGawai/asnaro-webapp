import express from "express";
const router = express.Router();
import {
  RegisterPrefId,
  getAllStates,
  getAreaAndCitiesByState,
  getUniqueCities,
} from "../controllers/City.js";

// Define routes
// In cityRoutes.js
router.get("/states", getAllStates);
router.post("/register-pref-id", RegisterPrefId);
router.get("/cities/:state", getUniqueCities);
router.get("/areas-city/:state", getAreaAndCitiesByState);

export default router;
