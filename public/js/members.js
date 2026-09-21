const memberList = document.getElementById("member-list");
const memberCount = document.getElementById("member-count");

// =========================
// FETCH MEMBERS
// =========================

async function fetchMembers() {
	try {
		const response = await fetch(`${API_URL}/users`, {
			credentials: "include",
		});

		if (response.status === 401 || response.status === 403) {
			window.location.href =
				"login.html?message=You must be logged in to view this page";
			return;
		}

		if (!response.ok) {
			throw new Error("Could not fetch members");
		}

		const users = await response.json();

		renderMembers(users);

		document.getElementById("stat-members").textContent = users.length;
	} catch (error) {
		console.error("Error fetching members:", error);

		memberList.innerHTML = `
			<p>Could not load members right now.</p>
		`;
	}
}

// =========================
// RENDER MEMBERS
// =========================

function renderMembers(users) {
	memberList.innerHTML = "";

	memberCount.textContent = `${users.length} ${
		users.length === 1 ? "member" : "members"
	}`;

	if (users.length === 0) {
		memberList.innerHTML = `
			<p>No members found.</p>
		`;
		return;
	}

	for (const user of users) {
		const memberCard = createMemberCard(user);

		memberList.appendChild(memberCard);
	}
}

// =========================
// CREATE MEMBER CARD
// =========================

function createMemberCard(user) {
	const article = document.createElement("article");
	article.classList.add("member-card");

	const avatar = document.createElement("div");
	avatar.classList.add("member-card__avatar");
	avatar.textContent = user.avatar || "📚";

	const content = document.createElement("div");
	content.classList.add("member-card__content");

	const username = document.createElement("h3");
	username.classList.add("member-card__name");
	username.textContent = user.username;

	const date = document.createElement("p");
	date.classList.add("member-card__date");

	const memberSince = new Date(user.created_at);

	date.textContent = `Member since ${memberSince.toLocaleDateString("en-GB", {
		month: "short",
		year: "numeric",
	})}`;

	content.append(username, date);
	article.append(avatar, content);

	return article;
}

// =========================
// FETCH STATS
// =========================

async function fetchStats() {
	try {
		const [booksResponse, reviewsResponse] = await Promise.all([
			fetch(`${API_URL}/books`),
			fetch(`${API_URL}/reviews`),
		]);

		if (booksResponse.ok) {
			const books = await booksResponse.json();

			document.getElementById("stat-books").textContent = books.length;
		}

		if (reviewsResponse.ok) {
			const reviews = await reviewsResponse.json();

			document.getElementById("stat-reviews").textContent = reviews.length;
		}
	} catch (error) {
		console.error("Error fetching stats:", error);
	}
}

// =========================
// LOGOUT
// =========================

document.getElementById("logout-btn").addEventListener("click", async () => {
	try {
		const response = await fetch(`${API_URL}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Logout failed");
		}

		window.location.href = "login.html?message=You have been logged out";
	} catch (error) {
		console.error("Error logging out:", error);
	}
});

// =========================
// START
// =========================

fetchMembers();
fetchStats();
