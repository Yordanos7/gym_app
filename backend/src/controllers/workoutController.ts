// gymapp/backend/src/controllers/workoutController.ts

import { Request, Response } from "express";
import * as workoutService from "../services/workoutService.ts";

/**
 * Controller to create a new workout.
 */
export const createWorkout = async (req: Request, res: Response) => {
  try {
    // The request body will contain the name, date, userId, and the array of exercises.
    const workout = await workoutService.createWorkout(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Error creating workout", error });
  }
};

/**
 * Controller to get all workouts for a specific user.
 */
export const getWorkoutsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await workoutService.getWorkoutsByUserId(userId);
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts", error });
  }
};

/**
 * Controller to get a single workout by its ID.
 */
export const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await workoutService.getWorkoutById(id);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout", error });
  }
};

/**
 * Controller to delete a workout.
 */
export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await workoutService.deleteWorkout(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout", error });
  }
};
