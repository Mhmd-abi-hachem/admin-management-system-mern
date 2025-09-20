import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import configureCloudinary from "../config/cloudinary.js";

const cloudinary = configureCloudinary();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    format: async (req, file) => "jpeg",
    public_id: (req, file) => `user-${req.user.id}-${Date.now()}`,

    transformation: [
      { width: 250, height: 250, crop: "fill", gravity: "face" },
    ],
  },
});

const upload = multer({ storage: storage });

export const uploadUserPhoto = upload.single("avatar");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  if (!obj) return newObj;
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name");
  if (req.file) filteredBody.avatar = req.file.path;

  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
