/* ============================================================
   TERYX E-COMMERCE — script.js
   ============================================================ */

/* ─────────────────────────────────────────────
   1. PRODUCTS DATA — array of objects
   ───────────────────────────────────────────── */
const products = [
  { id: 1, name: "Phantom X Pro",   price: 1199, category: "phones",  desc: "6.7″ AMOLED, 200MP, titanium frame.",    image: "images/blacksp.jpeg" },
  { id: 2, name: "Nova Slim 15",    price:  849, category: "phones",  desc: "Ultra-thin design, 5000mAh battery.",    image: "images/grey3sp.jpeg" },
  { id: 3, name: "Aurex Vante",    price:  789, category: "phones",  desc: "Obsidian glass and aerospace titanium.",    image: "images/grey2sp.jpeg" },
  { id: 4, name: "Veltrix Eon",    price:  679, category: "phones",  desc: "Crafted in deep matte carbon with luminous edge display.",    image: "images/samsungs20.jpeg" },
  { id: 5, name: "Solvane X",    price:  489, category: "phones",  desc: "Precision-machined with a sapphire-coated body.",    image: "images/whitesp.jpeg" },
  { id: 6, name: "Apex Studio 16",  price: 1499, category: "laptops", desc: "M-series chip, 16″ mini-LED display.",   image: "images/laptop1.jpeg" },
  { id: 7, name: "Celestia Core X",  price: 1609, category: "laptops", desc: "A futuristic workstation, near zero bezel display.",   image: "images/laptop6.jpeg" },
  { id: 8, name: "Novaryn Edge Pro",  price: 1050, category: "laptops", desc: "Encrypted hardware layers, elite processing speeds.",   image: "images/applelaptop.jpeg" },
  { id: 10, name: "Orionis Vault",   price:  999, category: "laptops", desc: "990g, all-day battery, OLED screen.",    image: "images/laptop2.jpeg" },
  { id: 11, name: "Meridian Tote",   price:  220, category: "bags",    desc: "Full-grain leather, padded compartment.",image: "images/brownclutchhb.jpeg" },
  { id: 12, name: "Valcieri Monarch Tote",  price:  140, category: "bags",    desc: "Compact profile, magnetic closure.",     image: "images/greyhb.jpeg" },
  { id: 13, name: "Elara Veil Satchel",  price:  155, category: "bags",    desc: "Soft curves, subtle gold accents.",     image: "images/brownhb.jpeg" },
  { id: 14, name: "Sylthra Essence Clutch",  price:  240, category: "bags",    desc: "Striking, sculpted metallic frame.",     image: "images/greycrossbag.jpeg" },
  { id: 15, name: "Dravon Crest Pack",  price:  135, category: "bags",    desc: "Hand-stitched from rare Italian leather.",     image: "images/twinhb.jpeg" },
  { id: 16, name: "Velorum Infinite",     price:  390, category: "watches", desc: "Bold, weighty, intricate mechanical artistry.",image: "images/watch1.jpeg" },
  { id: 17, name: "Chronyx Sovereign",     price:  460, category: "watches", desc: "Refined circular design with glowing edge dial.",image: "images/watch4.jpeg" },
  { id: 18, name: "Orvane Eclipse",     price:  370, category: "watches", desc: "Dark-toned masterpiece, partially exposed mechanism.",image: "images/watch6.jpeg" },
  { id: 19, name: "Chrono Noir",     price:  1320, category: "watches", desc: "Swiss movement, sapphire crystal glass.",image: "images/watch2.jpeg" },
  { id: 20, name: "Luxaris Halo",     price:  357, category: "watches", desc: "A precision time-piece, sapphire crystal.",image: "images/silverwatch.jpeg" },
  { id: 21, name: "Meridian Steel",  price:  280, category: "watches", desc: "316L stainless steel, 50m water resist.",image: "images/watch14.jpeg" },
];

/* ─────────────────────────────────────────────
   2. CART UTILITIES — localStorage operations
   All wrapped in try/catch as required by PDF
   ───────────────────────────────────────────── */

/** Retrieve cart from localStorage. Returns empty array on error. */
function getCart() {
  try {
    const raw = localStorage.getItem("teryx_cart");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading cart from localStorage:", err);
    return [];
  }
}

/** Save cart array to localStorage */
function saveCart(cart) {
  try {
    localStorage.setItem("teryx_cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Error saving cart to localStorage:", err);
  }
}

/** Add a product to cart or increment quantity if already present */
function addToCart(productId) {
  try {
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error("Product not found: " + productId);

    const cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartCounter();

    // Show toast notification with product name
    showToast(product.name, product.category);
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}

/** Remove an item from cart by product id */
function removeFromCart(productId) {
  try {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCounter();
  } catch (err) {
    console.error("Error removing from cart:", err);
  }
}

/** Change quantity of a cart item. Removes item if qty reaches 0 */
function updateQuantity(productId, delta) {
  try {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) throw new Error("Item not in cart: " + productId);

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart(cart);
    updateCartCounter();
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
}

/** Returns total number of items in cart */
function getCartCount() {
  try {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
  } catch (err) {
    return 0;
  }
}

/** Returns cart subtotal */
function getCartTotal() {
  try {
    return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  } catch (err) {
    return 0;
  }
}

/* ─────────────────────────────────────────────
   3. CART COUNTER — updates on all pages
   Uses getElementById
   ───────────────────────────────────────────── */
function updateCartCounter() {
  // getElementById — DOM manipulation 
  const counters = document.querySelectorAll(".cart-count");
  const count = getCartCount();

  counters.forEach(el => {
    el.textContent = count;
    // Visual "bump" animation on change
    el.classList.remove("bump");
    void el.offsetWidth; // force reflow
    el.classList.add("bump");
    setTimeout(() => el.classList.remove("bump"), 300);
  });
}

/* ─────────────────────────────────────────────
   4. TOAST NOTIFICATION
   Shows a contextual message when product is added
   Uses createElement, appendChild 
   ───────────────────────────────────────────── */
function showToast(productName, category) {
  try {
    const container = document.getElementById("toasts");
    if (!container) return;

    // createElement — DOM manipulation 
    const toast = document.createElement("div");
    toast.className = "toast";

    // Category-based messages
    const messages = {
      phones:  "Ready to upgrade your carry.",
      laptops: "Powering your next build.",
      bags:    "Style meets function.",
      watches: "Time, elevated.",
    };
    const sub = messages[category] || "Added to your selection.";

    // innerHTML — DOM manipulation
    toast.innerHTML = `
      <div class="toast-ico">✓</div>
      <div>
        <div class="toast-title">${productName} — added to cart</div>
        <div class="toast-sub">${sub}</div>
      </div>
    `;

    // appendChild — DOM manipulation 
    container.appendChild(toast);

    // Auto-dismiss after 2.8 seconds
    setTimeout(() => {
      toast.classList.add("bye");
      setTimeout(() => toast.remove(), 320);
    }, 2800);
  } catch (err) {
    console.error("Toast error:", err);
  }
}

/* ─────────────────────────────────────────────
   5. HEADER scroll effect & mobile nav
   Uses addEventListener 
   ───────────────────────────────────────────── */
function initHeader() {
  const header = document.querySelector(".site-header");
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  // addEventListener — DOM event handling 
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  });

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileNav.classList.toggle("open");
    });
  }
}

/* ─────────────────────────────────────────────
   6. HERO CAROUSEL — fade in / fade out
   Uses addEventListener, querySelector, classList
   ───────────────────────────────────────────── */
function initHeroCarousel() {
  try {
    const slides = document.querySelectorAll(".hero-slide");
    const dots   = document.querySelectorAll(".hero-dot");
    if (!slides.length) return;

    let current = 0;
    let timer;

    /** Activate a specific slide by index */
    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current] && dots[current].classList.remove("active");

      current = (index + slides.length) % slides.length;

      slides[current].classList.add("active");
      dots[current] && dots[current].classList.add("active");
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(next, 4500);
    }

    // Arrow buttons
    const prevBtn = document.querySelector(".hero-arr.prev");
    const nextBtn = document.querySelector(".hero-arr.next");
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); startTimer(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { next(); startTimer(); });

    // Dot buttons
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => { goTo(i); startTimer(); });
    });

    // Init first slide
    goTo(0);
    startTimer();
  } catch (err) {
    console.error("Hero carousel error:", err);
  }
}

/* ─────────────────────────────────────────────
   7. CARD WHEEL — glassmorphism category carousel
   Clicking centre card navigates to products page
   filtered by that category
   ───────────────────────────────────────────── */
function initCardWheel() {
  try {
    const cards   = document.querySelectorAll(".wheel-card");
    const prevBtn = document.querySelector(".wheel-nav.prev");
    const nextBtn = document.querySelector(".wheel-nav.next");
    if (!cards.length) return;

    const total = cards.length;
    let offset = 0; // how many steps we've rotated

    /** Update each card's data-pos based on current offset */
    function updatePositions() {
      cards.forEach((card, i) => {
        // Calculate visual position (-2 to +2 range)
        let pos = ((i - offset) % total + total) % total;
        if (pos > total / 2) pos -= total;
        card.dataset.pos = pos;
      });
    }

    function rotateNext() { offset = (offset + 1) % total; updatePositions(); }
    function rotatePrev() { offset = (offset - 1 + total) % total; updatePositions(); }

    // Navigate to products page filtered by category when clicking centre card
    cards.forEach(card => {
      card.addEventListener("click", () => {
        if (card.dataset.pos === "0") {
          const cat = card.dataset.category;
          window.location.href = "products.html?category=" + cat;
        } else {
          // Clicking non-centre card rotates to it
          const pos = parseInt(card.dataset.pos);
          if (pos > 0) for (let i = 0; i < pos; i++) rotateNext();
          else for (let i = 0; i < Math.abs(pos); i++) rotatePrev();
        }
      });
    });

    if (prevBtn) prevBtn.addEventListener("click", rotatePrev);
    if (nextBtn) nextBtn.addEventListener("click", rotateNext);

    // Auto-rotate the wheel slowly
    let autoSpin = setInterval(rotateNext, 3500);
    const wheel = document.querySelector(".wheel-wrap");
    if (wheel) {
      wheel.addEventListener("mouseenter", () => clearInterval(autoSpin));
      wheel.addEventListener("mouseleave", () => { autoSpin = setInterval(rotateNext, 3500); });
    }

    updatePositions();
  } catch (err) {
    console.error("Card wheel error:", err);
  }
}

/* ─────────────────────────────────────────────
   8. PRODUCTS PAGE — render, search, filter
   Uses createElement, appendChild, innerHTML,
   addEventListener, querySelector 
   ───────────────────────────────────────────── */
function initProductsPage() {
  try {
    const grid       = document.getElementById("prod-grid");
    const searchEl   = document.getElementById("search-input");
    const countEl    = document.getElementById("results-count");
    const priceSlider= document.getElementById("price-range");
    const priceVal   = document.getElementById("price-val");
    const sortSel    = document.getElementById("sort-select");
    if (!grid) return;

    // Read ?category= from URL to pre-filter (from card wheel click)
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat    = urlParams.get("category");

    // Set category checkbox if URL param is present
    if (urlCat) {
      const cb = document.querySelector(`input[name="cat"][value="${urlCat}"]`);
      if (cb) cb.checked = true;
    }

    /** Render a product card using DOM manipulation */
    function renderCard(product) {
      // createElement 
      const card = document.createElement("div");
      card.className = "prod-card fade-in";

      // innerHTML 
      card.innerHTML = `
        <div class="prod-img" data-cat="${product.category}">
          <img src="${product.image}" alt="${product.name}"
               onerror="this.style.display='none'">
          <span class="cat-tag">${product.category}</span>
        </div>
        <div class="prod-info">
          <div class="prod-name">${product.name}</div>
          <div class="prod-desc">${product.desc}</div>
          <div class="prod-foot">
            <span class="prod-price">$${product.price.toLocaleString()}</span>
            <button class="btn-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;

      // addEventListener on the Add to Cart button 
      const btn = card.querySelector(".btn-cart");
      btn.addEventListener("click", () => addToCart(product.id));

      return card;
    }

    /** Filter + sort + render all matching products */
    function filterAndRender() {
      try {
        const query    = searchEl ? searchEl.value.trim().toLowerCase() : "";
        const maxPrice = priceSlider ? parseInt(priceSlider.value) : 99999;
        const sortBy   = sortSel ? sortSel.value : "default";

        // Get checked categories
        const checkedCats = [...document.querySelectorAll('input[name="cat"]:checked')]
          .map(cb => cb.value);

        let filtered = products.filter(p => {
          const matchSearch   = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
          const matchCat      = checkedCats.length === 0 || checkedCats.includes(p.category);
          const matchPrice    = p.price <= maxPrice;
          return matchSearch && matchCat && matchPrice;
        });

        // Sorting
        if (sortBy === "price-asc")  filtered.sort((a,b) => a.price - b.price);
        if (sortBy === "price-desc") filtered.sort((a,b) => b.price - a.price);
        if (sortBy === "name-asc")   filtered.sort((a,b) => a.name.localeCompare(b.name));

        // Clear grid — innerHTML 
        grid.innerHTML = "";

        if (filtered.length === 0) {
          grid.innerHTML = `<p class="empty-msg">No products match your search.</p>`;
        } else {
          filtered.forEach(p => grid.appendChild(renderCard(p)));
        }

        if (countEl) countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`;
      } catch (err) {
        console.error("Filter/render error:", err);
        grid.innerHTML = `<p class="empty-msg">Something went wrong. Please refresh.</p>`;
      }
    }

    // Wire up events — addEventListener 
    if (searchEl) searchEl.addEventListener("input", filterAndRender);
    if (priceSlider) {
      priceSlider.addEventListener("input", () => {
        if (priceVal) priceVal.textContent = "$" + parseInt(priceSlider.value).toLocaleString();
        filterAndRender();
      });
    }
    if (sortSel) sortSel.addEventListener("change", filterAndRender);

    document.querySelectorAll('input[name="cat"]').forEach(cb => {
      cb.addEventListener("change", filterAndRender);
    });

    filterAndRender(); // initial render
  } catch (err) {
    console.error("Products page init error:", err);
  }
}

/* ─────────────────────────────────────────────
   9. CART PAGE — render items, quantities, total
   Uses createElement, appendChild, addEventListener,
   innerHTML, localStorage 
   ───────────────────────────────────────────── */
function initCartPage() {
  try {
    const itemsWrap = document.getElementById("cart-items");
    const emptyWrap = document.getElementById("cart-empty");
    const checkoutBtn = document.getElementById("checkout-btn");
    if (!itemsWrap) return;

    function renderCart() {
      try {
        const cart = getCart();

        // Clear existing items
        itemsWrap.innerHTML = "";

        if (cart.length === 0) {
          itemsWrap.style.display = "none";
          if (emptyWrap) emptyWrap.style.display = "block";
          if (checkoutBtn) checkoutBtn.classList.add("off");
          updateSummary(0, 0);
          return;
        }

        itemsWrap.style.display = "block";
        if (emptyWrap) emptyWrap.style.display = "none";
        if (checkoutBtn) checkoutBtn.classList.remove("off");

        cart.forEach(item => {
          // createElement
          const row = document.createElement("div");
          row.className = "cart-item";
          row.dataset.id = item.id;

          // innerHTML
          row.innerHTML = `
            <div class="c-img" data-cat="${item.category}">
              <img src="${item.image}" alt="${item.name}"
                   onerror="this.style.display='none'">
            </div>
            <div>
              <div class="c-name">${item.name}</div>
              <div class="c-cat">${item.category}</div>
              <div class="qty-ctrl">
                <button class="qty-btn minus" aria-label="Decrease">−</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn plus" aria-label="Increase">+</button>
              </div>
            </div>
            <div class="c-right">
              <span class="c-price">$${(item.price * item.quantity).toLocaleString()}</span>
              <button class="btn-rm">Remove</button>
            </div>
          `;

          // addEventListener on quantity and remove buttons 
          row.querySelector(".minus").addEventListener("click", () => {
            updateQuantity(item.id, -1);
            renderCart();
          });
          row.querySelector(".plus").addEventListener("click", () => {
            updateQuantity(item.id, 1);
            renderCart();
          });
          row.querySelector(".btn-rm").addEventListener("click", () => {
            removeFromCart(item.id);
            renderCart();
          });

          // appendChild 
          itemsWrap.appendChild(row);
        });

        // Calculate totals
        const subtotal = getCartTotal();
        const shipping = subtotal > 0 ? 15 : 0;
        const total    = subtotal + shipping;
        updateSummary(subtotal, shipping, total);

      } catch (err) {
        console.error("Render cart error:", err);
        itemsWrap.innerHTML = `<p style="color:#848484;padding:24px 0">Could not load cart. Please refresh.</p>`;
      }
    }

    function updateSummary(subtotal, shipping, total) {
      const sub  = document.getElementById("sum-subtotal");
      const shi  = document.getElementById("sum-shipping");
      const tot  = document.getElementById("sum-total");
      if (sub) sub.textContent = "$" + (subtotal || 0).toLocaleString();
      if (shi) shi.textContent = shipping > 0 ? "$" + shipping : "Free";
      if (tot) tot.textContent = "$" + (total || 0).toLocaleString();
    }

    renderCart();
  } catch (err) {
    console.error("Cart page init error:", err);
  }
}

/* ─────────────────────────────────────────────
   10. CHECKOUT PAGE — order summary + form validation
   Validates name, email, phone, address
   Uses try/catch error handling
   ───────────────────────────────────────────── */
function initCheckoutPage() {
  try {
    // Render order summary from cart
    renderCheckoutSummary();

    const form = document.getElementById("checkout-form");
    if (!form) return;

    // addEventListener on form submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validateAndSubmit();
    });

    // Real-time field validation on blur
    form.querySelectorAll(".finput").forEach(input => {
      input.addEventListener("blur", () => validateField(input));
    });

  } catch (err) {
    console.error("Checkout init error:", err);
  }
}

function renderCheckoutSummary() {
  try {
    const wrap    = document.getElementById("co-items");
    const totEl   = document.getElementById("co-total");
    const cart    = getCart();

    if (!wrap) return;
    wrap.innerHTML = "";

    // Guard: empty cart
    if (cart.length === 0) {
      wrap.innerHTML = `<p style="color:#848484;font-size:13px">Your cart is empty.</p>`;
      return;
    }

    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "co-item";
      div.innerHTML = `
        <div class="co-iimg" data-cat="${item.category}">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
        </div>
        <div>
          <div class="co-iname">${item.name}</div>
          <div class="co-iqty">Qty: ${item.quantity}</div>
        </div>
        <span class="co-iprice">$${(item.price * item.quantity).toLocaleString()}</span>
      `;
      wrap.appendChild(div);
    });

    const total = getCartTotal() + 15;
    if (totEl) totEl.textContent = "$" + total.toLocaleString();
  } catch (err) {
    console.error("Checkout summary error:", err);
  }
}

/** Validate a single form field. Returns true if valid. */
function validateField(input) {
  try {
    const id    = input.id;
    const val   = input.value.trim();
    const errEl = document.getElementById(id + "-err");
    let message = "";

    if (id === "co-name") {
      if (!val)            message = "Full name is required.";
      else if (val.length < 2) message = "Name must be at least 2 characters.";
    }
    if (id === "co-email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val)                  message = "Email address is required.";
      else if (!emailRegex.test(val)) message = "Please enter a valid email address.";
    }
    if (id === "co-phone") {
      const phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
      if (!val)                  message = "Phone number is required.";
      else if (!phoneRegex.test(val)) message = "Please enter a valid phone number.";
    }
    if (id === "co-address") {
      if (!val)            message = "Delivery address is required.";
      else if (val.length < 5) message = "Please enter a complete address.";
    }

    input.classList.toggle("err", !!message);
    if (errEl) errEl.textContent = message;
    return !message;
  } catch (err) {
    console.error("Field validation error:", err);
    return false;
  }
}

/** Validate all fields, then submit if all pass */
function validateAndSubmit() {
  try {
    const cart = getCart();

    // Error handling: empty cart
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const fields   = ["co-name", "co-email", "co-phone", "co-address"];
    const allValid = fields.every(id => {
      const el = document.getElementById(id);
      return el ? validateField(el) : false;
    });

    if (!allValid) return;

    // Successful order — clear cart and show success
    saveCart([]);
    updateCartCounter();
    showOrderSuccess();
  } catch (err) {
    console.error("Order submission error:", err);
    alert("Something went wrong. Please try again.");
  }
}

/** Show success state after order is placed */
function showOrderSuccess() {
  try {
    const formArea = document.getElementById("checkout-form-wrap");
    const coSum    = document.getElementById("co-summary-box");
    if (!formArea) return;

    formArea.innerHTML = `
      <div class="success-wrap fade-in">
        <div class="sico">✓</div>
        <h2>Order Confirmed</h2>
        <p>Thank you for shopping with Teryx. Your order has been received and is being processed. You will receive a confirmation email shortly.</p>
        <a href="index.html" class="btn-primary">Back to Home</a>
      </div>
    `;
    if (coSum) coSum.style.display = "none";
  } catch (err) {
    console.error("Success display error:", err);
  }
}

/* ─────────────────────────────────────────────
   11. SET ACTIVE NAV LINK
   ───────────────────────────────────────────── */
function setActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.includes(page)) link.classList.add("active");
  });
}

/* ─────────────────────────────────────────────
   12. PAGE DETECTION & INITIALISATION
   Runs the right functions depending on page
   ───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const page = document.body.dataset.page;

    // Always run on every page
    initHeader();
    updateCartCounter();
    setActiveNav();

    // Page-specific init
    if (page === "home")     { initHeroCarousel(); initCardWheel(); }
    if (page === "products") { initProductsPage(); }
    if (page === "cart")     { initCartPage(); }
    if (page === "checkout") { initCheckoutPage(); }

  } catch (err) {
    console.error("App init error:", err);
  }
});
