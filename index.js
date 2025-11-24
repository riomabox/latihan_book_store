const express = require('express');
const { loggerMiddleware } = require('./middlewares/logger');
const bookRouter = require('./routes/book.routes');
require('dotenv/config');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
// Global Middleware
app.use(loggerMiddleware);

// Routes
app.use('/books', bookRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})