// script.js - Interactivity for e-commerce product page

document.addEventListener('DOMContentLoaded', function () {
  // Product image switching
  const mainImg = document.getElementById('main-img');
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const lightbox = document.getElementById('lightbox');
  const lightboxMainImg = document.getElementById('lightbox-main-img');
  const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
  const lightboxClose = document.getElementById('lightbox-close');


  let currentImg = 1;
  const totalImgs = 4;

  function setMainImg(num) {
    currentImg = num;
    mainImg.src = `./images/image-product-${num}.jpg`;
    mainImg.alt = `Product image ${num}`;
    thumbnails.forEach(t => t.classList.remove('selected'));
    if (thumbnails[num - 1]) thumbnails[num - 1].classList.add('selected');
  }

  thumbnails.forEach((thumb, idx) => {
    thumb.addEventListener('click', function () {
      setMainImg(idx + 1);
    });
  });

  // Mobile prev/next buttons
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  if (galleryPrev && galleryNext) {
    galleryPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      let next = currentImg - 1;
      if (next < 1) next = totalImgs;
      setMainImg(next);
    });
    galleryNext.addEventListener('click', function (e) {
      e.stopPropagation();
      let next = currentImg + 1;
      if (next > totalImgs) next = 1;
      setMainImg(next);
    });
  }

  // Lightbox open
  mainImg.addEventListener('click', function () {
    // Only open lightbox on desktop
    if (window.innerWidth > 900) {
      lightbox.classList.add('active');
      // Sync lightbox image and selected thumb
      const selected = document.querySelector('.product-thumbnail.selected').getAttribute('data-img');
      lightboxMainImg.src = `./images/image-product-${selected}.jpg`;
      lightboxMainImg.alt = `Product large ${selected}`;
      lightboxThumbnails.forEach(t => t.classList.remove('selected'));
      lightboxThumbnails[selected - 1].classList.add('selected');
    }
  });

  // Lightbox close
  lightboxClose.addEventListener('click', function () {
    lightbox.classList.remove('active');
  });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  // Lightbox thumbnail switching
  lightboxThumbnails.forEach(thumb => {
    thumb.addEventListener('click', function () {
      lightboxThumbnails.forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
      const imgNum = this.getAttribute('data-img');
      lightboxMainImg.src = `./images/image-product-${imgNum}.jpg`;
      lightboxMainImg.alt = `Product large ${imgNum}`;
    });
  });

  // Quantity selector
  let quantity = 0;
  const quantityValue = document.getElementById('quantity');
  document.getElementById('increase-qty').addEventListener('click', function () {
    quantity = Math.min(quantity + 1, 99);
    quantityValue.textContent = quantity;
  });
  document.getElementById('decrease-qty').addEventListener('click', function () {
    quantity = Math.max(quantity - 1, 0);
    quantityValue.textContent = quantity;
  });

  // Cart functionality
  const addToCartBtn = document.getElementById('add-to-cart');
  const cartBtn = document.getElementById('cart-btn');
  const cartDropdown = document.getElementById('cart-dropdown');
  const cartContent = document.getElementById('cart-content');
  const cartCount = document.getElementById('cart-count');
  let cart = null;

  addToCartBtn.addEventListener('click', function () {
    if (quantity > 0) {
      cart = {
        name: 'Fall Limited Edition Sneakers',
        price: 125,
        qty: quantity,
        img: './images/image-product-1-thumbnail.jpg',
      };
      updateCart();
      cartCount.textContent = quantity;
      cartCount.classList.remove('sr-only');
    }
  });

  cartBtn.addEventListener('click', function () {
    cartDropdown.classList.toggle('active');
  });

  function updateCart() {
    if (!cart || cart.qty === 0) {
      cartContent.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
      cartCount.classList.add('sr-only');
      return;
    }
    cartContent.innerHTML = `
      <div class="cart-item">
        <img src="${cart.img}" alt="Product thumbnail" class="cart-item-img">
        <div class="cart-item-details">
          ${cart.name}<br>
          $${cart.price.toFixed(2)} x ${cart.qty} <span class="cart-item-price">$${(cart.price * cart.qty).toFixed(2)}</span>
        </div>
        <button class="cart-delete-btn" aria-label="Remove from cart"><img src="./images/icon-delete.svg" alt="Delete"></button>
      </div>
      <button class="checkout-btn">Checkout</button>
    `;
    cartContent.querySelector('.cart-delete-btn').addEventListener('click', function () {
      cart = null;
      updateCart();
    });
  }

  // Close cart dropdown on outside click
  document.addEventListener('click', function (e) {
    if (!cartDropdown.contains(e.target) && !cartBtn.contains(e.target)) {
      cartDropdown.classList.remove('active');
    }
  });

  // Mobile nav functionality
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  hamburger.addEventListener('click', function () {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  mobileNavClose.addEventListener('click', closeMobileNav);
  mobileNavOverlay.addEventListener('click', closeMobileNav);

  function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});
