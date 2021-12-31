const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const adminRoute = require("./routes/admin");
const serviceRoute = require("./routes/service");
const settingRoute = require("./routes/setting");
const sliderRoute = require("./routes/slider");
const teamRoute = require("./routes/team");
const bodyParser = require("body-parser");
const cors = require("cors");
// var multer = require('multer');
// var upload = multer();

app.use(cors());
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

app.use("/admin", adminRoute);
app.use("/service", serviceRoute);
app.use("/setting", settingRoute);
app.use("/slider", sliderRoute);
app.use("/team", teamRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.listen(4444);
