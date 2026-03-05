# SOFA — Online Furniture Store 🛋️

A multi-page front-end e-commerce website for a furniture brand built with pure **HTML**, **CSS**, and **JavaScript**. No frameworks, no back-end, no build tools — just open the files in a browser.

---

## 📁 Project Structure

```
HTML/
├── index.html          ← Home Page
├── login.html          ← Login Page (working auth)
├── signup.html         ← Sign Up Page (working auth)
├── about.html          ← About Us + Category Grid
├── products.html       ← All Product Categories
├── living-room.html    ← Living Room Products
├── bed-room.html       ← Bed Room Products
├── dining-room.html    ← Dining Room Products
├── office.html         ← Office Products
├── cart.html           ← Shopping Cart Page
├── style.css           ← Shared Global Stylesheet
├── cart.js             ← Shared Cart Logic
├── logo.jpg            ← Brand Logo
└── README.md           ← This file
```

---

## 🚀 How to Run

### Option 1 — Double Click (Simplest)

1. Extract the ZIP to any folder on your computer.
2. Open the folder and double-click **`index.html`**.
3. It opens in your default browser — no installation needed.

### Option 2 — VS Code Live Server (Recommended)

1. Open the project folder in [VS Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` → **"Open with Live Server"**.

> **⚠️ Internet Required:** Product images are loaded from [Unsplash](https://unsplash.com) via URL. An internet connection is needed for images to appear.

---

## 🌐 Pages Overview

| Page        | File               | Description                              |
| ----------- | ------------------ | ---------------------------------------- |
| Home        | `index.html`       | Full-screen sofa hero + tagline          |
| Login       | `login.html`       | Split-panel sign in with validation      |
| Sign Up     | `signup.html`      | Registration form with validation        |
| About Us    | `about.html`       | Brand story + category cards             |
| Products    | `products.html`    | All 4 categories in arch-card layout     |
| Living Room | `living-room.html` | 8 products + Add to Cart                 |
| Bed Room    | `bed-room.html`    | 8 products + Add to Cart                 |
| Dining Room | `dining-room.html` | 8 products + Add to Cart                 |
| Office      | `office.html`      | 8 products + Add to Cart                 |
| Cart        | `cart.html`        | Cart with qty controls, total & checkout |

---

## ✨ Features

### 🔐 Login / Sign Up

- **Built-in demo account:** username `admin` / password `admin123`
- Sign up saves a custom account to browser storage
- Login validates against the saved or demo account
- Green/red inline feedback messages
- Auto-redirects on success

### 🛒 Shopping Cart

- Click **"Add to Cart"** on any product — item is saved in browser storage
- **Cart badge** on the navbar shows live item count (red counter)
- **Toast notification** slides up confirming each item added
- Button briefly turns green ("✔ Added!") as visual feedback
- Navigate to the cart icon to view:
  - All added items with image, name, and price
  - **Quantity controls** (+/−) to change amounts
  - **Per-item subtotal** and running order total
  - **Remove** (✕) button per item
  - **Clear cart** button (with confirmation)
  - **Checkout** button (demo — shows success alert and clears cart)
- Cart persists across all pages during the same browser session

---

## 🛠️ Technologies Used

| Technology             | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| HTML5                  | Semantic page structure                      |
| CSS3                   | Flexbox, Grid, custom properties, animations |
| JavaScript (ES6)       | Cart logic, auth validation, localStorage    |
| Google Fonts (Poppins) | Typography (CDN)                             |
| Ionicons               | Icons (CDN)                                  |
| Unsplash               | Furniture images (CDN — requires internet)   |

---

_Copyrights © 2022 Sofa Online_
