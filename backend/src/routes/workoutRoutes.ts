// gymapp/backend/src/routes/workoutRoutes.ts

import { Router } from "express";
import * as workoutController from "../controllers/workoutController";

const router = Router();

// POST /api/workouts
// Creates a new workout.
router.post("/", workoutController.createWorkout);

// GET /api/workouts/user/:userId
// Gets all workouts for a specific user.
router.get("/user/:userId", workoutController.getWorkoutsByUserId);

// GET /api/workouts/:id
// Gets a single workout by its ID.
router.get("/:id", workoutController.getWorkoutById);

// DELETE /api/workouts/:id
// Deletes a workout.
router.delete("/:id", workoutController.deleteWorkout);

export default router;
