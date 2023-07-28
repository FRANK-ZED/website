document.addEventListener("DOMContentLoaded", function () {
  // Get references to the elements
  const categoryButton = document.querySelector('.categories-button');
  const dropdownContent = document.querySelector('.dropdown-content');
  const products = document.querySelectorAll('.product');

  // Function to toggle the dropdown content
  function toggleDropdown() {
    dropdownContent.classList.toggle('show');
  }

  // Add event listener to the category button
  categoryButton.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the event from bubbling to the window
    toggleDropdown();
  });

  // Function to close the dropdown when clicking outside
  function closeDropdown() {
    dropdownContent.classList.remove('show');
  }

  // Close the dropdown when user clicks outside
  window.addEventListener('click', function (event) {
    if (!event.target.matches('.categories-button')) {
      closeDropdown();
    }
  });

  // Add event listener for category links
  const categoryLinks = document.querySelectorAll('.dropdown-content a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevents the event from bubbling to the window
      const selectedCategory = link.getAttribute('data-category');

      // Remove active class from all category links and add it to the clicked link
      categoryLinks.forEach(categoryLink => {
        categoryLink.classList.remove('active');
      });
      link.classList.add('active');

      // Filter products based on the selected category
      products.forEach(product => {
        if (selectedCategory === 'all' || product.classList.contains(selectedCategory)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });

      // Close the dropdown after selection
      closeDropdown();
    });
  });

  // JavaScript code for search input functionality
  const searchInput = document.getElementById('searchInput');

  function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Loop through each product and check if it matches the search term
    products.forEach(product => {
      const productName = product.querySelector("h2").textContent.toLowerCase();
      if (productName.includes(searchTerm)) {
        product.style.display = "block"; // Show the product
      } else {
        product.style.display = "none"; // Hide the product
      }
    });
  }

  // Add event listener for the search input
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', handleSearch);
  searchInput.addEventListener("keyup", handleSearch);

  // Add event listener to each product box to open the link in a new tab
  products.forEach(product => {
    product.addEventListener("click", function(event) {
      const productLink = product.querySelector("a");
      const productUrl = productLink.getAttribute("href");
      window.open(productUrl, "_blank");
    });
  });
});