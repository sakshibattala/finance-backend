import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

import {
  createRecordValidator,
  updateRecordValidator,
} from "../validators/record.validator.js";

import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// create => admin only
router.post(
  "/",
  allowRoles("admin"),
  createRecordValidator,
  validate,
  createRecord,
);

// view => all roles
router.get("/", allowRoles("admin", "analyst", "viewer"), getRecords);

// update => admin only
router.patch(
  "/:id",
  allowRoles("admin"),
  updateRecordValidator,
  validate,
  updateRecord,
);

// delete => admin only
router.delete("/:id", allowRoles("admin"), deleteRecord);

export default router;
