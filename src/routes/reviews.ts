import express from "express";
import {
	createReview,
	deleteReview,
	fetchAllReviews,
	fetchReviewById,
	updateReview,
} from "../controllers/reviewController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Get all reviews
router.get("/", fetchAllReviews);

// Get review by id
router.get("/:id", fetchReviewById);

// Create review
router.post("/", createReview);

// Update review
router.patch("/:id", verifyToken, updateReview);

// Delete review
router.delete("/:id", verifyToken, deleteReview);

export default router;
