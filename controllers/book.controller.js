const { books } = require('../models/book');
const db = require('../db');
const { booksTable } = require('../models');
const { eq } = require('drizzle-orm');

exports.getAllBooks = async (req, res) => {
    const books = await db.select().from(booksTable);
	return res.json(books);
}

exports.getBookById = async (req, res) => {
    const Id = req.params.id;

    // const book = await books.find(b => b.id === Id);
    const [book] = await db.select().from(booksTable).where(eq(booksTable.id, Id)).limit(1);
    if(!book){
        return res.status(404).json({ 
            error: `Book with ID ${Id} does not exist`
        });
    }
    return res.json(book);
}

exports.createBook = async (req, res) => {
    const { title, authorId, description } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({
            error: 'Title is required'
        });
    }

    if (!authorId || authorId.trim() === '') {
        return res.status(400).json({
            error: 'Author ID is required'
        });
    }

    const book = { title, authorId, description };

    const [result] = await db.insert(booksTable).values(book).returning({ id: booksTable.id});

    return res.status(201).json({
        message: 'Book created successfully',
        id: result.id
    });
}

exports.deleteBook = async (req, res) => {
    const id = req.params.id;

    await db.delete(booksTable).where(eq(booksTable.id, id));

    return res.status(200).json({
        message: 'Book deleted'
    });
}