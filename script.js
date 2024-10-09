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
