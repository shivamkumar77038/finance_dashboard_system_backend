import { body } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().withMessage("Name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Min 6 chars"),
];

export const recordValidator = [
  body("amount").isNumeric().withMessage("Amount must be number"),
  body("type").isIn(["income", "expense"]),
  body("category").notEmpty().withMessage("Category required"),
];