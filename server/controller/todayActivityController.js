import TodayActivity from "../models/todayActivityModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getTodayActivity = catchAsync(async (req, res, next) => {
  const todayActivity = await TodayActivity.find().select("-__v");

  res.status(200).json({ status: "success", data: todayActivity });
});
