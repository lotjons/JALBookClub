import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	content: {
		type: String,
		required: true,
	},

	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},

	created_at: {
		type: Date,
		default: Date.now,
	},

	bookId: {
		type: Schema.Types.ObjectId,
		ref: "Book",
		required: true,
	},
});

export const Review = model("Review", reviewSchema);
