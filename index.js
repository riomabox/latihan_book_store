const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
];

app.use(express.json());
app.get('/books', (req, res) => {
    return res.json(books);
});
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book){
        return res.status(404).json({ message: 'Book not found'});
    }
    return res.json(book);
});
app.post('/books', (req, res) => {
    const {title, author} = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    return res.status(201).json(newBook);
});
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if(bookIndex === -1){
        return res.status(404).json({ message: 'Book not found'});
    }
    books.splice(bookIndex, 1);
    return res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})