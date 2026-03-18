# TERYX — Interactive E-Commerce Website
## GROUP MEMBERS
~Akoth Jacqueline Ochieng
~Akol Veronica
~Kasozi Remigious
~Ssemujju Hassan
~Ebong Newton Paul
~Nambooze Jovia
~Alibu Emmanuel
~Nanono Shamirah Shammah
~Jurugo Dan Lebu
~Ninsiima Caroline

## Overview

Teryx is a fully interactive e-commerce website built with vanilla HTML, CSS, and JavaScript. It sells premium tech and accessories across four categories: **Phones, Laptops, Bags, and Watches.**

The project demonstrates DOM manipulation, event handling, arrays and objects, localStorage persistence, form validation, and error handling as required by the JavaScript assignment brief.

## Pages

| File | Page | Purpose |
|------|------|---------|
| `index.html` | Home | Hero carousel + glassmorphism category card wheel |
| `products.html` | Products | Searchable, filterable product grid |
| `cart.html` | Cart | Cart items with quantity controls and order summary |
| `checkout.html` | Checkout | Validated checkout form + order confirmation |

## Project Structure

```
teryx/
├── index.html            ← Home page
├── products.html         ← Products page
├── cart.html             ← Cart page
├── checkout.html         ← Checkout page
│
├── css/
│   └── style.css         ← All styling (responsive, glassmorphism, animations)
│
├── js/
│   └── script.js         ← All JavaScript logic
│
├── images/               ← product photos here (see naming below)
│
└── code-explanation.html ← Full code explanation study guide (open in browser)
```

---

## Setup & Running

1. **Unzip** the project folder
2. **Add your product images** to the `images/` folder using the exact filenames below
3. **Open `index.html`** in any modern browser 

> The site runs entirely in the browser. Just double-click `index.html`.


## Image Naming Convention

Place your product photos in the `images/` 

> **No images yet?** The site still works, each category has a dark gradient placeholder that looks intentional. Add images any time.

## Features & Assignment Requirements

### Compulsory JavaScript Features (PDF)

| Requirement | Implementation |
|-------------|---------------|
| Products stored in JS array of objects | `products[]` in `script.js` — 21 products across 4 categories |
| Dynamic product display via DOM | `renderCard()` uses `createElement`, `innerHTML`, `appendChild` |
| Add to Cart | `addToCart()` — updates cart array and localStorage |
| Remove from Cart | `removeFromCart()` — remove button on every cart item |
| Quantity control | `+` / `−` buttons call `updateQuantity()`, total auto-updates |
| Cart counter | Badge in nav updates on every change with a pulse animation |
| Product search | Live search via `addEventListener("input")` on search bar |
| Category filter | Checkboxes filter by phones / laptops / bags / watches |
| localStorage | Cart persists across page refreshes and browser restarts |
| Checkout form validation | Name, email (regex), phone (regex), address — all validated |
| JavaScript error handling | Every function wrapped in `try/catch` |
| `document.getElementById()` | Cart counter, form fields, summary elements |
| `document.querySelector()` | Nav, slides, buttons, arrows |
| `createElement()` | Product cards, cart rows, toast notifications |
| `appendChild()` | Inserting cards into grid, rows into cart |
| `addEventListener()` | All buttons, inputs, form, scroll, hamburger |
| `innerHTML` | Rendering product cards and cart rows |

### Additional Features

- **Hero carousel** — fade in/out with auto-advance, arrow buttons, and dot indicators
- **Glassmorphism card wheel** — category selector with depth illusion; clicking the centre card navigates to that category's products page
- **Toast notifications** — contextual message when adding to cart, category-specific copy
- **Empty cart guard** — checkout blocked and alerts user if cart is empty
- **URL parameters** — clicking a category card passes `?category=phones` to products page and pre-filters automatically
- **Mobile responsive** — hamburger menu, stacked layouts, full mobile support
- **Three logo variants** — main (horizontal), secondary (stacked), footer (reversed/white)
- **Thin-line social icons** — X, WhatsApp, Instagram as inline SVG

## JavaScript Architecture

All logic lives in a single `script.js` file, organised into numbered sections:

```
1.  Products data array
2.  Cart utilities (getCart, saveCart, addToCart, removeFromCart, updateQuantity)
3.  Cart counter
4.  Toast notification
5.  Header scroll + mobile nav
6.  Hero carousel
7.  Card wheel
8.  Products page (render, search, filter, sort)
9.  Cart page (render, quantity, summary)
10. Checkout page (summary, form validation, order success)
11. Active nav link
12. Page detection and initialisation
```

Each function includes comments explaining the DOM operations it uses.

## Design System

**Typefaces**
- `Cormorant Garamond` — headings, product names, prices (elegant serif)
- `DM Sans` — body text, labels, buttons (clean sans-serif)

**Colour Palette**

| Name | Hex | Role |
|------|-----|------|
| Charcoal Noir | `#2B2B2B` | Primary text, buttons, footer background |
| Ironclad Grey | `#565656` | Secondary text, nav links |
| Urban Fog | `#848484` | Muted text, labels |
| Moonlit Silver | `#B3B3B3` | Dividers, placeholders |
| Cloud Veil | `#E0E0E0` | Borders, light backgrounds |
| Neon Ivory Glow | `#EDE7CF` | Accent — CTAs, cart badge, active states |

**Logo**
The Teryx mark is an inline SVG: a circle enclosing a geometric T shape, with a thin vertical rule separating the mark from the TERYX wordmark. Three variants exist — main (dark on light), secondary (stacked, for square contexts), and footer (reversed, white on dark).

## Browser Compatibility

Works in all modern browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome for Android

> `backdrop-filter` (glassmorphism) requires `-webkit-backdrop-filter` for Safari, which is included in the CSS.

## Known Limitations

- No backend — orders are not actually sent anywhere. The confirmation screen clears the cart and shows a success message.
- Product data is hardcoded in `script.js`. To add a new product, add an object to the `products` array and add the corresponding image to `images/`.
- localStorage is browser-specific — cart data does not sync across devices or browsers.

---

