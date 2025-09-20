import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  bookings: {
    type: Number,
    required: true,
    default: 0,
  },
  sales: {
    type: Number,
    required: true,
    default: 0,
  },
  checkIns: {
    type: Number,
    required: true,
    default: 0,
  },
  occupancyRate: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Stat = mongoose.model("Stat", statsSchema);

export default Stat;
