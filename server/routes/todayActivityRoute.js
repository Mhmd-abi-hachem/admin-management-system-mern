import express from "express";
import { getTodayActivity } from "../controller/todayActivityController.js";

const router = express.Router();

router.route("/").get(getTodayActivity);

export default router;
