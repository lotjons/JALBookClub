import type { Request, Response } from "express";
import Book from "../models/Book";
import { Review } from "../models/Review";

export const getBooks = async (_req: Request, res: Response) => {
	console.log("GET /api/books körs");

	try {
		const books = await Book.find();
		res.json(books);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Could not fetch books" });
	}
};

export const getBookById = async (req: Request, res: Response) => {
	try {
		const book = await Book.findById(req.params.id);

		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		const reviews = await Review.find({ bookId: book._id });

		res.json({
			...book.toObject(),
			reviews,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Could not fetch book" });
	}
};

export const createBook = async (req: Request, res: Response) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json(book);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Could not create book" });
	}
};

export const updateBook = async (req: Request, res: Response) => {
	try {
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		res.json(book);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Could not update book" });
	}
};

export const deleteBook = async (req: Request, res: Response) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id);

		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		await Review.deleteMany({ bookId: req.params.id });

		res.json({ message: "Book deleted successfully" });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Could not delete book" });
	}
};
