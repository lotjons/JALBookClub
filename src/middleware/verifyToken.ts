import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const accessToken = req.cookies.accessToken;

	if (!accessToken) {
		res.status(401).send();
		return;
	}

	try {
		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || "");

		if (typeof decoded === "string" || !decoded.username) {
			res.status(403).send();
			return;
		}

		res.locals.user = decoded;

		next();
	} catch {
		res.status(403).send();
	}
};

export const verifyPageToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const accessToken = req.cookies.accessToken;

	if (!accessToken) {
		res.redirect("/login.html?message=You must be logged in to view this page");
		return;
	}

	try {
		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || "");

		if (typeof decoded === "string" || !decoded.username) {
			res.redirect(
				"/login.html?message=You must be logged in to view this page",
			);
			return;
		}

		next();
	} catch {
		res.redirect("/login.html?message=You must be logged in to view this page");
	}
};
