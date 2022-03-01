const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let adsSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    screens: {
      type: String,
    },
    duration: {
      type: String,
    },
  },
  {
    collection: "holidayAds",
  }
);

module.exports = mongoose.model("Ad", adsSchema);
