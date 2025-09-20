import express from "express";
import {
  createCabin,
  deleteCabin,
  getAllCabins,
  updateCabin,
  uploadUserPhoto,
} from "../controller/cabinController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllCabins).post(uploadUserPhoto, createCabin);

router.route("/:id").patch(uploadUserPhoto, updateCabin).delete(deleteCabin);

export default router;
