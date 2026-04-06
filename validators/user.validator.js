import { body } from "express-validator";

export const createUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .optional()
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Invalid role"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

export const updateUserValidator = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),

  body("email").optional().isEmail().withMessage("Invalid email"),

  body("role")
    .optional()
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Invalid role"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Invalid status"),
];
