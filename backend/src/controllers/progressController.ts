// gymapp/backend/src/controllers/progressController.ts

import express from "express";
import type { Request, Response } from "express";
import * as progressService from "../services/progressService.ts";

/**
 * Controller to create a new progress entry.
 */
export const createProgress = async (req: Request, res: Response) => {
  try {
    const progress = await progressService.createProgress(req.body);
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error creating progress entry", error });
  }
};

/**
 * Controller to get all progress entries for a specific user.
 */
export const getProgressByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const progress = await progressService.getProgressByUserId(userId);
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress", error });
  }
};

/**
 * Controller to get a single progress entry by its ID.
 */
export const getProgressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const progress = await progressService.getProgressById(id);
    if (progress) {
      res.status(200).json(progress);
    } else {
      res.status(404).json({ message: "Progress entry not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress entry", error });
  }
};

/**
 * Controller to update a progress entry.
 */
export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProgress = await progressService.updateProgress(id, req.body);
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: "Error updating progress entry", error });
  }
};

/**
 * Controller to delete a progress entry.
 */
export const deleteProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await progressService.deleteProgress(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting progress entry", error });
  }
};
