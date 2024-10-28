const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // The port you want to run your app on

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookTrackerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Could not connect to MongoDB:", error));

// Mongoose Schema and Model
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    status: String,
    price: Number,
    pagesRead: Number,
    format: String,
    suggestedBy: String,
    finished: { type: Boolean, default: false },
});

const Book = mongoose.model('Book', bookSchema);

// Routes
// 1. Add a new book
app.post('/books', async (req, res) => {
    try {
        const bookData = req.body;
        bookData.finished = bookData.pagesRead >= bookData.pages; // Set finished if pagesRead equals pages
        const newBook = new Book(bookData);
        await newBook.save();
        res.status(201).send(newBook);
    } catch (error) {
        res.status(500).send("Error saving book");
    }
});

// 2. Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send("Error retrieving books");
    }
});

// 3. Delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).send(`Book with ID ${id} deleted`);
    } catch (error) {
        res.status(500).send("Error deleting book");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
