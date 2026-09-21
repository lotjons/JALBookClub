const createBookForm = document.getElementById("create-book-form");
const createBookMessage = document.getElementById("create-book-message");

const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookYear = document.getElementById("book-year");
const bookGenres = document.getElementById("book-genres");
const bookImage = document.getElementById("book-image");
const bookDescription = document.getElementById("book-description");

createBookForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const genres = bookGenres.value
		.split(",")
		.map((genre) => genre.trim())
		.filter(Boolean);

	const book = {
		title: bookTitle.value.trim(),
		description: bookDescription.value.trim(),
		author: bookAuthor.value.trim(),
		genres,
		image: bookImage.value.trim(),
		published_year: Number(bookYear.value),
	};

	try {
		const response = await fetch(`${API_URL}/books`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(book),
		});

		const data = await response.json();

		if (response.status === 401 || response.status === 403) {
			createBookMessage.textContent = "You must be logged in to add a book.";
			return;
		}

		if (!response.ok) {
			createBookMessage.textContent = data.message || "Could not add book.";
			return;
		}

		window.location.href = `book.html?id=${data._id}`;
	} catch (error) {
		console.error("Error creating book:", error);

		createBookMessage.textContent =
			"Something went wrong while adding the book.";
	}
});
