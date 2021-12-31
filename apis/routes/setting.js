const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");
const validate = require("../helper/validate");
const Setting = require("../models/Setting");

//updtae about us
router.put("/updateSetting/:id", verifyToken, async (req, res) => {
  try {
    // const setting = await new Setting(req.body);
    // const saveService = await setting.save();
    // res.status(200).json(saveService);
    const Settings = await Setting.updateOne(
      { _id: req.params.id },
      {
        $set: {
          about: req.body.about,
        },
      }
    );
    res.json(Settings);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.status(400).json({ error: errors });
    }
  }
});

// get all settings
router.get("/allSettings", verifyToken, async (req, res) => {
  try {
    const settings = await Setting.find();
    res.json(settings);
  } catch (err) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.status(400).json({ error: errors });
    }
  }
});

//updtae about us
router.put("/updateConatctSetting/:id", verifyToken, async (req, res) => {
  try {
    const Settings = await Setting.updateOne(
      { _id: req.params.id },
      {
        $set: {
          address: req.body.address,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          linkedin: req.body.linkedin,
          instagram: req.body.instagram,
          googleplus: req.body.googleplus,
        },
      }
    );
    res.json(Settings);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.status(400).json({ error: errors });
    }
  }
});

module.exports = router;
