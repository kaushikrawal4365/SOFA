const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:          { type: String, required: true, trim: true },
    description:   { type: String, required: true },
    price:         { type: Number, required: true },       // sale / current price
    originalPrice: { type: Number, default: null },        // original price (null if no discount)
    category:      { 
        type: String, 
        required: true, 
        enum: ['living-room', 'bed-room', 'dining-room', 'office']
    },
    imageUrl:      { type: String, required: true },
    badge:         { type: String, enum: ['sale', 'new', 'bestseller', null, ''], default: null },
    rating:        { type: Number, default: 4.5, min: 0, max: 5 },
    reviewCount:   { type: Number, default: 0 },
    stock:         { type: Number, default: 50 },
    featured:      { type: Boolean, default: false },
    flashSale:     { type: Boolean, default: false },
    createdAt:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
