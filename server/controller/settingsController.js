import Setting from "../models/settingModel.js";

export const getSettings = async (req, res) => {
  const settings = await Setting.findOne().select("-__v");

  res.status(200).json({ status: "success", data: settings });
};

export const updateSettings = async (req, res) => {
  const setting = await Setting.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!setting) throw new Error("No setting found with that ID");

  res.status(200).json({
    status: "success",
    data: {
      setting,
    },
  });
};
