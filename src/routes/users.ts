import express from "express";
import {
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
} from "../controllers/usersController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Skyddade routes - kräver token
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserById);
router.patch("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
