document.addEventListener("DOMContentLoaded", function () {
    // Get references to the elements
    const categoryButton = document.querySelector('.categories-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const productItems = document.querySelectorAll('.product');
    const searchInput = document.getElementById('searchInput');
    const categoryLinks = document.querySelectorAll('.dropdown-content a');
    const noMatchText = document.getElementById('noMatchText');
  
    // Function to toggle the dropdown content
    function toggleDropdown() {
      dropdownContent.classList.toggle('show');
    }
  
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
  
    // Add event listener to the category button
    categoryButton.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevents the event from bubbling to the window
      toggleDropdown();
    });
  
    // Add event listener for category links
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
        filterProducts();
  
        // Close the dropdown after selection
        closeDropdown();
      });
    });
  
    // Function to filter products based on the selected category and search term
    function filterProducts() {
      const selectedCategory = document.querySelector('.dropdown-content a.active').getAttribute('data-category');
      const searchTerm = searchInput.value.trim().toLowerCase();
  
      let foundMatch = false;
  
      // Loop through each product and check if it matches the selected category and search term
      productItems.forEach(product => {
        const productName = product.querySelector("h2").textContent.toLowerCase();
        const productCategory = product.classList.contains(selectedCategory) || selectedCategory === 'all';
        const productMatchesSearchTerm = productName.includes(searchTerm);
  
        if (productCategory && productMatchesSearchTerm) {
          product.style.display = "block"; // Show the product
          foundMatch = true;
        } else {
          product.style.display = "none"; // Hide the product
        }
      });
  
      // Display "Sorry, we couldn't find a match." text if no products matched
      noMatchText.style.display = foundMatch ? 'none' : 'block';
    }
  
    // Function to handle search input functionality
    function handleSearch() {
      filterProducts();
    }
  
    // Add event listener for search input
    searchInput.addEventListener('input', handleSearch);
  
    // Trigger click event on the "All" category link to set it as default
    window.onload = function () {
      const allCategoryLink = document.querySelector('.dropdown-content a[data-category="all"]');
      allCategoryLink.click();
    };
  

});
document.addEventListener("DOMContentLoaded", function () {
    const darkModeButton = document.getElementById("darkModeButton");
    const body = document.body;
  
    function toggleDarkMode() {
      body.classList.toggle("dark-mode");
      // Check if dark mode is enabled and store the preference in local storage
      const isDarkModeEnabled = body.classList.contains("dark-mode");
      localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
    }
  
    darkModeButton.addEventListener("click", toggleDarkMode);
  
    // Function to check the user's dark mode preference and apply dark mode if needed
    function applyDarkModePreference() {
      const isDarkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";
      if (isDarkModeEnabled) {
        body.classList.add("dark-mode");
      }
    }
  
    // Apply the dark mode preference on page load
    applyDarkModePreference();
  });