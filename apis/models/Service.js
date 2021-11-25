const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  sub_title: {
    type: String,
    required: [true, "Sub title is required"],
  },
  desc: {
    type: String,
    required: [true, "Dsecription is required"],
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
