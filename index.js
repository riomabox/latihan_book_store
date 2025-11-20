const express = require('express');
const fs = require('node:fs');

const app = express();
const PORT = process.env.PORT || 8000;

const bookRouter = require('./routes/book.routes');

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

app.use('/books', bookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})