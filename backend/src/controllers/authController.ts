import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService.ts";
import express from "express"; // Import express for express.raw (if needed, though not directly used here)

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.registerUser(email, password, name);
    // After successful registration, automatically log in the user to get a token
    const { user: loggedInUser, token } = await authService.loginUser(
      email,
      password
    );
    res.status(201).json({
      message: "The user has been created successfully",
      user: loggedInUser,
      token,
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
      user,
      token,
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
