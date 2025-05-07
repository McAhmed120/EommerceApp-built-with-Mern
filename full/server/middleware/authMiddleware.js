const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and verify the JWT token
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded Token:', decoded); // Debug log

            // Find user in DB and attach it to req.user
            req.user = await User.findById(decoded.id).select('-password'); // Exclude password
            if (!req.user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return next();
        } catch (error) {
            console.error('Error verifying token:', error.message); // Debug log
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to allow only Admin users
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access restricted to admins only' });
};

// Middleware to allow only Client users
const clientOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Client') {
        return next();
    }
    return res.status(403).json({ message: 'Access restricted to clients only' });
};

console.log('Middleware loaded');

module.exports = { protect, adminOnly, clientOnly };
