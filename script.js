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
  const themeToggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;
  const navLinks = document.querySelector('.nav-links');
  const burgerMenu = document.querySelector('.burger-menu');

  function toggleDarkMode() {
    body.classList.toggle("dark-mode");
    const isDarkModeEnabled = body.classList.contains("dark-mode");
    localStorage.setItem("darkModeEnabled", isDarkModeEnabled);

    if (isDarkModeEnabled) {
      themeIcon.src = "Images/moon-solid-24.png";
    } else {
      themeIcon.src = "Images/moon-regular-24.png";
    }
  }

   // Explicitly set the initial state
   navLinks.style.display = 'none';

  function toggleMenu() {
    navLinks.style.display = (navLinks.style.display === 'flex' || navLinks.style.display === '') ? 'none' : 'flex';
  }

  // Event listener for the burger menu button
  burgerMenu.addEventListener("click", function(event) {
    toggleMenu();
    event.stopPropagation(); // Prevent this click from being detected by the document click event below
  });

  // Event listener for clicks outside the burger menu
  document.addEventListener("click", function(event) {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    }
  });

  // Prevent the above event listener from firing when clicking on the nav links
  navLinks.addEventListener("click", function(event) {
    event.stopPropagation();
  });

  themeToggleButton.addEventListener("click", toggleDarkMode);

  function applyDarkModePreference() {
    const isDarkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";
    if (isDarkModeEnabled) {
      body.classList.add("dark-mode");
      themeIcon.src = "Images/moon-solid-24.png";
    } else {
      themeIcon.src = "Images/moon-regular-24.png";
    }
  }

  applyDarkModePreference();
});
