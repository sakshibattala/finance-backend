import express from "express";
import {
  getSummary,
  getCategoryTotals,
  getRecentActivity,
  getMonthlyTrends,
} from "../controllers/dashboard.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// all roles can view dashboard
router.get("/summary", allowRoles("admin", "analyst", "viewer"), getSummary);

router.get("/categories", allowRoles("admin", "analyst"), getCategoryTotals);

router.get("/recent", allowRoles("admin", "analyst", "viewer"), getRecentActivity);

router.get("/trends", allowRoles("admin", "analyst"), getMonthlyTrends);

export default router;