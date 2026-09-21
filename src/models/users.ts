import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true, // Ingen kan ha samma användarnamn
		trim: true, // tar bort mellanslad i början och slutet av strängen
	},
	password: {
		type: String,
		required: true,
	},
	is_admin: {
		type: Boolean,
		default: false, // Vanliga användare är inte admins
	},
	avatar: {
		type: String,
		default: "📚",
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
