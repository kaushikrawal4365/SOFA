# 🛋️ SOFA — Getting Started (Friend Setup Guide)

Everything your friend needs to go from **zero to running** in 5 steps.

---

## ✅ What you need first

| Requirement                  | Download                                            |
| ---------------------------- | --------------------------------------------------- |
| Node.js (v18 or higher)      | [nodejs.org](https://nodejs.org) → Download **LTS** |
| A free MongoDB Atlas account | [cloud.mongodb.com](https://cloud.mongodb.com)      |

---

## Step 1 — Extract the ZIP

Extract the downloaded ZIP anywhere on your computer. Inside you'll see files like `server.js`, `package.json`, `public/`, etc.

---

## Step 2 — Create a free MongoDB Atlas database

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a **free account**
2. Click **"Build a Database"** → Select the **Free (M0)** tier → Click Create
3. During setup, it will ask you to create a **Database User**:
   - Pick any username (e.g. `sofaadmin`)
   - Click **"Autogenerate Secure Password"** → **copy the password immediately**
4. Under **"Where would you like to connect from?"** → choose **"My Local Environment"** → Add IP `0.0.0.0/0` (allows all)
5. Click **"Go to Database"**

**Get your connection string:**

- Click **"Connect"** on your cluster → **"Drivers"** → Copy the string
- It looks like: `mongodb+srv://sofaadmin:YourPassword@cluster0.xxxxx.mongodb.net/...`

---

## Step 3 — Create your `.env` file

Inside the project folder, create a **new file** called exactly `.env` (with the dot, no extension) and paste this:

```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sofa-db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=sofa_super_secret_jwt_key_2024
PORT=3000
```

**Edit the `MONGODB_URI` line:**

- Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your Atlas database user credentials
- Make sure `sofa-db` is in the URL before the `?` (this is your database name)

> ⚠️ The `.env` file is NOT included in the download — it contains your private credentials.

---

## Step 4 — Install & Seed

Open a **terminal / command prompt** inside the project folder and run these **one at a time**:

```bash
npm install
```

_(installs all required packages — takes ~1 minute)_

```bash
npm run seed
```

_(creates the admin account + loads 22 sample products into your database)_

You should see:

```
✅ Connected to MongoDB
✅ Admin user created: admin@sofa.com / Admin@1234
✅ Seeded 22 products
🎉 Seed complete! Run: npm start
```

---

## Step 5 — Run the app!

```bash
npm start
```

Then open your browser and go to:

# 👉 http://localhost:3000

---

## 🔑 Login credentials

| Account      | Email                     | Password     | Access                        |
| ------------ | ------------------------- | ------------ | ----------------------------- |
| Admin        | `admin@sofa.com`          | `Admin@1234` | Admin Dashboard (/admin.html) |
| Regular user | Sign up at `/signup.html` | Your choice  | Shop + Cart                   |

---

## 🌐 Pages

| URL                                   | What it is                   |
| ------------------------------------- | ---------------------------- |
| `http://localhost:3000`               | Home page                    |
| `http://localhost:3000/products.html` | Shop all products            |
| `http://localhost:3000/login.html`    | Login                        |
| `http://localhost:3000/signup.html`   | Create account               |
| `http://localhost:3000/cart.html`     | Shopping cart                |
| `http://localhost:3000/about.html`    | About Us                     |
| `http://localhost:3000/admin.html`    | Admin dashboard (admin only) |

---

## 🛒 What you can do

- **Browse & filter** products by category (Living Room / Bed Room / Dining Room / Office)
- **Search** for furniture from the navbar
- **Sort** by price or rating
- **Add items to cart** — see the live counter badge update
- **Login / Sign up** with real accounts stored in MongoDB
- **Admin:** Add new products, edit prices, delete items — all changes are instant

---

## ❗ Common issues

| Problem                             | Fix                                                             |
| ----------------------------------- | --------------------------------------------------------------- |
| `Error: MONGODB_URI is not defined` | Your `.env` file is missing or in the wrong folder              |
| `MongoServerError: bad auth`        | Wrong password in the URI — reset it in Atlas → Database Access |
| `Cannot connect to localhost:3000`  | Server is not running — run `npm start` again                   |
| Images not loading                  | You need an internet connection (images come from Unsplash CDN) |

---

> Keep the terminal running `npm start` open while using the app.
> To stop the server: press **Ctrl + C** in the terminal.
