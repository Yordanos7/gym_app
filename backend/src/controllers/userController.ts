import { Request, Response } from "express";
import * as userService from "../services/userService.ts";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userService.getAllUsers();
    res.status(200).json({
      message: "users are here :",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching the users internal error from the server",
      error,
    });
  }
};

// this for get the user by the id

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    // The new user's data comes from the request body, sent by the client.
    const newUser = await userService.createUser(req.body);
    // We send a 201 Created status with the newly created user's data.
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

/**
 * Controller to update an existing user.
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // The updated data comes from the request body.
    const updatedUser = await userService.updateUser(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

/**
 * Controller to delete a user.
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    // For a successful deletion, we send a 204 No Content status.
    // This means the operation was successful but there's nothing to send back.
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
