import type { Request, Response } from "express";
import User from "../models/users";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();

		res.json(users);
	} catch (error) {
		res.status(500).json({
			message: "Kunde inte hämta användare",
		});
	}
};

// GET specific user by ID (token needed)
export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Could not get user" });
	}
};

// UPDATE user (token needed)
export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }, // returnerar den uppdaterade användaren
		);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Could not update user" });
	}
};

// DELETE user (token needed)
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Could not delete user" });
	}
};
