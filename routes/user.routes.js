import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  updateUser,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  createUserValidator,
  loginValidator,
  updateUserValidator,
} from "../validators/user.validator.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/", createUserValidator, validate, createUser);

router.post("/login", loginValidator, validate, loginUser);

router.get("/", authMiddleware, allowRoles("admin"), getAllUsers);

router.patch(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  updateUserValidator,
  validate,
  updateUser,
);

export default router;
