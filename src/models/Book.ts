import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	genres: {
		type: [String],
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	published_year: {
		type: Number,
		required: true,
	},
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
