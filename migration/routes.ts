import express from "express";
import { migrationController } from "./controllers";

const router = express.Router();

router.post("/", migrationController);

export default router;
