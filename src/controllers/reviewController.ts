import type { Request, Response } from "express";
import Book from "../models/Book";
import { Review } from "../models/Review";

// GET ALL REVIEWS
export const fetchAllReviews = async (_req: Request, res: Response) => {
	try {
		const reviews = await Review.find();

		res.json(reviews);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";

		res.status(500).json({ error: message });
	}
};

// Get review by id
export const fetchReviewById = async (req: Request, res: Response) => {
	try {
		const review = await Review.findById(req.params.id);

		if (!review) {
			return res.status(404).json({ error: "Review not found" });
		}

		res.json(review);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";

		res.status(500).json({ error: message });
	}
};

// Create review
export const createReview = async (req: Request, res: Response) => {
	try {
		const { name, content, rating, bookId } = req.body;

		if (!name || !content || rating === undefined || !bookId) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (rating < 1 || rating > 5) {
			return res.status(400).json({ error: "Rating must be between 1 and 5" });
		}

		const book = await Book.findById(bookId);

		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}

		const review = await Review.create({
			name,
			content,
			rating,
			bookId,
		});

		res.status(201).json(review);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";

		res.status(500).json({ error: message });
	}
};

// Update review
export const updateReview = async (req: Request, res: Response) => {
	try {
		const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!review) {
			return res.status(404).json({ error: "Review not found" });
		}

		res.json(review);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";

		res.status(500).json({ error: message });
	}
};

// Delete review
export const deleteReview = async (req: Request, res: Response) => {
	try {
		const review = await Review.findByIdAndDelete(req.params.id);

		if (!review) {
			return res.status(404).json({ error: "Review not found" });
		}

		res.json({ message: "Review deleted" });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";

		res.status(500).json({ error: message });
	}
};
