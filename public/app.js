// ============================================================
//  app.js — Shared frontend utilities for SOFA
//  Handles: API base URL, auth (JWT), helpers
// ============================================================

const API = '';  // same origin — no prefix needed when served by Express

/* ---------- Auth Helpers ---------- */

function getToken() { return localStorage.getItem('sofa_token'); }

function getUser()  {
    const u = localStorage.getItem('sofa_user');
    return u ? JSON.parse(u) : null;
}

function isLoggedIn() { return !!getToken(); }
function isAdmin()    { return getUser()?.role === 'admin'; }

function logout() {
    localStorage.removeItem('sofa_token');
    localStorage.removeItem('sofa_user');
    window.location.href = '/login.html';
}

/* ---------- Authenticated fetch ---------- */

async function apiFetch(url, options = {}) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + url, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}

/* ---------- Cart (localStorage-based) ---------- */

const CART_KEY = 'sofa_cart';

function getCart()        { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart)   { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function getCartCount()   { return getCart().reduce((s, i) => s + i.qty, 0); }
function getCartTotal()   { return getCart().reduce((s, i) => s + i.price * i.qty, 0); }

function addToCart(product) {
    const cart = getCart();
    const ex   = cart.find(i => i._id === product._id);
    if (ex) { ex.qty += 1; }
    else { cart.push({ ...product, qty: 1 }); }
    saveCart(cart);
    updateCartBadge();
    showToast(`"${product.name}" added to cart!`);
}

function removeFromCart(id) {
    saveCart(getCart().filter(i => i._id !== id));
    updateCartBadge();
}

function updateQty(id, delta) {
    const cart = getCart().map(i => i._id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0);
    saveCart(cart);
    updateCartBadge();
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const n = getCartCount();
    badge.textContent = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
}

/* ---------- Toast ---------- */

function showToast(msg, type = 'success') {
    let t = document.getElementById('sofa-toast');
    if (!t) { t = document.createElement('div'); t.id = 'sofa-toast'; document.body.appendChild(t); }
    t.className = `sofa-toast ${type}`;
    t.innerHTML = `<span>${type === 'success' ? '✔' : '✖'}</span> ${msg}`;
    t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ---------- Product Card Renderer ---------- */

function renderStars(rating) {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

function formatPrice(n) {
    return '₹' + Number(n).toLocaleString('en-IN');
}

function discountPct(price, orig) {
    return orig ? Math.round((1 - price / orig) * 100) : 0;
}

function productCard(p) {
    const pct = discountPct(p.price, p.originalPrice);
    return `
    <div class="prod-card" data-id="${p._id}">
        <div class="prod-img-wrap">
            <img src="${p.imageUrl}" alt="${p.name}" loading="lazy">
            ${p.badge ? `<span class="prod-badge badge-${p.badge}">${p.badge}</span>` : ''}
            ${pct > 0 ? `<span class="prod-badge badge-pct">${pct}% off</span>` : ''}
        </div>
        <div class="prod-body">
            <p class="prod-cat">${p.category.replace('-', ' ')}</p>
            <h3 class="prod-name">${p.name}</h3>
            <div class="prod-rating">
                <span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5-Math.round(p.rating))}</span>
                <span class="rev-count">(${p.reviewCount})</span>
            </div>
            <div class="prod-price">
                <span class="price-now">${formatPrice(p.price)}</span>
                ${p.originalPrice ? `<span class="price-old">${formatPrice(p.originalPrice)}</span>` : ''}
            </div>
            <button class="atc-btn" onclick='handleAddToCart(${JSON.stringify(p)})'>Add to Cart</button>
        </div>
    </div>`;
}

function handleAddToCart(p) {
    addToCart(p);
    event.currentTarget.textContent = '✔ Added!';
    event.currentTarget.style.background = '#2d5a27';
    setTimeout(() => {
        event.currentTarget.textContent = 'Add to Cart';
        event.currentTarget.style.background = '';
    }, 1200);
}

/* ---------- Nav: inject logged-in state ---------- */

function initNav() {
    updateCartBadge();
    const user = getUser();
    const navUser = document.getElementById('nav-user');
    if (!navUser) return;
    if (user) {
        navUser.innerHTML = `
            <span style="color:#e8f0e5;font-size:0.8rem;">Hi, ${user.name.split(' ')[0]}</span>
            ${user.role === 'admin' ? '<a href="/admin.html" class="nav-admin-link">Admin</a>' : ''}
            <button onclick="logout()" class="nav-logout-btn">Logout</button>`;
    } else {
        navUser.innerHTML = `<a href="/login.html" class="nav-login-link">Login</a>`;
    }
}

document.addEventListener('DOMContentLoaded', initNav);
