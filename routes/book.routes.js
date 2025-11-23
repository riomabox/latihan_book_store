const express = require('express');
const router = express.Router();
const controller = require('../controllers/book.controller');

// Route 1: Get all books
router.get('/', controller.getAllBooks);

// Route 2: Get book by ID
router.get('/:id', controller.getBookById);

// Route 3: Create book
router.post('/', controller.createBook);

// Route 4: Delete book
router.delete('/:id', controller.deleteBook);

module.exports = router;