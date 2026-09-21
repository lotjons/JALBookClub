import "dotenv/config";
import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { verifyPageToken } from "../src/middleware/verifyToken";
import authRouter from "../src/routes/auth";
import booksRouter from "../src/routes/books";
import greetingRouter from "../src/routes/greetings";
import reviewRouter from "../src/routes/reviews";
import usersRouter from "../src/routes/users";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:3000",
		credentials: true,
	}),
);

// Protected pages before express.static so that the static files are not served if the user is not authenticated

app.get("/books.html", verifyPageToken, (_req, res) => {
	res.sendFile(path.join(process.cwd(), "protected", "books.html"));
});

app.get("/members.html", verifyPageToken, (_req, res) => {
	res.sendFile(path.join(process.cwd(), "protected", "members.html"));
});

app.get("/add-book.html", verifyPageToken, (_req, res) => {
	res.sendFile(path.join(process.cwd(), "protected", "add-book.html"));
});

// Serve static client - everything in the public folder is accessible without authentication
app.use(express.static(path.join(process.cwd(), "public")));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL || "");

// Routes
app.use("/api/auth", authRouter);
app.use("/api/greetings", greetingRouter);
app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/books", booksRouter);

// Start server
const server = app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

const shutdown = async () => {
	await mongoose.disconnect();
	server.close(() => process.exit(0));
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

server.on("error", (error: NodeJS.ErrnoException) => {
	if (error.code === "EADDRINUSE") {
		console.error(
			`Port ${PORT} is already in use. Stop the other server or run with PORT=3001 npm run dev.`,
		);
		process.exit(1);
	}

	throw error;
});
