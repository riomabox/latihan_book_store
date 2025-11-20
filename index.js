const express = require('express');
const fs = require('node:fs');

const app = express();
const PORT = process.env.PORT || 8000;

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
];

// Named middleware functions
const loggerMiddleware = (req, res, next) => {
    // Create log message
    const log = `${Date.now()} ${req.method} ${req.path}\n`;
    // Write to file
    fs.appendFileSync('logs.txt', log, 'utf8');
    // Continue to next middleware/route
    next();
}

const customMiddleware = (req, res, next) => {
    console.log('I am a custom middleware');
    next();
}

// Middleware
app.use(express.json());
// Global Middleware
app.use(loggerMiddleware);
// Path-specific middleware
app.use('/books', (req, res, next) => {
    console.log('Books-related request');
    next();
});

// Route-level Middleware
// Get all books
app.get('/books', customMiddleware, (req, res) => {
    return res.json(books);
});
// Get a book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    if(isNaN(bookId)){
        return res.status(400).json({
            error: 'ID must be number'
        });
    }
    const book = books.find(b => b.id === bookId);
    if(!book){
        return res.status(404).json({ 
            error: `Book with ID ${bookId} does not exist`
        });
    }
    return res.json(book);
});
// Add a new book
app.post('/books', (req, res) => {
    const {title, author} = req.body;
    if(!title || title.trim() === ''){
        return res.status(400).json({
            error: 'Title is required'
        });
    }
    if(!author|| author.trim() === ''){
        return res.status(400).json({
            error: 'Author is required'
        });
    }
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    return res.status(201).json({
        message: 'Book created successfuly',
        id: newBook.id
    });
});
// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    if(isNaN(bookId)){
        return res.status(400).json({
            error: 'ID must be of type number'
        });
    }
    const bookIndex = books.findIndex(b => b.id === bookId);
    if(bookIndex < 0){
        return res.status(404).json({ 
            error: `Book with ID ${bookId} does not exist`
        });
    }
    books.splice(bookIndex, 1);
    return res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})