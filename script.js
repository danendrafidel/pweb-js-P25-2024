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

//Bagian Cart

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
