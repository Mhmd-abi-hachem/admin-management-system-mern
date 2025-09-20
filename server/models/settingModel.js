import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  minBookingLength: Number,
  maxBookingLength: Number,
  maxGuestsPerBooking: Number,
  breakfastPrice: Number,
});

const Setting = mongoose.model("Setting", settingsSchema);

export default Setting;
