const navLinks = document.getElementById("nav-links");
const navActions = document.getElementById("nav-actions");

// =========================
// CHECK AUTH STATUS
// =========================

async function updateAuthUI() {
	try {
		const response = await fetch(`${API_URL}/auth/me`, {
			credentials: "include",
		});

		if (!response.ok) {
			showLoggedOutNavigation();
			return;
		}

		const user = await response.json();

		showLoggedInNavigation(user);
	} catch (error) {
		console.error("Error checking authentication:", error);

		showLoggedOutNavigation();
	}
}

// =========================
// LOGGED IN NAVIGATION
// =========================

function showLoggedInNavigation(user) {
	navLinks.innerHTML = `
		<a class="nav__link nav__link--active" href="index.html">
			Books
		</a>

		<a class="nav__link" href="members.html">
			Members
		</a>
	`;

	navActions.innerHTML = "";

	const username = document.createElement("span");
	username.classList.add("nav__username");
	username.textContent = `👤 ${user.username}`;

	const logoutButton = document.createElement("button");
	logoutButton.type = "button";
	logoutButton.classList.add("btn", "btn--danger");
	logoutButton.textContent = "Sign out";

	logoutButton.addEventListener("click", logout);

	navActions.append(username, logoutButton);
}

// =========================
// LOGGED OUT NAVIGATION
// =========================

function showLoggedOutNavigation() {
	navLinks.innerHTML = `
		<a class="nav__link nav__link--active" href="index.html">
			Books
		</a>

		<a class="nav__link" href="login.html">
			Sign In
		</a>
	`;

	navActions.innerHTML = `
		<a class="btn btn--primary" href="register.html">
			Join the Club
		</a>
	`;
}

// =========================
// LOGOUT
// =========================

async function logout() {
	try {
		const response = await fetch(`${API_URL}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Could not log out");
		}

		showLoggedOutNavigation();
	} catch (error) {
		console.error("Error logging out:", error);
	}
}

// =========================
// START
// =========================

updateAuthUI();
