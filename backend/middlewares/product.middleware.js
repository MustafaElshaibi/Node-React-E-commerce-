const { body } = require("express-validator");

const updateProductMiddleware = () => {
  return [
    body("title")
      .optional()
      .notEmpty().withMessage("Title is required")
      .isLength({ min: 2 }).withMessage("Title must be at least 2 characters long"),
    body("price")
      .optional()
      .notEmpty().withMessage("Price is required")
      .isNumeric().withMessage("Price must be a number"),
    body("image")
      .optional()
      .notEmpty().withMessage("Image is required")
      .isURL().withMessage("Image must be a valid URL"),
    body("description")
      .optional()
      .notEmpty().withMessage("Description is required"),
    body("brand")
      .optional()
      .notEmpty().withMessage("Brand is required"),
    body("model")
      .optional()
      .notEmpty().withMessage("Model is required"),
    body("color")
      .optional()
      .notEmpty().withMessage("Color is required"),
    body("category")
      .optional()
      .notEmpty().withMessage("Category is required"),
    body("popular")
      .optional()
      .isBoolean().withMessage("Popular must be a boolean"),
    body("discount")
      .optional()
      .isNumeric().withMessage("Discount must be a number"),
    body("colors")
      .optional()
      .isArray().withMessage("Colors must be an array of strings"),
    body("rating")
      .optional()
      .isNumeric().withMessage("Rating must be a number"),
    body("edition")
      .optional()
      .notEmpty().withMessage("Edition is required"),
  ];
};

const addProductMiddleware = () => {
  return [
    body("title")
      .notEmpty().withMessage("Title is required")
      .isLength({ min: 2 }).withMessage("Title must be at least 2 characters long"),
    body("price")
      .notEmpty().withMessage("Price is required")
      .isNumeric().withMessage("Price must be a number"),
    body("description")
      .notEmpty().withMessage("Description is required"),
    body("brand")
      .notEmpty().withMessage("Brand is required"),
    body("model")
      .notEmpty().withMessage("Model is required"),
    body("color")
      .notEmpty().withMessage("Color is required"),
    body("category")
      .notEmpty().withMessage("Category is required"),
    body("popular")
      .optional()
      .isBoolean().withMessage("Popular must be a boolean"),
    body("discount")
      .optional()
      .isNumeric().withMessage("Discount must be a number"),
    body("colors")
      .optional()
      .isArray().withMessage("Colors must be an array of strings"),
    body("rating")
      .optional()
      .isNumeric().withMessage("Rating must be a number"),
    body("edition")
      .notEmpty().withMessage("Edition is required"),
  ];
};

module.exports = {
  updateProductMiddleware,
  addProductMiddleware
};