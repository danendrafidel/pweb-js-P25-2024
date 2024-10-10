// Bagian API Custom

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");

  // Function to fetch products from the API
  function fetchProducts() {
    fetch("https://dummyjson.com/c/2116-3ee1-4351-a72e")
      .then((response) => response.json())
      .then((data) => displayProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }

  // Function to display products in the HTML
  function displayProducts(products) {
    productList.innerHTML = ""; // Clear any existing products

    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
      productItem.setAttribute("data-category", product.category);

      productItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <a href="#" class="buy-btn">Buy Now</a>
        `;

      productList.appendChild(productItem);
    });
  }

  // Call the function to fetch and display products
  fetchProducts();
});

// Bagian Filter
document.addEventListener("DOMContentLoaded", function () {
  const categoryFilter = document.getElementById("category-filter");
  const itemsPerPageSelect = document.getElementById("items-per-page");
  const productList = document.getElementById("product-list");

  let itemsPerPage = parseInt(itemsPerPageSelect.value);
  let currentPage = 1;
  let products = []; // Store products here

  // Fetch products from API
  function fetchProducts() {
    fetch("https://dummyjson.com/c/2116-3ee1-4351-a72e")
      .then((response) => response.json())
      .then((data) => {
        products = data; // Save fetched products
        updateDisplay();
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  function updateDisplay() {
    productList.innerHTML = ""; // Clear existing products
    const selectedCategory = categoryFilter.value;

    // Filter products by category
    const filteredProducts = products.filter((product) => {
      return (
        selectedCategory === "all" || product.category === selectedCategory
      );
    });

    // Calculate the start and end index for pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Display the filtered and paginated products
    paginatedProducts.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
      productItem.setAttribute("data-category", product.category);

      productItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <a href="#" class="buy-btn">Buy Now</a>
        `;

      productList.appendChild(productItem);
    });

    // Handle visibility of the pagination buttons or message if no products
    if (filteredProducts.length === 0) {
      productList.innerHTML = "<p>No products found.</p>";
    }
  }

  // Event listeners for filter and items per page
  categoryFilter.addEventListener("change", () => {
    currentPage = 1; // Reset to first page
    updateDisplay();
  });

  itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1; // Reset to first page
    updateDisplay();
  });

  // Call the function to fetch and display products
  fetchProducts();
});

// Bagian Cart
document.addEventListener("DOMContentLoaded", function () {
  const categoryFilter = document.getElementById("category-filter");
  const itemsPerPageSelect = document.getElementById("items-per-page");
  const productList = document.getElementById("product-list");
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  let itemsPerPage = parseInt(itemsPerPageSelect.value);
  let currentPage = 1;
  let products = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Fetch products from API
  function fetchProducts() {
    fetch("https://dummyjson.com/c/2116-3ee1-4351-a72e")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        products = data; // Save fetched products
        updateDisplay();
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        productList.innerHTML =
          "<p>Error fetching products. Please try again later.</p>";
      });
  }

  function updateDisplay() {
    productList.innerHTML = ""; // Clear existing products
    const selectedCategory = categoryFilter.value;

    // Filter products by category
    const filteredProducts = products.filter((product) => {
      return (
        selectedCategory === "all" || product.category === selectedCategory
      );
    });

    // Calculate the start and end index for pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Display the filtered and paginated products
    paginatedProducts.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
      productItem.setAttribute("data-category", product.category);

      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="buy-now-btn add-to-cart-btn" data-id="${product.id}">Buy Now</button>
      `;

      productList.appendChild(productItem);
    });

    if (filteredProducts.length === 0) {
      productList.innerHTML = "<p>No products found.</p>";
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.getAttribute("data-id")); // Convert to number
        const product = products.find((p) => p.id === productId);
        addToCart(product);
      });
    });

    updateCart();
  }

  function addToCart(product) {
    const cartItemIndex = cart.findIndex((item) => item.id === product.id);
    if (cartItemIndex > -1) {
      cart[cartItemIndex].quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }

  function removeFromCart(productId) {
    productId = parseInt(productId); // Convert to number
    const cartItemIndex = cart.findIndex((item) => item.id === productId);
    if (cartItemIndex > -1) {
      cart.splice(cartItemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    }
  }

  function updateCart() {
    cartItemsContainer.innerHTML = ""; // Clear cart items
    let totalPrice = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
            <h4>${item.name} (x${item.quantity})</h4>
            <p>$${item.price * item.quantity}</p>
            <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            <button class="increase-quantity-btn" data-id="${
              item.id
            }">+</button>
            <button class="decrease-quantity-btn" data-id="${
              item.id
            }">-</button>
          `;
      cartItemsContainer.appendChild(cartItem);

      totalPrice += item.price * item.quantity;

      // Add event listeners for remove and quantity buttons
      cartItem
        .querySelector(".remove-item-btn")
        .addEventListener("click", (e) => {
          const productId = e.target.getAttribute("data-id");
          removeFromCart(productId);
        });

      cartItem
        .querySelector(".increase-quantity-btn")
        .addEventListener("click", (e) => {
          const productId = parseInt(e.target.getAttribute("data-id")); // Convert to number
          const cartItemIndex = cart.findIndex((item) => item.id === productId);
          if (cartItemIndex > -1) {
            cart[cartItemIndex].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
          }
        });

      cartItem
        .querySelector(".decrease-quantity-btn")
        .addEventListener("click", (e) => {
          const productId = parseInt(e.target.getAttribute("data-id")); // Convert to number
          const cartItemIndex = cart.findIndex((item) => item.id === productId);
          if (cartItemIndex > -1 && cart[cartItemIndex].quantity > 1) {
            cart[cartItemIndex].quantity--;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
          } else if (cartItemIndex > -1 && cart[cartItemIndex].quantity === 1) {
            removeFromCart(productId);
          }
        });
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Event listeners for filter and items per page
  categoryFilter.addEventListener("change", () => {
    currentPage = 1; // Reset to first page
    updateDisplay();
  });

  itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1; // Reset to first page
    updateDisplay();
  });

  // Checkout functionality
  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      alert(
        "Checkout successful! Total amount: " + totalPriceElement.textContent
      );
      cart = []; // Clear the cart after checkout
      localStorage.removeItem("cart"); // Remove from local storage
      updateCart(); // Update cart display
    } else {
      alert("Your cart is empty.");
    }
  });

  // Call the function to fetch and display products
  fetchProducts();
});

// bagian search product
// document.addEventListener("DOMContentLoaded", function () {
//   const searchInput = document.getElementById("search-input");
//   const productItems = document.querySelectorAll(".product-item");
//   const productList = document.getElementById("product-list");
//   const unavailableMessage = document.createElement("div");
//   unavailableMessage.innerText = "Product Unavailable";
//   unavailableMessage.style.display = "none"; // Sembunyikan pesan awal
//   productList.appendChild(unavailableMessage);

//   // Function to handle search
//   function handleSearch() {
//     const searchTerm = searchInput.value.toLowerCase().trim();
//     let foundProducts = 0;

//     productItems.forEach((item) => {
//       const itemName = item.querySelector("h3").innerText.toLowerCase();

//       // Check if the product matches the search term
//       if (itemName.includes(searchTerm)) {
//         item.style.display = "block"; // Tampilkan produk yang cocok
//         foundProducts++;
//       } else {
//         item.style.display = "none"; // Sembunyikan produk yang tidak cocok
//       }
//     });

//     // Tampilkan atau sembunyikan pesan 'Product Unavailable'
//     if (foundProducts === 0) {
//       unavailableMessage.style.display = "block"; // Tampilkan pesan jika tidak ada produk yang ditemukan
//     } else {
//       unavailableMessage.style.display = "none"; // Sembunyikan pesan jika ada produk yang ditemukan
//     }
//   }

//   // Event listener untuk menangani input pencarian
//   searchInput.addEventListener("input", handleSearch);
// });
