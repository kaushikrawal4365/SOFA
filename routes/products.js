const express              = require('express');
const Product              = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/products  — public, with optional filters
router.get('/', async (req, res) => {
    try {
        const { category, sort, featured, flashSale, limit } = req.query;
        const filter = {};
        if (category)   filter.category  = category;
        if (featured)   filter.featured  = true;
        if (flashSale)  filter.flashSale = true;

        let query = Product.find(filter);
        if (sort === 'price-asc')  query = query.sort({ price:  1 });
        if (sort === 'price-desc') query = query.sort({ price: -1 });
        if (sort === 'newest')     query = query.sort({ createdAt: -1 });
        if (sort === 'rating')     query = query.sort({ rating: -1 });
        if (limit) query = query.limit(parseInt(limit));

        const products = await query;
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/products/:id  — public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/products  — admin only
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/products/:id  — admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/products/:id  — admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
