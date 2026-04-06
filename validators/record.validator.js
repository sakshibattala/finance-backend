import { body } from "express-validator";

export const createRecordValidator = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category").notEmpty().withMessage("Category is required"),

  body("date").optional().isISO8601().withMessage("Invalid date format"),
];

export const updateRecordValidator = [
  body("amount").optional().isNumeric().withMessage("Amount must be a number"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Invalid type"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("date").optional().isISO8601().withMessage("Invalid date"),
];
