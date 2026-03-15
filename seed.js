require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('./models/User');
const Product  = require('./models/Product');

const PRODUCTS = [
    // Living Room
    { name: 'ARORA Sofa', description: 'A plush, L-shaped sectional sofa in premium fabric. Perfect centrepiece for any modern living room.', price: 25000, originalPrice: 32000, category: 'living-room', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', badge: 'sale', rating: 4.8, reviewCount: 124, stock: 15, featured: true, flashSale: false },
    { name: 'MATRIX Sofa', description: 'Contemporary three-seater with clean lines and high-density foam cushions.', price: 15000, originalPrice: null, category: 'living-room', imageUrl: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80', badge: 'new', rating: 4.5, reviewCount: 86, stock: 20, featured: true, flashSale: true },
    { name: 'MAVEN Sofa', description: 'Mid-century modern design with walnut legs and a rich charcoal upholstery.', price: 18000, originalPrice: 22000, category: 'living-room', imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80', badge: 'sale', rating: 4.7, reviewCount: 95, stock: 12, featured: false, flashSale: true },
    { name: 'NORDIC Sofa', description: 'Scandinavian-inspired loveseat in soft linen fabric, ideal for compact spaces.', price: 15000, originalPrice: null, category: 'living-room', imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80', badge: null, rating: 4.4, reviewCount: 63, stock: 25, featured: false, flashSale: false },
    { name: 'LUXE Sofa', description: 'Signature velvet sofa with brass-tipped legs and deep button tufting.', price: 22000, originalPrice: 28000, category: 'living-room', imageUrl: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&q=80', badge: 'bestseller', rating: 4.9, reviewCount: 210, stock: 8, featured: true, flashSale: false },
    { name: 'URBAN Sofa', description: 'Modular sofa system — configure it any way you like for your living space.', price: 13500, originalPrice: null, category: 'living-room', imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80', badge: null, rating: 4.3, reviewCount: 44, stock: 30, featured: false, flashSale: false },
    { name: 'SERENE Sofa', description: 'Relaxed low-profile sofa with feather-down cushions and a linen slipcover.', price: 19000, originalPrice: 24000, category: 'living-room', imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80', badge: 'sale', rating: 4.6, reviewCount: 78, stock: 18, featured: false, flashSale: false },
    { name: 'ECLIPSE Sofa', description: 'Curved sofa silhouette with boucle upholstery in warm cream tones.', price: 17000, originalPrice: null, category: 'living-room', imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80', badge: 'new', rating: 4.7, reviewCount: 56, stock: 22, featured: false, flashSale: false },

    // Bed Room
    { name: 'ARORA Bed', description: 'Upholstered king-sized bed frame with a padded headboard in charcoal grey.', price: 25000, originalPrice: 32000, category: 'bed-room', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80', badge: 'sale', rating: 4.8, reviewCount: 98, stock: 10, featured: true, flashSale: true },
    { name: 'MATILDA Bed', description: 'Solid oak platform bed with a minimalist, low-profile design.', price: 15000, originalPrice: null, category: 'bed-room', imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80', badge: null, rating: 4.5, reviewCount: 72, stock: 15, featured: false, flashSale: false },
    { name: 'MAVEN Bed', description: 'Four-poster queen bed in dark walnut with clean geometric lines.', price: 18000, originalPrice: 23000, category: 'bed-room', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80', badge: 'sale', rating: 4.6, reviewCount: 55, stock: 12, featured: false, flashSale: false },
    { name: 'NORDIC Bed', description: 'Scandinavian pine bed frame with slat base — no box spring needed.', price: 15000, originalPrice: null, category: 'bed-room', imageUrl: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba97?w=600&q=80', badge: 'new', rating: 4.4, reviewCount: 38, stock: 20, featured: false, flashSale: false },
    { name: 'LUXE Bed', description: 'Glamorous velvet bed with gold accents and integrated storage drawers.', price: 21000, originalPrice: 27000, category: 'bed-room', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80', badge: 'bestseller', rating: 4.9, reviewCount: 147, stock: 6, featured: true, flashSale: false },
    { name: 'ECLIPSE Bed', description: 'Curved headboard bed in stone-wash linen for a calm, serene bedroom.', price: 14000, originalPrice: null, category: 'bed-room', imageUrl: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=600&q=80', badge: null, rating: 4.3, reviewCount: 29, stock: 18, featured: false, flashSale: false },

    // Dining Room
    { name: 'ARORA Dining Table', description: 'Extendable 8-seater dining table in solid teak — seats 6-10 comfortably.', price: 75000, originalPrice: 90000, category: 'dining-room', imageUrl: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=600&q=80', badge: 'sale', rating: 4.9, reviewCount: 63, stock: 5, featured: true, flashSale: false },
    { name: 'MATILDA Dining Table', description: 'Round marble-top dining table with a black powder-coated steel base.', price: 15000, originalPrice: null, category: 'dining-room', imageUrl: 'https://images.unsplash.com/photo-1549488396-c0e66b0a0c2d?w=600&q=80', badge: 'new', rating: 4.6, reviewCount: 42, stock: 12, featured: false, flashSale: false },
    { name: 'MAVEN Dining Table', description: 'Sleek 4-seater dining table in smoked glass with brushed gold legs.', price: 18000, originalPrice: 22000, category: 'dining-room', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', badge: 'sale', rating: 4.5, reviewCount: 37, stock: 10, featured: false, flashSale: true },
    { name: 'NORDIC Dining Table', description: 'Solid birch dining table with a whitewash finish — timeless Scandinavian simplicity.', price: 15000, originalPrice: null, category: 'dining-room', imageUrl: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=600&q=80', badge: null, rating: 4.4, reviewCount: 28, stock: 15, featured: false, flashSale: false },

    // Office
    { name: 'ARORA Desk', description: 'Executive workstation with built-in cable management and a keyboard tray.', price: 25000, originalPrice: 30000, category: 'office', imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80', badge: 'sale', rating: 4.7, reviewCount: 88, stock: 20, featured: true, flashSale: false },
    { name: 'MATRIX Desk', description: 'Minimalist standing desk with motorised height adjustment — sit or stand.', price: 15000, originalPrice: null, category: 'office', imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80', badge: 'new', rating: 4.8, reviewCount: 112, stock: 18, featured: true, flashSale: true },
    { name: 'MAVEN Office Chair', description: 'Ergonomic mesh chair with 4-way lumbar support and adjustable armrests.', price: 18000, originalPrice: 24000, category: 'office', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80', badge: 'bestseller', rating: 4.9, reviewCount: 235, stock: 30, featured: true, flashSale: false },
    { name: 'NORDIC Bookshelf', description: 'Open modular bookshelf in solid pine — fully customisable arrangement.', price: 15000, originalPrice: null, category: 'office', imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80', badge: null, rating: 4.5, reviewCount: 54, stock: 25, featured: false, flashSale: false }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Create admin if not exists
        let admin = await User.findOne({ email: 'admin@sofa.com' });
        if (!admin) {
            admin = await User.create({
                name: 'Admin',
                email: 'admin@sofa.com',
                password: 'Admin@1234',
                role: 'admin'
            });
            console.log('✅ Admin user created: admin@sofa.com / Admin@1234');
        } else {
            console.log('ℹ️  Admin already exists');
        }

        // Seed products if DB is empty
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(PRODUCTS);
            console.log(`✅ Seeded ${PRODUCTS.length} products`);
        } else {
            console.log(`ℹ️  ${count} products already exist — skipping product seed`);
        }

        console.log('\n🎉 Seed complete! Run: npm start');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err);
        process.exit(1);
    }
}

seed();
