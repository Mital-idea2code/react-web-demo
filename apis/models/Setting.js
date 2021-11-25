const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
  about: {
    type: String,
  },
});
module.exports = mongoose.model("Setting", SettingSchema);
