import "dotenv/config";
import mongoose from "mongoose";

import User from "../src/models/users";
import { getRandomAvatar } from "../src/utils/avatars";

async function backfillAvatars() {
	const mongoUrl = process.env.MONGODB_URL;

	if (!mongoUrl) {
		throw new Error("MONGODB_URL is missing");
	}

	try {
		await mongoose.connect(mongoUrl);

		const usersWithoutAvatar = await User.find({
			$or: [{ avatar: { $exists: false } }, { avatar: null }, { avatar: "" }],
		});

		console.log(`Found ${usersWithoutAvatar.length} users without avatars.`);

		for (const user of usersWithoutAvatar) {
			user.avatar = getRandomAvatar();

			await user.save();

			console.log(`${user.username} → ${user.avatar}`);
		}

		console.log("Avatar backfill complete.");
	} catch (error) {
		console.error("Could not backfill avatars:", error);
	} finally {
		await mongoose.disconnect();
	}
}

backfillAvatars();
