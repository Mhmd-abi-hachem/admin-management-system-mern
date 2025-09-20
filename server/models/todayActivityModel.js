import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  nationalID: Number,
  nationality: String,
  countryFlag: String,
  status: String,
  numNights: Number,
});

const TodayActivity = mongoose.model("TodayActivity", guestSchema);

export default TodayActivity;
