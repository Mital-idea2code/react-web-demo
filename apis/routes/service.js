const router = require("express").Router();
const Service = require("../models/Service");
const verifyToken = require("../helper/verifyToken");
const validate = require("../helper/validate");
const registrationSchema = require("../helper/expressValidator");
const { body, checkSchema, validationResult } = require("express-validator");
//Add service
router.post(
  "/add",
  verifyToken,
  // validate(checkSchema(registrationSchema)),
  async (req, res) => {
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     errors: errors.array(),
    //   });
    // }

    try {
      const service = await new Service(req.body);
      const saveService = await service.save();
      res.status(200).json(saveService);
    } catch (error) {
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

//edit

router.put("/edit/:id", verifyToken, async (req, res) => {
  try {
    const services = await Service.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          sub_title: req.body.sub_title,
          desc: req.body.desc,
        },
      }
    );
    res.json(services);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//list
router.get("/list", verifyToken, async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//delete
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const services = await Service.remove({ _id: req.params.id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//DELETE MULTIPLEUSER
router.post("/multipleService", verifyToken, async (req, res) => {
  try {
    const user = await Service.remove({ _id: { $in: req.body } });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

router.get("/topServices", verifyToken, async (req, res) => {
  try {
    const settings = await Service.find().sort({ x: 1 }).limit(4);
    res.json(settings);
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      res.status(400).json({ err: errors });
    }
  }
});
module.exports = router;
