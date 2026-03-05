// ============================================================
//  cart.js — Shared cart logic for SOFA Online Store
//  Uses localStorage so cart persists across pages in the session
// ============================================================

const CART_KEY = "sofa_cart";

/* ---------- Core CRUD ---------- */

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(name, price, imgSrc) {
  const cart = getCart();
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, img: imgSrc, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`"${name}" added to cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartBadge();
  renderCartPage && renderCartPage();
}

function updateQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart(cart);
  updateCartBadge();
  renderCartPage && renderCartPage();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

/* ---------- Derived helpers ---------- */

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^\d]/g, ""), 10);
    return sum + num * item.qty;
  }, 0);
}

/* ---------- Badge ---------- */

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

/* ---------- Toast ---------- */

function showToast(message) {
  let toast = document.getElementById("sofa-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "sofa-toast";
    document.body.appendChild(toast);
  }
  toast.className = "sofa-toast";
  toast.innerHTML = `<span style="font-size:1.1rem;">✔</span> ${message}`;
  // Trigger animation
  toast.classList.remove("show");
  void toast.offsetWidth; // reflow
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- Auto-wire "Add to Cart" buttons on product pages ---------- */

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  // Wire all Add-to-Cart buttons using data attributes on .product-card
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".product-card");
      if (!card) return;
      const name = card.dataset.name || "Item";
      const price = card.dataset.price || "₹0";
      const img = card.querySelector("img")
        ? card.querySelector("img").src
        : "";
      addToCart(name, price, img);

      // Visual feedback on the button
      const orig = btn.textContent;
      btn.textContent = "✔ Added!";
      btn.style.background = "#27ae60";
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = "";
      }, 1200);
    });
  });
});
