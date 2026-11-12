const { body } = require("express-validator");

const taskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .trim(),
];

const taskUpdateValidation = [
  body("title")
    .optional()
    .trim(),

  body("description")
    .optional()
    .trim(),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be boolean"),
];

module.exports = {
  taskValidation,
  taskUpdateValidation,
};