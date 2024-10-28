
// book.js
class Book {
    constructor(title, author , pages, status, price, pagesRead, format, suggestedBy) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead === pages ? 1 : 0;
    }

    currentlyAt() {
        return `${this.pagesRead} / ${this.pages}`;
    }

    deleteBook() {
        // Implement deletion logic here
    }
}

export default Book;