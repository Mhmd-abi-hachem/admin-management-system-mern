import mongoose from "mongoose";

import Setting from "./models/settingModel.js";
import Cabin from "./models/cabinModel.js";

// initial clean data
const initialCabins = [
  {
    cabinName: "001",
    maxCapacity: 3,
    price: 250,
    discount: 0,
    description:
      "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001.",
    cabinImage: "cabins/cabin-001.jpg",
  },
  {
    cabinName: "002",
    maxCapacity: 2,
    price: 350,
    discount: 25,
    description:
      "Escape to the serenity of nature and indulge in luxury in our cozy cabin 002.",
    cabinImage: "cabins/cabin-002.jpg",
  },
  {
    cabinName: "003",
    maxCapacity: 4,
    price: 300,
    discount: 10,
    description:
      "Experience luxury family living in our medium-sized wooden cabin 003.",
    cabinImage: "cabins/cabin-003.jpg",
  },
  {
    cabinName: "004",
    maxCapacity: 4,
    price: 500,
    discount: 50,
    description:
      "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004.",
    cabinImage: "cabins/cabin-004.jpg",
  },
];

const initialSettings = {
  minBookingLength: 5,
  maxBookingLength: 90,
  maxGuestsPerBooking: 8,
  breakfastPrice: 15,
};

//  reset and re-seed function
const resetAndSeedDB = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "Mongoose is not connected. Please ensure the main DB connection is established before calling the seeder."
      );
      return;
    }

    // wipe data
    await Cabin.deleteMany();
    await Setting.deleteMany();

    // insert the initial data
    await Cabin.create(initialCabins);
    await Setting.create(initialSettings);
  } catch (err) {
    console.error(`ERROR seeding database: ${err.message}`);
  }
};

export default resetAndSeedDB;
