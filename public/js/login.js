// Get the login button and message element from the HTML
const loginBtn = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");

// Check if there is a message in the URL (e.g. ?message=You have been logged out)
// URLSearchParams reads query params from the URL
const params = new URLSearchParams(window.location.search);
const message = params.get("message");
if (message) {
	// Display the message if one exists
	loginMessage.textContent = message;
}

// Listen for a click on the login button
loginBtn.addEventListener("click", async () => {
	// Get the values from the input fields that the user has filled in
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	try {
		// Send a POST request to the API with username and password
		// credentials: "include" tells the browser to send/receive cookies
		const response = await fetch(API_URL + "/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			// Login successful - redirect to members page
			window.location.href = "members.html";
		} else {
			// Login failed - display error message
			loginMessage.textContent = "Wrong username or password";
		}
	} catch (error) {
		// Something went technically wrong - e.g. the server is down
		console.error("Error:", error);
		loginMessage.textContent = "Something went wrong, please try again";
	}
});
