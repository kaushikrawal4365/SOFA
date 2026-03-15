const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');

const router = express.Router();

// Helper: sign JWT
const signToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email already registered' });

        const user  = await User.create({ name, email, password });
        const token = signToken(user._id);

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'Email and password are required' });

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password)))
            return res.status(401).json({ message: 'Invalid email or password' });

        const token = signToken(user._id);
        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/auth/me  (requires token)
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user    = await User.findById(decoded.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
