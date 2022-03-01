const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let adminSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    collection: "admin",
  }
);

module.exports = mongoose.model("Admin", adminSchema);
