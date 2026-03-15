const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT — attaches req.user
const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Not authorised, no token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorised, invalid token' });
    }
};

// Admin gate — must be used after protect
const adminOnly = (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    return res.status(403).json({ message: 'Admin access required' });
};

module.exports = { protect, adminOnly };
