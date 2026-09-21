// =========================
// ELEMENTS
// =========================

const bookList = document.getElementById("book-list");
const shelfCount = document.getElementById("shelf-count");
const bookSearch = document.getElementById("book-search");
const genreFilters = document.getElementById("genre-filters");
const bookSort = document.getElementById("book-sort");

let allBooks = [];
let selectedGenre = "all";

// =========================
// FETCH BOOKS & REVIEWS
// =========================

async function fetchMemberBooks() {
	try {
		const [booksResponse, reviewsResponse] = await Promise.all([
			fetch("/api/books"),
			fetch("/api/reviews"),
		]);

		if (!booksResponse.ok || !reviewsResponse.ok) {
			throw new Error("Could not fetch books or reviews");
		}

		const books = await booksResponse.json();
		const reviews = await reviewsResponse.json();

		allBooks = addRatingsToBooks(books, reviews);

		createGenreFilters(allBooks);
		applyFiltersAndSort();

		// Stats
		document.getElementById("stat-books").textContent = books.length;
		document.getElementById("stat-reviews").textContent = reviews.length;

		await fetchMemberCount();
	} catch (error) {
		console.error("Error fetching books:", error);

		bookList.innerHTML = `
			<tr>
				<td colspan="6">
					Could not load the books right now.
				</td>
			</tr>
		`;
	}
}

// =========================
// ADD RATING DATA
// =========================

function addRatingsToBooks(books, reviews) {
	return books.map((book) => {
		const bookReviews = reviews.filter((review) => review.bookId === book._id);

		const averageRating =
			bookReviews.length > 0
				? bookReviews.reduce((sum, review) => sum + review.rating, 0) /
					bookReviews.length
				: 0;

		return {
			...book,
			averageRating,
			reviewCount: bookReviews.length,
		};
	});
}

// =========================
// CREATE GENRE FILTERS
// =========================

function createGenreFilters(books) {
	genreFilters.innerHTML = "";

	const allButton = createGenreButton("all", "All");

	allButton.classList.add("tag--accent");

	genreFilters.appendChild(allButton);

	const genres = new Set();

	for (const book of books) {
		if (!Array.isArray(book.genres)) {
			continue;
		}

		for (const genre of book.genres) {
			genres.add(genre);
		}
	}

	const sortedGenres = [...genres].sort((a, b) => a.localeCompare(b));

	for (const genre of sortedGenres) {
		const button = createGenreButton(genre, genre);

		genreFilters.appendChild(button);
	}
}

// =========================
// CREATE GENRE BUTTON
// =========================

function createGenreButton(genre, text) {
	const button = document.createElement("button");

	button.type = "button";
	button.classList.add("tag");
	button.dataset.genre = genre;
	button.textContent = text;

	button.addEventListener("click", () => {
		selectedGenre = genre;

		updateActiveGenreButton();
		applyFiltersAndSort();
	});

	return button;
}

// =========================
// ACTIVE GENRE
// =========================

function updateActiveGenreButton() {
	const buttons = genreFilters.querySelectorAll(".tag");

	for (const button of buttons) {
		button.classList.toggle(
			"tag--accent",
			button.dataset.genre === selectedGenre,
		);
	}
}

// =========================
// FILTER & SORT
// =========================

function applyFiltersAndSort() {
	const searchTerm = bookSearch.value.trim().toLowerCase();

	let filteredBooks = allBooks.filter((book) => {
		const matchesSearch =
			book.title.toLowerCase().includes(searchTerm) ||
			book.author.toLowerCase().includes(searchTerm);

		const matchesGenre =
			selectedGenre === "all" || book.genres?.includes(selectedGenre);

		return matchesSearch && matchesGenre;
	});

	filteredBooks = sortBooks(filteredBooks);

	renderBooks(filteredBooks);
}

// =========================
// SORT BOOKS
// =========================

function sortBooks(books) {
	const sortedBooks = [...books];

	switch (bookSort.value) {
		case "rating":
			sortedBooks.sort((a, b) => b.averageRating - a.averageRating);
			break;

		case "year-newest":
			sortedBooks.sort((a, b) => b.published_year - a.published_year);
			break;

		case "year-oldest":
			sortedBooks.sort((a, b) => a.published_year - b.published_year);
			break;

		default:
			sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
	}

	return sortedBooks;
}

// =========================
// RENDER BOOKS
// =========================

function renderBooks(books) {
	bookList.innerHTML = "";

	shelfCount.textContent = `${books.length} ${
		books.length === 1 ? "book" : "books"
	} found`;

	if (books.length === 0) {
		bookList.innerHTML = `
			<tr>
				<td colspan="6">
					No books found.
				</td>
			</tr>
		`;

		return;
	}

	for (const book of books) {
		const row = createBookRow(book);

		bookList.appendChild(row);
	}
}

// =========================
// CREATE TABLE ROW
// =========================

function createBookRow(book) {
	const row = document.createElement("tr");

	// Title

	const title = document.createElement("td");
	title.textContent = book.title;

	// Author

	const author = document.createElement("td");
	author.textContent = book.author;

	// Genres

	const genres = document.createElement("td");

	genres.textContent = Array.isArray(book.genres) ? book.genres.join(", ") : "";

	// Published year

	const publishedYear = document.createElement("td");
	publishedYear.textContent = book.published_year;

	// Rating

	const rating = document.createElement("td");

	if (book.reviewCount > 0) {
		rating.textContent = `★ ${book.averageRating.toFixed(1)} (${book.reviewCount})`;
	} else {
		rating.textContent = "No ratings yet";
	}

	// Action

	const action = document.createElement("td");

	const viewBook = document.createElement("a");

	viewBook.classList.add("btn", "btn--secondary");
	viewBook.href = `book.html?id=${book._id}`;
	viewBook.textContent = "View";

	action.appendChild(viewBook);

	// Build row

	row.append(title, author, genres, publishedYear, rating, action);

	return row;
}

// =========================
// MEMBER COUNT
// =========================

async function fetchMemberCount() {
	try {
		const response = await fetch("/api/users", {
			credentials: "include",
		});

		if (!response.ok) {
			return;
		}

		const users = await response.json();

		document.getElementById("stat-members").textContent = users.length;
	} catch (error) {
		console.error("Error fetching members:", error);
	}
}

// =========================
// EVENTS
// =========================

bookSearch.addEventListener("input", () => {
	applyFiltersAndSort();
});

bookSort.addEventListener("change", () => {
	applyFiltersAndSort();
});

// =========================
// START
// =========================

fetchMemberBooks();
