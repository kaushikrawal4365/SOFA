# 🛋️ SOFA — Full-Stack Online Furniture Store

A premium e-commerce furniture website built with **Node.js + Express + MongoDB Atlas** on the backend and clean **HTML/CSS/JS** on the frontend.

---

## ⚙️ Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Backend    | Node.js + Express.js                    |
| Database   | MongoDB Atlas (cloud)                   |
| Auth       | JWT (JSON Web Tokens)                   |
| Frontend   | HTML5, CSS3, Vanilla JS                 |
| Typography | Playfair Display + Inter (Google Fonts) |
| Icons      | Ionicons CDN                            |
| Images     | Unsplash CDN (internet required)        |

---

## 🚀 Setup & Run (First Time)

### Step 1 — Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org). Use the **LTS** version.

### Step 2 — Create a MongoDB Atlas Cluster (Free)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create a free account
2. Click **"Build a Database"** → Choose **Free tier (M0)**
3. Once created, click **"Connect"** → **"Drivers"** → copy the connection string
4. It looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`

### Step 3 — Create your `.env` file

Copy the example file and fill in your values:

```
# In the project folder, create a file named .env with:
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@yourCluster.mongodb.net/sofa-db?retryWrites=true&w=majority
JWT_SECRET=sofa_super_secret_2024
PORT=3000
```

### Step 4 — Install dependencies (already done if you received this zipped)

```bash
npm install
```

### Step 5 — Seed the database

This creates the admin user and 23 sample products:

```bash
npm run seed
```

> ✅ Output: `Admin user created: admin@sofa.com / Admin@1234` + products seeded

### Step 6 — Start the server

```bash
npm start
```

### Step 7 — Open in browser

Visit: **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Structure

```
SOFA/
├── server.js              ← Express app entry point
├── .env                   ← Your secrets (DO NOT share)
├── .env.example           ← Template for .env
├── package.json
├── seed.js                ← DB seeder (run once)
├── config/
│   └── db.js              ← MongoDB connection
├── models/
│   ├── User.js            ← User schema (name, email, password, role)
│   └── Product.js         ← Product schema
├── routes/
│   ├── auth.js            ← POST /api/auth/register, /login, /me
│   └── products.js        ← GET/POST/PUT/DELETE /api/products
├── middleware/
│   └── auth.js            ← JWT verify + admin guard
└── public/                ← All frontend files (served as static)
    ├── index.html         ← Home page
    ├── login.html         ← Login (JWT)
    ├── signup.html        ← Signup (JWT)
    ├── products.html      ← Shop — all products from DB
    ├── admin.html         ← Admin product dashboard (admin only)
    ├── cart.html          ← Shopping cart
    ├── about.html         ← About Us
    ├── style.css          ← New design system
    └── app.js             ← Shared frontend utilities
```

---

## 🌐 Pages

| URL              | Page                                                  | Auth Required           |
| ---------------- | ----------------------------------------------------- | ----------------------- |
| `/`              | Home — hero, categories, featured, flash sale         | No                      |
| `/products.html` | Shop — all products, filter by category, sort, search | No                      |
| `/login.html`    | Login                                                 | No                      |
| `/signup.html`   | Sign Up                                               | No                      |
| `/cart.html`     | Shopping cart                                         | No (login for checkout) |
| `/about.html`    | About Us                                              | No                      |
| `/admin.html`    | Admin Dashboard                                       | ✅ Admin only           |

---

## 🔐 Accounts

| Account         | Email                     | Password     | Role  |
| --------------- | ------------------------- | ------------ | ----- |
| Admin (seeded)  | `admin@sofa.com`          | `Admin@1234` | Admin |
| Create your own | Sign up at `/signup.html` | Your choice  | User  |

---

## 🛒 Features

### Shopping

- Browse all products — filter by category tab, sort by price/rating/newest
- Live search from navbar
- Add to Cart → toast notification + badge counter updates
- Cart persists across all pages (localStorage)
- Quantity controls, per-item subtotal, order total

### Auth

- JWT-based login/signup — token stored in localStorage
- Login/signup state shown in navbar (Hi, [Name] + Logout)
- Admin users are automatically redirected to Admin Dashboard on login

### Admin Dashboard

- Full product CRUD — Add, Edit, Delete
- Fields: name, description, category, sale price, original price, image URL, badge, rating, stock, review count, featured, flash sale
- Products appear live on the store after saving

### Home Page

- Tab-filtered product grid (Featured / Latest / Best Sellers)
- Flash sale section with countdown timer
- Shop by category (circular icons)
- Hero with 4 category cards

---

## 📡 API Reference

```
GET    /api/products                          All products
GET    /api/products?category=living-room     Filter by category
GET    /api/products?sort=price-asc           Sort (price-asc, price-desc, newest, rating)
GET    /api/products?featured=true            Featured only
GET    /api/products?flashSale=true           Flash sale items
GET    /api/products/:id                      Single product
POST   /api/products        [Admin]           Create product
PUT    /api/products/:id    [Admin]           Update product
DELETE /api/products/:id    [Admin]           Delete product

POST   /api/auth/register                     Register user
POST   /api/auth/login                        Login + get JWT
GET    /api/auth/me         [Auth]            Get current user
```

---

## ⚠️ Important Notes

- **Internet required** — Unsplash images load from CDN
- **`.env` must exist** before running `npm start`
- **Run `npm run seed` only once** — it skips if data already exists
- The app is frontend-only for the cart (localStorage) — no order persistence in DB

---

_Copyrights © 2024 Sofa Online_
