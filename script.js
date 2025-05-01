const splash = document.getElementById("splash-screen");
const mainApp = document.getElementById("main-app");

setTimeout(() => {
  splash.style.display = "none";
  mainApp.classList.remove("hidden");
}, 3500);

// Sidebar
document.getElementById("toggleSidebar").onclick = () => {
  document.getElementById("sidebar").classList.add("active");
};
document.getElementById("closeSidebar").onclick = () => {
  document.getElementById("sidebar").classList.remove("active");
};

// Modals
function openModal(modalId) {
  document.getElementById("modalBackdrop").classList.add("active");
  document.getElementById(modalId).classList.add("active");
}
function closeModal() {
  document.querySelectorAll(".modal").forEach(modal => modal.classList.remove("active"));
  document.getElementById("modalBackdrop").classList.remove("active");
}

// Top actions
function openCart() {
  openModal("cartModal");
}
function openWishlist() {
  openModal("wishlistModal");
}
function openAccount() {
  openModal("accountModal");
}

function navigate(section) {
  if (section === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const el = document.querySelector(`.${section}`) || document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Product logic
const grid = document.getElementById("product-grid");
const topScroll = document.getElementById("top-selling");
const slide = document.getElementById("slideshow");
let allProducts = [];

function renderProducts(products) {
  grid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.thumbnail}" />
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <p>${p.description.slice(0, 50)}...</p>`;
    grid.appendChild(card);
  });
}

function filterByPrice(maxPrice) {
  const filtered = allProducts.filter(p => p.price <= maxPrice);
  renderProducts(filtered);
}

function filterByCategory(cat) {
  const filtered = allProducts.filter(p => p.category.includes(cat));
  renderProducts(filtered);
}

// Fetch products
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    renderProducts(allProducts);

    data.products.slice(6, 12).forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `<img src="${p.thumbnail}" /><h4>${p.title}</h4><p>$${p.price}</p>`;
      topScroll.appendChild(card);
    });

    data.products.slice(0, 6).forEach(p => {
      const card = document.createElement("div");
      card.className = "card-slide";
      card.innerHTML = `<img src="${p.thumbnail}" /><p>${p.title}</p>`;
      slide.appendChild(card);
    });
  });

// Price slider
const range = document.getElementById("priceRange");
const rangeVal = document.getElementById("priceValue");
range.addEventListener("input", (e) => {
  rangeVal.textContent = "$" + e.target.value;
  filterByPrice(parseInt(e.target.value));
});

