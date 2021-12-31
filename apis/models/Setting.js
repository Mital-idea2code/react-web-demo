const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
  about: {
    type: String,
  },
  address: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  instagram: {
    type: String,
  },
  googleplus: {
    type: String,
  },
});
module.exports = mongoose.model("Setting", SettingSchema);
