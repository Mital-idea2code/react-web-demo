const router = require("express").Router();
const Team = require("../models/Team");
const verifyToken = require("../helper/verifyToken");
const validate = require("../helper/validate");
const { body, checkSchema, validationResult } = require("express-validator");
var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/team");
  },
  filename: function (req, file, cb) {
    const ext =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });

//Add team
router.post("/add", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const team = new Team({
      name: req.body.name,
      position: req.body.position,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      instagram: req.body.instagram,
      googleplus: req.body.googleplus,
      image: req.file ? req.file.filename : "",
    });
    const saveTeam = await team.save();
    res.status(200).json(saveTeam);
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

//Edit team
router.post(
  "/edit/:id",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    if (req.file) {
      const imageData = await Team.findById(req.params.id).select("image");

      const image = imageData.image;
      const path = "./images/team/" + image;
      var fs = require("fs");
      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {});
      }
      const team_img = await Team.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { image: req.file.filename },
        }
      );
    }
    try {
      const team = await Team.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body,
        }
      );
      res.status(200).json(team);
    } catch (err) {
      if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        res.status(400).json({ error: errors });
      }
    }
  }
);

//delete
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const slider = await Team.remove({ _id: req.params.id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// DELETE MULTIPLE SLIDERS
router.post("/multipleDelete", verifyToken, async (req, res) => {
  try {
    req.body.map(async (id1) => {
      const imageData = await Team.findById(id1).select("image");
      const image = await imageData.image;
      const path = "./images/team/" + image;
      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {});
      }
    });

    const team = await Team.remove({ _id: { $in: req.body } });
    res.json(team);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
