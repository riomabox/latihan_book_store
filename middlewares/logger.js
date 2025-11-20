const fs = require('node:fs');

// Named middleware functions
exports.loggerMiddleware = (req, res, next) => {
    // Create log message
    const log = `${Date.now()} ${req.method} ${req.path}\n`;
    // Write to file
    fs.appendFileSync('logs.txt', log, 'utf8');
    // Continue to next middleware/route
    next();
}