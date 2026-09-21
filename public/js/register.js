// Get the register button and message element from the HTML
const registerBtn = document.getElementById("register-btn");
const registerMessage = document.getElementById("register-message");

// Listen for a click on the register button
registerBtn.addEventListener("click", async () => {
	// Get the values from the input fields that the user has filled in
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	// Basic validation - make sure both fields are filled in
	if (!username || !password) {
		registerMessage.textContent = "Please fill in all fields";
		return;
	}

	try {
		// Send a POST request to the API with username and password
		// credentials: "include" tells the browser to send/receive cookies
		const response = await fetch(API_URL + "/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			// Registration successful - redirect to login page with message
			window.location.href =
				"login.html?message=Account created! Please sign in.";
		} else {
			// Registration failed - show error message from API
			const data = await response.json();
			registerMessage.textContent = data.message || "Registration failed";
		}
	} catch (error) {
		// Something went technically wrong - e.g. the server is down
		console.error("Error:", error);
		registerMessage.textContent = "Something went wrong, please try again";
	}
});
