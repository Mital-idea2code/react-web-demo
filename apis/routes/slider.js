const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");
const Slider = require("../models/Slider");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/sliders");
  },
  filename: function (req, file, cb) {
    const ext =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, Date.now() + "." + ext);
  },
});
const upload = multer({ storage: storage });

router.post("/add", verifyToken, upload.single("image"), async (req, res) => {
  const slider = new Slider({
    image: req.file.filename,
  });

  try {
    const saveSlider = await slider.save();
    res.json(saveSlider);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

router.put(
  "/edit/:id",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    const slider = {
      image: req.file.filename,
    };

    if (req.file) {
      const imageData = await Slider.findById(req.params.id).select("image");

      const image = imageData.image;
      const path = "./images/sliders/" + image;
      var fs = require("fs");
      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {});
      }
    }
    try {
      const updateSlider = await Slider.updateOne(
        { _id: req.params.id },
        {
          $set: slider,
        }
      );
      res.json(updateSlider);
    } catch (err) {
      res.json({ message: err.message });
    }
  }
);

//delete
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const slider = await Slider.remove({ _id: req.params.id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// DELETE MULTIPLE SLIDERS
router.post("/multipleDelete", verifyToken, async (req, res) => {
  try {
    req.body.map(async (id1) => {
      const imageData = await Slider.findById(id1).select("image");
      const image = await imageData.image;
      const path = "./images/sliders/" + image;
      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {});
      }
    });

    const slider = await Slider.remove({ _id: { $in: req.body } });
    res.json(slider);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
