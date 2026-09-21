// =========================
// BOOKSHELF
// =========================

const bookList = document.getElementById("book-list");
const shelfCount = document.getElementById("shelf-count");
const bookSearch = document.getElementById("book-search");
const genreFilters = document.getElementById("genre-filters");

let allBooks = [];
let selectedGenre = "all";

// =========================
// FETCH BOOKS
// =========================

async function fetchBooks() {
	try {
		const response = await fetch("/api/books");

		if (!response.ok) {
			throw new Error("Could not fetch books");
		}

		allBooks = await response.json();

		updateBookCount(allBooks);
		createGenreFilters(allBooks);
		renderBooks(allBooks);
	} catch (error) {
		console.error("Error fetching books:", error);

		bookList.innerHTML = `
      <p>
        Could not load the books right now. Please try again later.
      </p>
    `;
	}
}

// =========================
// BOOK COUNT
// =========================

function updateBookCount(books) {
	shelfCount.textContent = `${books.length} books found`;
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

	const sortedGenres = [...genres].sort();

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

		filterBooks();
	});

	return button;
}

// =========================
// ACTIVE GENRE
// =========================

function updateActiveGenreButton() {
	const buttons = genreFilters.querySelectorAll(".tag");

	for (const button of buttons) {
		button.classList.remove("tag--accent");

		if (button.dataset.genre === selectedGenre) {
			button.classList.add("tag--accent");
		}
	}
}

// =========================
// FILTER BOOKS
// =========================

function filterBooks() {
	const searchTerm = bookSearch.value.trim().toLowerCase();

	const filteredBooks = allBooks.filter((book) => {
		const matchesSearch =
			book.title.toLowerCase().includes(searchTerm) ||
			book.author.toLowerCase().includes(searchTerm);

		const matchesGenre =
			selectedGenre === "all" || book.genres?.includes(selectedGenre);

		return matchesSearch && matchesGenre;
	});

	renderBooks(filteredBooks);
}

// =========================
// RENDER BOOKS
// =========================

function renderBooks(books) {
	bookList.innerHTML = "";

	shelfCount.textContent = `${books.length} books found`;

	if (books.length === 0) {
		bookList.innerHTML = `
      <p>
        No books found.
      </p>
    `;

		return;
	}

	for (const book of books) {
		const bookCard = createBookCard(book);

		bookList.appendChild(bookCard);
	}
}

// =========================
// CREATE BOOK CARD
// =========================

function createBookCard(book) {
	const article = document.createElement("article");

	article.classList.add("book-card");

	const image = document.createElement("img");

	image.classList.add("book-card__image");
	image.src = book.image;
	image.alt = `Cover of ${book.title}`;

	const content = document.createElement("div");

	content.classList.add("book-card__content");

	// Year

	const meta = document.createElement("div");

	meta.classList.add("book-card__meta");

	const year = document.createElement("span");

	year.textContent = book.published_year;

	meta.appendChild(year);

	// Title

	const title = document.createElement("h3");

	title.classList.add("book-card__title");
	title.textContent = book.title;

	// Author

	const author = document.createElement("p");

	author.classList.add("book-card__author");
	author.textContent = book.author;

	// Genres

	const genreList = document.createElement("div");

	genreList.classList.add("tag-list");

	const genres = Array.isArray(book.genres) ? book.genres : [];

	const visibleGenres = genres.slice(0, 2);

	for (const genre of visibleGenres) {
		const tag = document.createElement("span");

		tag.classList.add("tag");
		tag.textContent = genre;

		genreList.appendChild(tag);
	}

	// Additional genres

	if (genres.length > 2) {
		const extraGenres = document.createElement("span");

		extraGenres.classList.add("tag");
		extraGenres.textContent = `+${genres.length - 2}`;

		genreList.appendChild(extraGenres);
	}

	// Footer

	const footer = document.createElement("div");

	footer.classList.add("book-card__footer");

	// View book link

	const viewBook = document.createElement("a");

	viewBook.classList.add("btn", "btn--secondary");
	viewBook.href = `book.html?id=${book._id}`;
	viewBook.textContent = "View Book →";

	footer.appendChild(viewBook);

	// Build card

	content.appendChild(meta);
	content.appendChild(title);
	content.appendChild(author);
	content.appendChild(genreList);
	content.appendChild(footer);

	article.appendChild(image);
	article.appendChild(content);

	return article;
}

// =========================
// SEARCH
// =========================

bookSearch.addEventListener("input", () => {
	filterBooks();
});

// =========================
// START
// =========================

// =========================
// STATS & WELCOME
// =========================

async function fetchStats() {
	try {
		// Fetch books to count the total
		const booksResponse = await fetch("/api/books");
		const books = await booksResponse.json();
		document.getElementById("stat-books").textContent = books.length;

		// Fetch users to count members
		const usersResponse = await fetch("/api/users", { credentials: "include" });
		if (usersResponse.ok) {
			const users = await usersResponse.json();
			document.getElementById("stat-members").textContent = users.length;
		}

		// Fetch reviews to count the total
		const reviewsResponse = await fetch("/api/reviews");
		if (reviewsResponse.ok) {
			const reviews = await reviewsResponse.json();
			document.getElementById("stat-reviews").textContent = reviews.length;
		}
	} catch (error) {
		console.error("Error fetching stats:", error);
	}
}

fetchStats();

fetchBooks();
