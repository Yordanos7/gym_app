// gymapp/backend/src/routes/progressRoutes.ts

import { Router } from "express";
import * as progressController from "../controllers/progressController.ts";

const router = Router();

// POST /api/progress
// Creates a new progress entry.
router.post("/", progressController.createProgress);

// GET /api/progress/user/:userId
// Gets all progress entries for a specific user.
router.get("/user/:userId", progressController.getProgressByUserId);

// GET /api/progress/:id
// Gets a single progress entry by its ID.
router.get("/:id", progressController.getProgressById);

// PUT /api/progress/:id
// Updates a progress entry.
router.put("/:id", progressController.updateProgress);

// DELETE /api/progress/:id
// Deletes a progress entry.
router.delete("/:id", progressController.deleteProgress);

export default router;
