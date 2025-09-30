import express from "express";
import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService.ts";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.registerUser(email, password, name);
    res.status(201).json({
      message: "The user has been created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({
      message: "You have login sccucessfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: "You have logout succefully" });
  } catch (error) {
    next(error);
  }
};
