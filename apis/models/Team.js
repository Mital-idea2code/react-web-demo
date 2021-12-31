const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  googleplus: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Team", TeamSchema);
