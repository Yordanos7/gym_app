// gymapp/backend/src/controllers/exerciseController.ts

import express from "express";
import type { Request, Response } from "express";
import * as exerciseService from "../services/exerciseService.ts";

/**
 * Controller to create a new exercise.
 */
export const createExercise = async (req: Request, res: Response) => {
  try {
    // The exercise data comes from the request body.
    // This includes name, type, userId, categoryId, etc.
    const exercise = await exerciseService.createExercise(req.body);
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Error creating exercise", error });
  }
};

/**
 * Controller to get all exercises for a specific user.
 */
export const getExercisesByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const exercises = await exerciseService.getExercisesByUserId(userId);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises", error });
  }
};

/**
 * Controller to get a single exercise by its ID.
 */
export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await exerciseService.getExerciseById(id);
    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercise", error });
  }
};

/**
 * Controller to update an exercise.
 */
export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedExercise = await exerciseService.updateExercise(id, req.body);
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: "Error updating exercise", error });
  }
};

/**
 * Controller to delete an exercise.
 */
export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await exerciseService.deleteExercise(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting exercise", error });
  }
};
