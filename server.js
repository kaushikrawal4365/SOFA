require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const connectDB  = require('./config/db');

const app  = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Catch-all: serve index.html for any non-API route
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🛋️  SOFA Server running at http://localhost:${PORT}`);
    console.log(`   Admin credentials: admin@sofa.com / Admin@1234\n`);
});
