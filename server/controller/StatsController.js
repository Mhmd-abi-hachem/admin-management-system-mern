import Stat from "../models/StatsModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllStats = catchAsync(async (req, res, next) => {
  const Stats = await Stat.find().select("-__v");

  res.status(200).json({ status: "success", data: Stats });
});
