const express = require('express');
const router = express.Router();
const db = require('../db');
const { authorsTable, booksTable } = require('../models');
const { eq } = require('drizzle-orm');

// Route 1: Get all authors
router.get('/', async (req, res) => {
	const authors = await db
		.select()
		.from(authorsTable);

	return res.json(authors);	
})

// Route 2: Get author by ID
router.get('/:id', async (req, res) => {
	const [author] = await db
		.select()
		.from(authorsTable)
		.where(eq(authorsTable.id, req.params.id));
	if(!author){
		return res.status(404).json({
			error: `Author with ID ${req.params.id} does not exist`
		});
	}
	return res.json(author);
})

// Route 3: Create author
router.post('/' , async (req, res) => {
	const { firstName, lastName, email } = req.body;

	// Database will validate required fields
	const [result] = await db
		.insert(authorsTable)
		.values({ firstName, lastName, email })
		.returning({ id: authorsTable.id });

	return res.status(201).json({
		message: 'Author has been created',
		id: result.id
	})
})

// Route 4: Delete author
// router.delete('/:id', async (req, res) => {
// 	const id = req.params.id;

//     await db.delete(authorsTable).where(eq(authorsTable.id, id));

//     return res.status(200).json({
//         message: 'Author deleted'
//     });	
// })

router.get('/:id/books', async (req, res) => {
	const books = await db.select()
		.from(booksTable)
		.where(eq(booksTable.authorId, req.params.id));

	return res.json(books);
});

module.exports = router;