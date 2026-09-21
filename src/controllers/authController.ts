import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/users";
import { getRandomAvatar } from "../utils/avatars";

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ message: "username and password are required" });
		return;
	}

	try {
		// Steg 1: Hitta användaren i databasen
		const user = await User.findOne({ username });

		if (!user) {
			res.status(401).json({ message: "username/password are wrong" });
			return;
		}

		// Steg 2: Jämför lösenordet med det krypterade i databasen
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			res.status(401).json({ message: "username/password are wrong" });
			return;
		}

		// Steg 3: Skapa JWT-token
		const accessToken = jwt.sign(
			{ username: user.username },
			process.env.JWT_SECRET || "",
			{ expiresIn: "7d" },
		);

		// Steg 4: Spara token i cookie
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		res.json({ message: "You are logged in" });
	} catch {
		res.status(500).json({ message: "Could not login" });
	}
};

export const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ message: "username and password are required" });
		return;
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const avatar = getRandomAvatar();

		const user = new User({
			username,
			password: hashedPassword,
			avatar,
		});

		await user.save();

		res.status(201).json({ message: "User registered successfully", username });
	} catch (error) {
		const mongoError = error as { code?: number };
		if (mongoError.code === 11000) {
			res.status(400).json({ message: "Username already exists" });
			return;
		}
		res.status(500).json({ message: "Could not register user" });
	}
};

export const logout = async (_req: Request, res: Response) => {
	res.clearCookie("accessToken");
	res.json({ message: "You are logged out" });
};

export const getCurrentUser = (_req: Request, res: Response) => {
	res.json({
		username: res.locals.user.username,
	});
};
