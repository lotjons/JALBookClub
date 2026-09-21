import express from "express";

import {
	createBook,
	deleteBook,
	getBookById,
	getBooks,
	updateBook,
} from "../controllers/booksController";

import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", verifyToken, createBook);

router.patch("/:id", verifyToken, updateBook);

router.delete("/:id", verifyToken, deleteBook);

export default router;
