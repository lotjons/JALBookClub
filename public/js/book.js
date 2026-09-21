const bookImage = document.getElementById("book-image");
const bookYear = document.getElementById("book-year");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookGenres = document.getElementById("book-genres");
const bookDescription = document.getElementById("book-description");
const bookMessage = document.getElementById("book-message");

const reviewsList = document.getElementById("reviews-list");
const reviewCount = document.getElementById("review-count");
const showMoreReviewsButton = document.getElementById("show-more-reviews");

const reviewForm = document.getElementById("review-form");
const reviewName = document.getElementById("review-name");
const reviewRating = document.getElementById("review-rating");
const reviewContent = document.getElementById("review-content");
const reviewMessage = document.getElementById("review-message");

const averageRating = document.getElementById("average-rating");
const ratingCount = document.getElementById("rating-count");

const REVIEWS_PER_PAGE = 6;

let currentReviews = [];
let visibleReviewCount = REVIEWS_PER_PAGE;

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

function renderBook(book) {
	bookImage.src = book.image;
	bookImage.alt = `Cover of ${book.title}`;

	bookYear.textContent = book.published_year;
	bookTitle.textContent = book.title;
	bookAuthor.textContent = book.author;
	bookDescription.textContent = book.description;

	bookGenres.innerHTML = "";

	for (const genre of book.genres) {
		const tag = document.createElement("span");
		tag.className = "tag";
		tag.textContent = genre;

		bookGenres.appendChild(tag);
	}

	document.title = `${book.title} | JAL Book Club`;
}

function updateReviewSummary(reviews) {
	const average =
		reviews.length > 0
			? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
			: 0;

	averageRating.textContent = average.toFixed(1);

	const reviewText = `${reviews.length} ${
		reviews.length === 1 ? "review" : "reviews"
	}`;

	ratingCount.textContent = reviewText;
	reviewCount.textContent = reviewText;
}

function createReviewCard(review) {
	const reviewCard = document.createElement("article");
	reviewCard.className = "review-card";

	const header = document.createElement("div");
	header.className = "review-card__header";

	const name = document.createElement("p");
	name.className = "review-card__name";
	name.textContent = review.name;

	const rating = document.createElement("span");
	rating.className = "review-card__rating";
	rating.textContent = "★".repeat(review.rating);

	header.append(name, rating);

	const content = document.createElement("p");
	content.className = "review-card__content";
	content.textContent = review.content;

	const date = document.createElement("time");
	date.className = "review-card__date";
	date.dateTime = review.created_at;
	date.textContent = new Date(review.created_at).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	reviewCard.append(header, content, date);

	return reviewCard;
}

function renderVisibleReviews() {
	reviewsList.innerHTML = "";

	if (currentReviews.length === 0) {
		const emptyMessage = document.createElement("p");
		emptyMessage.textContent = "No reviews yet. Be the first to leave one.";

		reviewsList.appendChild(emptyMessage);
		showMoreReviewsButton.classList.add("hidden");

		return;
	}

	const visibleReviews = currentReviews.slice(0, visibleReviewCount);

	for (const review of visibleReviews) {
		const reviewCard = createReviewCard(review);
		reviewsList.appendChild(reviewCard);
	}

	if (visibleReviewCount >= currentReviews.length) {
		showMoreReviewsButton.classList.add("hidden");
	} else {
		showMoreReviewsButton.classList.remove("hidden");
	}
}

function renderReviews(reviews) {
	currentReviews = [...reviews].sort(
		(a, b) => new Date(b.created_at) - new Date(a.created_at),
	);

	visibleReviewCount = REVIEWS_PER_PAGE;

	updateReviewSummary(currentReviews);
	renderVisibleReviews();
}

async function fetchBook() {
	if (!bookId) {
		bookMessage.textContent = "No book was selected.";
		return;
	}

	try {
		const response = await fetch(`${API_URL}/books/${bookId}`);

		if (!response.ok) {
			bookMessage.textContent = "Could not find this book.";
			return;
		}

		const book = await response.json();

		bookMessage.textContent = "";

		renderBook(book);
		renderReviews(book.reviews);
	} catch (error) {
		console.error("Error fetching book:", error);
		bookMessage.textContent = "Something went wrong while loading the book.";
	}
}

async function submitReview(event) {
	event.preventDefault();

	const review = {
		name: reviewName.value.trim(),
		content: reviewContent.value.trim(),
		rating: Number(reviewRating.value),
		bookId,
	};

	try {
		const response = await fetch(`${API_URL}/reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(review),
		});

		const data = await response.json();

		if (!response.ok) {
			reviewMessage.textContent = data.message || "Could not post review.";
			return;
		}

		reviewMessage.textContent = "Review posted!";
		reviewForm.reset();

		await fetchBook();
	} catch (error) {
		console.error("Error posting review:", error);
		reviewMessage.textContent =
			"Something went wrong while posting the review.";
	}
}

showMoreReviewsButton.addEventListener("click", () => {
	visibleReviewCount += REVIEWS_PER_PAGE;
	renderVisibleReviews();
});

reviewForm.addEventListener("submit", submitReview);

fetchBook();
