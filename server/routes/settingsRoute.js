import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controller/settingsController.js";

const router = express.Router();

router.route("/").get(getSettings);

router.route("/:id").patch(updateSettings);

export default router;
