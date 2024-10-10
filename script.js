// Bagian Filter
// JavaScript to handle filtering and items per page
document.addEventListener("DOMContentLoaded", function () {
  const categoryFilter = document.getElementById("category-filter");
  const itemsPerPageSelect = document.getElementById("items-per-page");
  const productItems = document.querySelectorAll(".product-item");

  let itemsPerPage = parseInt(itemsPerPageSelect.value);
  let currentPage = 1;

  function updateDisplay() {
    const selectedCategory = categoryFilter.value;
    let displayedItems = 0;

    productItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      // Check if the item should be displayed based on the selected category
      if (selectedCategory === "all" || selectedCategory === itemCategory) {
        if (displayedItems < itemsPerPage) {
          item.style.display = "block";
          displayedItems++;
        } else {
          item.style.display = "none";
        }
      } else {
        item.style.display = "none";
      }
    });
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

  // Initial display update
  updateDisplay();
});

// //Bagian Cart Update
// // JavaScript for Cart Functionality
// document.addEventListener("DOMContentLoaded", function () {
//   const cartItemsContainer = document.querySelector(".cart-items");
//   const totalPriceElement = document.getElementById("total-price");
//   const productItems = document.querySelectorAll(".product-item");
//   const cart = {};

//   // Function to update cart total
//   function updateCartTotal() {
//     let total = 0;
//     for (const id in cart) {
//       total += cart[id].price * cart[id].quantity;
//     }
//     totalPriceElement.innerText = `$${total.toFixed(2)}`;
//   }

//   // Function to render cart items
//   function renderCartItems() {
//     cartItemsContainer.innerHTML = ""; // Clear existing items
//     for (const id in cart) {
//       const item = cart[id];
//       const cartItem = document.createElement("div");
//       cartItem.classList.add("cart-item");
//       cartItem.innerHTML = `
//           <h4>${item.name} ($${item.price})</h4>
//           <div>
//             <button class="decrease-btn" data-id="${id}">-</button>
//             <span>${item.quantity}</span>
//             <button class="increase-btn" data-id="${id}">+</button>
//             <button class="remove-btn" data-id="${id}">Remove</button>
//           </div>
//         `;
//       cartItemsContainer.appendChild(cartItem);
//     }
//     updateCartTotal();
//   }

//   // Function to add item to cart
//   function addToCart(id, name, price) {
//     if (!cart[id]) {
//       cart[id] = { name, price, quantity: 1 };
//     } else {
//       cart[id].quantity += 1;
//     }
//     renderCartItems();
//   }

//   // Event delegation for cart item buttons
//   cartItemsContainer.addEventListener("click", (event) => {
//     const target = event.target;
//     const itemId = target.getAttribute("data-id");

//     if (target.classList.contains("remove-btn")) {
//       delete cart[itemId]; // Remove item from cart
//       renderCartItems();
//     } else if (target.classList.contains("increase-btn")) {
//       if (cart[itemId]) {
//         cart[itemId].quantity += 1;
//         renderCartItems();
//       }
//     } else if (target.classList.contains("decrease-btn")) {
//       if (cart[itemId]) {
//         if (cart[itemId].quantity > 1) {
//           cart[itemId].quantity -= 1;
//         } else {
//           delete cart[itemId]; // Remove item if quantity is 1
//         }
//         renderCartItems();
//       }
//     }
//   });
// });

// // bagian search product
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

//API
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data; // Ensure data is returned
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const populateProducts = async () => {
  const products = await fetchData("https://dummyjson.com/products");
  const productList = document.getElementById("product-list");

  // Check if products exist
  if (products && products.products) {
    products.products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";
      productItem.setAttribute("data-category", product.category);

      productItem.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p><strong>Rating:</strong> ${product.rating}</p>
                <p><strong>Stock:</strong> ${product.stock} units</p>
                <a href="#" class="buy-btn">Buy Now</a>
            `;

      productList.appendChild(productItem);
    });
  }
};

// Call the function to fetch and populate products
populateProducts();

// Event listener for 'Buy Now' buttons
productItems.forEach((item) => {
  const buyButton = item.querySelector(".buy-btn");
  const itemId = item.querySelector("h3").innerText; // Use the product name as ID
  const itemName = item.querySelector("h3").innerText;
  const itemPrice = parseFloat(
    item.querySelector("p").innerText.replace("$", "")
  );

  buyButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    addToCart(itemId, itemName, itemPrice);
  });
});
