import express from "express";
import {
  getLoginStatus,
  isLoggedIn,
  login,
  logout,
  protect,
  signup,
  updatePassword,
} from "../controller/authController.js";
import { updateMe, uploadUserPhoto } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/is-logged-in", isLoggedIn, getLoginStatus);

router.use(protect); // !! Protect middleware now is applied to all next middlewares down!!

router.patch("/updateMe", uploadUserPhoto, updateMe);
router.patch("/updateMyPassword", updatePassword);

export default router;
