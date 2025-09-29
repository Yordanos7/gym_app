// gymapp/backend/src/routes/exerciseRoutes.ts

import { Router } from "express";
import * as exerciseController from "../controllers/exerciseController";

const router = Router();

// POST /api/exercises
// Creates a new exercise.
router.post("/", exerciseController.createExercise);

// GET /api/exercises/user/:userId
// Gets all exercises for a specific user.
router.get("/user/:userId", exerciseController.getExercisesByUserId);

// GET /api/exercises/:id
// Gets a single exercise by its ID.
router.get("/:id", exerciseController.getExerciseById);

// PUT /api/exercises/:id
// Updates an exercise.
router.put("/:id", exerciseController.updateExercise);

// DELETE /api/exercises/:id
// Deletes an exercise.
router.delete("/:id", exerciseController.deleteExercise);

export default router;
