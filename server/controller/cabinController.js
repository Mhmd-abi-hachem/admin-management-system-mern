import express from "express";
import multer from "multer";

import Cabin from "../models/cabinModel.js";
import configureCloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinary = configureCloudinary();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cabins",
    format: async (req, file) => "jpeg",
    public_id: (req, file) => `user-${req.user.id}-${Date.now()}`,

    transformation: [
      { width: 250, height: 250, crop: "fill", gravity: "face" },
    ],
  },
});

const upload = multer({ storage: storage });

export const uploadUserPhoto = upload.single("cabinImage");

export const getAllCabins = async (req, res) => {
  const cabins = await Cabin.find().sort({ cabinName: 1 }).select("-__v");

  res.status(200).json({ status: "success", data: cabins });
};

export const createCabin = async (req, res) => {
  const { cabinName, price, maxCapacity, discount, description, cabinImage } =
    req.body;

  if (
    !cabinName ||
    !price ||
    !maxCapacity ||
    !description ||
    discount === undefined ||
    discount === null
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newCabin = await Cabin.create({
    cabinName,
    price,
    maxCapacity,
    discount,
    description,
    cabinImage: req.file?.path,
  });

  res.status(201).json({
    status: "success",
    data: {
      cabin: newCabin,
    },
  });
};

export const updateCabin = async (req, res, next) => {
  if (req.file) {
    req.body.cabinImage = req.file.path;
  }

  const cabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cabin) throw new Error("No cabin found with that ID");

  res.status(200).json({
    status: "success",
    data: {
      cabin,
    },
  });
};

export const deleteCabin = async (req, res, next) => {
  const cabin = await Cabin.findByIdAndDelete(req.params.id);

  if (!cabin) throw new Error("No cabin found with that ID");

  res.status(204).json({
    status: "success",
    data: null,
  });
};
