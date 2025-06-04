import { RequestHandler, Router } from "express";
import {
  enrollInCourse,
  withdrawFromCourse,
  getMyCourses,
} from "../controllers/enrollmentController";
import { requireAuth, requireRole } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/enroll",
  requireAuth as RequestHandler,
  requireRole("STUDENT") as RequestHandler,
  enrollInCourse as RequestHandler
);
router.post(
  "/withdraw",
  requireAuth as RequestHandler,
  requireRole("STUDENT") as RequestHandler,
  withdrawFromCourse
);
router.get(
  "/my-courses",
  requireAuth as RequestHandler,
  requireRole("STUDENT") as RequestHandler,
  getMyCourses
);

export default router;
