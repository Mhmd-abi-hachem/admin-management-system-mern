import mongoose from "mongoose";

const cabinSchema = new mongoose.Schema({
  cabinName: {
    type: String,
    required: [true, "A cabin must have a name"],
    unique: true,
    maxlength: [20, "A cabin name must have less or equal than 20 characters"],
  },
  maxCapacity: {
    type: Number,
    required: [true, "A cabin must have a maximum capacity"],
  },
  price: {
    type: Number,
    required: [true, "A cabin must have a price"],
  },
  discount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this. here points to the current doc (works on New document creation only!!)
        if (this.price == null) return true; // For patch updates
        return val < this.price; // eg: val= 100 < price= 200
      },
      message: "Discount price ({VALUE}) should be less than actual price",
    },
  },

  description: String,

  cabinImage: String,
});

const Cabin = mongoose.model("Cabin", cabinSchema);

export default Cabin;
