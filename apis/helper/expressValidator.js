const { body, checkSchema, validationResult } = require("express-validator");
const registrationSchema = {
  name: {
    notEmpty: true,
    errorMessage: "Name cannot be empty",
  },
};
