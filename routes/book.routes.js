const express = require('express');
const router = express.Router();
const { books } = require('../db/book');

// Route 1: Get all books
router.get('/', (req, res) => {
    res.json(books);
})

// Route 2: Get book by ID
router.get('/:id', (req, res) => {
    const Id = parseInt(req.params.id);
    if(isNaN(Id)){
        return res.status(400).json({
            error: 'ID must be number'
        });
    }
    const book = books.find(b => b.id === Id);
    if(!book){
        return res.status(404).json({ 
            error: `Book with ID ${Id} does not exist`
        });
    }
    return res.json(book);
})
// Route 3: Create book
router.post('/', (req, res) => {
    const { title, author } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({
            error: 'Title is required'
        });
    }

    if (!author || author.trim() === '') {
        return res.status(400).json({
        error: 'Author is required'
        });
    }

    const id = books.length + 1;
    const book = { id, title, author };

    books.push(book);

    return res.status(201).json({
        message: 'Book created successfully',
        id: id
    });
});
// Route 4: Delete book
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
        error: 'ID must be of type number'
        });
    }

    const indexToDelete = books.findIndex(b => b.id === id);

    if (indexToDelete < 0) {
        return res.status(404).json({
            error: `Book with id ${id} does not exist`
        });
    }

    books.splice(indexToDelete, 1);

    return res.status(200).json({
        message: 'Book deleted'
    });
});

module.exports = router;