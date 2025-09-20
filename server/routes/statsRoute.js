import express from "express";
import { getAllStats } from "../controller/StatsController.js";

const router = express.Router();

router.get("/", getAllStats);

export default router;
