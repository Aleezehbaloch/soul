const products = [
  {
    id: "daydream-dress",
    name: "Daydream Midi Dress",
    category: "Easy does it",
    price: 5200,
    oldPrice: 6500,
    badge: "A little favourite",
    color: "Lavender",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    description: "The dress that makes getting ready feel like the fun part. A floaty silhouette, soft feel, and just-right details for coffee dates, sunny strolls, and everything in between."
  },
  {
    id: "cloud-nine-shirt",
    name: "Cloud Nine Shirt",
    category: "Soft layers",
    price: 3800,
    oldPrice: null,
    badge: "New in",
    color: "Sky blue",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85",
    description: "Meet your new throw-on-and-go best friend. This easy, airy shirt brings a little sunshine to your everyday rotation and layers beautifully over absolutely everything."
  },
  {
    id: "main-character-top",
    name: "Main Character Top",
    category: "The fun one",
    price: 2900,
    oldPrice: null,
    badge: "",
    color: "Blush pink",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85",
    description: "For days when the outfit is the plan. A flattering fit and a pop of feel-good colour make this top an instant mood-lifter, whether you dress it up or keep it casual."
  },
  {
    id: "weekend-wide-leg",
    name: "Weekend Wide-Leg Pants",
    category: "Off-duty energy",
    price: 4500,
    oldPrice: null,
    badge: "Best seller",
    color: "Lilac",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    description: "Comfy enough for your slow mornings, cute enough for all your plans. These easy wide-leg pants are the definition of doing the most while feeling like you're doing the least."
  }
];

const currency = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0
});

const shopWhatsAppNumber = "923183325984";

function formatPrice(price) {
  return currency.format(price).replace("PKR", "Rs.");
}

function productCard(product, index) {
  const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : "";
  const oldPrice = product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : "";
  return `
    <div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="${(index % 4) * 70}">
      <article class="product-card">
        <a class="product-image-wrap" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">${badge}
          <span class="quick-view">Meet your new fave <i class="bi bi-arrow-up-right"></i></span>
        </a>
        <div class="product-info">
          <div class="product-meta"><span>${product.category}</span><button class="wishlist-button" type="button" aria-label="Save ${product.name}" aria-pressed="false"><i class="bi bi-heart"></i></button></div>
          <a class="product-title" href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
          <div class="product-price">${formatPrice(product.price)} ${oldPrice}</div>
        </div>
      </article>
    </div>`;
}

function getCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("soul-cart") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Could not read the shopping bag from local storage.", error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("soul-cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = count;
  });
}

function addToCart(product, size, quantity) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id && item.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: product.id, size, quantity });
  }
  saveCart(cart);
}

function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const product = products.find((item) => item.id === id);
  if (!product) {
    container.innerHTML = `<div class="empty-state"><span class="empty-icon">✿</span><h2>We couldn't find that piece.</h2><p>It may have moved on to its next adventure.</p><a class="btn btn-soul" href="index.html#shop">Back to the collection</a></div>`;
    return;
  }

  document.title = `${product.name} — Soul`;
  document.getElementById("product-breadcrumb").textContent = product.name;
  const oldPrice = product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : "";
  container.innerHTML = `
    <div class="product-detail-image" data-aos="fade-right">
      <img src="${product.image}" alt="${product.name}">
      <span class="product-badge">${product.badge || "Made for your moments"}</span>
    </div>
    <div class="product-detail-copy" data-aos="fade-left">
      <span class="eyebrow">${product.category}</span>
      <h1>${product.name}</h1>
      <div class="detail-rating"><span aria-label="Rated 5 out of 5">★★★★★</span> <small>Made to be loved</small></div>
      <div class="detail-price">${formatPrice(product.price)} ${oldPrice}</div>
      <p class="detail-description">${product.description}</p>
      <div class="color-note"><span class="color-swatch"></span> Colour: <b>${product.color}</b></div>
      <fieldset class="size-picker">
        <legend>Choose your size <a href="#size-guide">Size guide</a></legend>
        <div class="size-options">${["XS", "S", "M", "L", "XL"].map((size, index) => `<label><input type="radio" name="size" value="${size}" ${index === 2 ? "checked" : ""}><span>${size}</span></label>`).join("")}</div>
      </fieldset>
      <div class="detail-actions">
        <div class="quantity-picker" aria-label="Quantity"><button type="button" data-quantity="-1" aria-label="Decrease quantity">−</button><output id="quantity-value">1</output><button type="button" data-quantity="1" aria-label="Increase quantity">+</button></div>
        <button class="btn btn-soul add-to-cart" type="button"><i class="bi bi-bag-plus"></i> Add to bag</button>
      </div>
      <p class="add-message" aria-live="polite"></p>
      <div class="product-perks"><span><i class="bi bi-box-seam"></i> Carefully packed with love</span><span><i class="bi bi-arrow-repeat"></i> Easy 7-day returns</span><span><i class="bi bi-truck"></i> Free delivery over Rs. 5,000</span></div>
      <details class="product-description-detail" id="size-guide"><summary>Size guide & care <i class="bi bi-plus"></i></summary><p>Our pieces are designed for a relaxed, comfortable fit. If you prefer a closer fit, consider sizing down. ${product.description} Please follow the care instructions on the garment label.</p></details>
    </div>`;

  let quantity = 1;
  container.querySelectorAll("[data-quantity]").forEach((button) => {
    button.addEventListener("click", () => {
      quantity = Math.max(1, quantity + Number(button.dataset.quantity));
      container.querySelector("#quantity-value").textContent = quantity;
    });
  });
  container.querySelector(".add-to-cart").addEventListener("click", () => {
    const size = container.querySelector('input[name="size"]:checked').value;
    addToCart(product, size, quantity);
    const message = container.querySelector(".add-message");
    message.textContent = `${product.name}, size ${size}, added to your bag ♡`;
    message.classList.add("is-visible");
  });

  const related = document.getElementById("related-products");
  if (related) {
    related.innerHTML = products.filter((item) => item.id !== product.id).slice(0, 3).map(productCard).join("");
  }
}

function renderCart() {
  const container = document.getElementById("cart-content");
  if (!container) return;

  const cart = getCart();
  const entries = cart.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.id)
  })).filter((item) => item.product);

  if (!entries.length) {
    container.innerHTML = `<div class="empty-state"><span class="empty-icon">♡</span><h2>Your bag is taking a little breather.</h2><p>Let's find something that feels like you.</p><a class="btn btn-soul" href="index.html#shop">Explore the collection <i class="bi bi-arrow-up-right"></i></a></div>`;
    return;
  }

  const subtotal = entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${entries.map((item) => `
        <article class="cart-item">
          <a href="product.html?id=${encodeURIComponent(item.product.id)}" class="cart-item-image"><img src="${item.product.image}" alt="${item.product.name}"></a>
          <div class="cart-item-info"><span class="eyebrow">${item.product.category}</span><a class="cart-item-name" href="product.html?id=${encodeURIComponent(item.product.id)}">${item.product.name}</a><span>Size: ${item.size}</span><div class="cart-item-controls"><button type="button" data-cart-change="-1" data-id="${item.id}" data-size="${item.size}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-cart-change="1" data-id="${item.id}" data-size="${item.size}" aria-label="Increase quantity">+</button><button type="button" class="remove-item" data-remove="${item.id}" data-size="${item.size}">Remove</button></div></div>
          <strong class="cart-item-price">${formatPrice(item.product.price * item.quantity)}</strong>
        </article>`).join("")}</div>
      <aside class="cart-summary"><h2>Your little total</h2><div><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div><div><span>Delivery</span><span>${subtotal >= 5000 ? "On us ♡" : "Confirmed on WhatsApp"}</span></div><p>We'll confirm delivery and payment details with you on WhatsApp.</p><a class="btn btn-soul checkout-button" href="checkout.html">Continue to checkout <i class="bi bi-arrow-right"></i></a><a class="continue-shopping" href="index.html#shop"><i class="bi bi-arrow-left"></i> Keep looking</a></aside>
    </div>`;

  container.querySelectorAll("[data-cart-change]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = getCart();
      const item = next.find((entry) => entry.id === button.dataset.id && entry.size === button.dataset.size);
      if (!item) return;
      item.quantity += Number(button.dataset.cartChange);
      saveCart(next.filter((entry) => entry.quantity > 0));
      renderCart();
    });
  });
  container.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      saveCart(getCart().filter((item) => !(item.id === button.dataset.remove && item.size === button.dataset.size)));
      renderCart();
    });
  });
}

function renderCheckout() {
  const container = document.getElementById("checkout-content");
  if (!container) return;

  const entries = getCart().map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.id)
  })).filter((item) => item.product);

  if (!entries.length) {
    container.innerHTML = `<div class="empty-state"><span class="empty-icon">♡</span><h2>Your bag is taking a little breather.</h2><p>Add something you love before checking out.</p><a class="btn btn-soul" href="index.html#shop">Explore the collection <i class="bi bi-arrow-up-right"></i></a></div>`;
    return;
  }

  const subtotal = entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  container.innerHTML = `
    <div class="checkout-layout">
      <form class="checkout-form" id="checkout-form">
        <h2>Where should we send your order?</h2>
        <label for="checkout-name">Full name</label>
        <input id="checkout-name" name="name" type="text" autocomplete="name" placeholder="Your full name" required>
        <label for="checkout-phone">WhatsApp / phone number</label>
        <input id="checkout-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" pattern="(?:\\+92|0)?3[0-9]{9}" placeholder="03XXXXXXXXX" title="Enter a Pakistani mobile number, e.g. 03123456789" required>
        <label for="checkout-address">Complete delivery address</label>
        <textarea id="checkout-address" name="address" autocomplete="street-address" rows="3" placeholder="House, street, area, and any helpful directions" required></textarea>
        <label for="checkout-city">City</label>
        <input id="checkout-city" name="city" type="text" autocomplete="address-level2" placeholder="Your city" required>
        <label for="checkout-notes">Order notes <span>(optional)</span></label>
        <textarea id="checkout-notes" name="notes" rows="2" placeholder="Anything else we should know?"></textarea>
        <button class="btn btn-soul whatsapp-checkout" type="submit"><i class="bi bi-whatsapp"></i> Send order on WhatsApp</button>
        <p class="checkout-disclaimer">Your WhatsApp app will open with your order details ready. Review the message and tap Send to place your order. We'll confirm delivery and payment with you there.</p>
        <a class="continue-shopping" href="cart.html"><i class="bi bi-arrow-left"></i> Back to your bag</a>
      </form>
      <aside class="checkout-order">
        <h2>Your order</h2>
        <div class="checkout-order-items">${entries.map((item) => `
          <div class="checkout-order-item">
            <img src="${item.product.image}" alt="">
            <div><strong>${item.product.name}</strong><span>Size: ${item.size} · Qty: ${item.quantity}</span></div>
            <b>${formatPrice(item.product.price * item.quantity)}</b>
          </div>`).join("")}</div>
        <div class="checkout-total"><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div>
        <div class="checkout-total"><span>Delivery</span><span>${subtotal >= 5000 ? "On us ♡" : "Confirmed on WhatsApp"}</span></div>
        <p>Final delivery and payment details will be confirmed with you on WhatsApp.</p>
      </aside>
    </div>`;

  container.querySelector("#checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const message = [
      "Hi Soul! I'd like to place this order:",
      "",
      ...entries.map((item) => `• ${item.product.name} — Size ${item.size} × ${item.quantity}: ${formatPrice(item.product.price * item.quantity)}`),
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      `Delivery: ${subtotal >= 5000 ? "Free" : "Please confirm"}`,
      "",
      "Delivery details:",
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      `Address: ${formData.get("address")}`,
      `City: ${formData.get("city")}`,
      formData.get("notes") ? `Order notes: ${formData.get("notes")}` : "",
      "",
      "Please confirm my order, delivery charges, and payment options. Thank you!"
    ].filter(Boolean).join("\n");

    window.location.href = `https://wa.me/${shopWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  });
}

function setupHomePage() {
  const featured = document.getElementById("featured-products");
  if (featured) featured.innerHTML = products.map(productCard).join("");
}

function setupNewsletter() {
  const newsletter = document.getElementById("newsletter-form");
  if (newsletter) {
    newsletter.addEventListener("submit", (event) => {
      event.preventDefault();
      newsletter.querySelector(".newsletter-message").textContent = "You're on the list — see you in your inbox ♡";
      newsletter.reset();
    });
  }
}

function setupWishlistButtons() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".wishlist-button");
    if (!button) return;
    const active = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(active));
    button.innerHTML = `<i class="bi ${active ? "bi-heart-fill" : "bi-heart"}"></i>`;
    button.classList.remove("is-animating");
    requestAnimationFrame(() => button.classList.add("is-animating"));
  });
}

function setupLiveInteractions() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);

  const backToTop = document.createElement("button");
  backToTop.className = "scroll-top-button";
  backToTop.type = "button";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.append(backToTop);
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  let scrollUpdateScheduled = false;
  const updateScrollState = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressRatio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    progress.style.transform = `scaleX(${progressRatio})`;
    document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 12);
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
    scrollUpdateScheduled = false;
  };

  window.addEventListener("scroll", () => {
    if (scrollUpdateScheduled) return;
    scrollUpdateScheduled = true;
    window.requestAnimationFrame(updateScrollState);
  }, { passive: true });
  updateScrollState();

  const heroArt = document.querySelector(".hero-art");
  const supportsPointerParallax = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (heroArt && supportsPointerParallax && !reducedMotion) {
    heroArt.addEventListener("pointermove", (event) => {
      const bounds = heroArt.getBoundingClientRect();
      const pointerX = (((event.clientX - bounds.left) / bounds.width - 0.5) * 8).toFixed(2) + "px";
      const pointerY = (((event.clientY - bounds.top) / bounds.height - 0.5) * 8).toFixed(2) + "px";
      heroArt.style.setProperty("--pointer-x", pointerX);
      heroArt.style.setProperty("--pointer-y", pointerY);
    });
    heroArt.addEventListener("pointerleave", () => {
      heroArt.style.setProperty("--pointer-x", "0px");
      heroArt.style.setProperty("--pointer-y", "0px");
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  setupHomePage();
  renderProductDetail();
  renderCart();
  renderCheckout();
  setupWishlistButtons();
  setupLiveInteractions();
  updateCartCount();
  setupNewsletter();
  if (window.AOS) AOS.init({ duration: 650, once: true, offset: 55 });
});
