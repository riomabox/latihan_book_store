const { books } = require('../models/book');
const db = require('../db');
const { booksTable } = require('../models');

exports.getAllBooks = async (req, res) => {
    const books = await db.select().from(booksTable);
	return res.json(books);
}

exports.getBookById = (req, res) => {
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
}

exports.createBook = (req, res) => {
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
}

exports.deleteBook = (req, res) => {
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
}