document.addEventListener("DOMContentLoaded", function () {
  // Get references to the elements
  const categoryButton = document.querySelector('.categories-button');
  const dropdownContent = document.querySelector('.dropdown-content');
  const filterButton = document.querySelector('.filter-button');
  const filterContent = document.querySelector('.filter-content');
  const productItems = document.querySelectorAll('.product');
  const searchInput = document.getElementById('searchInput');
  const sortButtons = document.querySelectorAll('.sort-button');
  const categoryLinks = document.querySelectorAll('.dropdown-content a');

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
      filterProducts(selectedCategory);

      // Close the dropdown after selection
      closeDropdown();
    });
  });

  // Function to filter products based on the selected category
  function filterProducts(category) {
    productItems.forEach(product => {
      if (category === 'all' || product.classList.contains(category)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  // JavaScript code for search input functionality
  function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Loop through each product and check if it matches the search term
    productItems.forEach(product => {
      const productName = product.querySelector("h2").textContent.toLowerCase();
      if (productName.includes(searchTerm)) {
        product.style.display = "block"; // Show the product
      } else {
        product.style.display = "none"; // Hide the product
      }
    });
  }

  // Add event listener for search input
  searchInput.addEventListener('input', handleSearch);

  // Function to toggle the filter dropdown content
  function toggleFilter() {
    filterContent.classList.toggle('show-filter');
  }

  // Function to close the filter dropdown when clicking outside
  function closeFilter() {
    filterContent.classList.remove('show-filter');
  }

  // Close the filter dropdown when user clicks outside
  window.addEventListener('click', function (event) {
    if (!event.target.matches('.filter-button')) {
      closeFilter();
    }
  });

  // Add event listener to the filter button
  filterButton.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the event from bubbling to the window
    toggleFilter();
  });

  // Add event listener for filter links
  const filterLinks = document.querySelectorAll('.filter-content a');
  filterLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevents the event from bubbling to the window
      const selectedSort = link.getAttribute('data-sort');

      // Sort products based on the selected option
      sortProducts(selectedSort);

      // Close the filter dropdown after selection
      closeFilter();
    });
  });

  // Function to sort products based on the selected option
  function sortProducts(sortOption) {
    // Convert the product NodeList to an array for sorting
    const productArray = Array.from(productItems);

    productArray.sort((a, b) => {
      if (sortOption === 'alphabetical') {
        const nameA = a.querySelector("h2").textContent.toLowerCase();
        const nameB = b.querySelector("h2").textContent.toLowerCase();
        return nameA.localeCompare(nameB);
      } else if (sortOption === 'low-to-high') {
        const priceA = parseFloat(a.querySelector("h3").textContent.split("$")[1]);
        const priceB = parseFloat(b.querySelector("h3").textContent.split("$")[1]);
        return priceA - priceB;
      } else if (sortOption === 'high-to-low') {
        const priceA = parseFloat(a.querySelector("h3").textContent.split("$")[1]);
        const priceB = parseFloat(b.querySelector("h3").textContent.split("$")[1]);
        return priceB - priceA;
      }
    });

    // Remove all products from the current container
    const productSection = document.querySelector('.product-section');
    productSection.innerHTML = '';

    // Add the sorted products back to the container
    productArray.forEach(product => {
      productSection.appendChild(product);
    });
  }

  // Function to reset the filters and show all products
  function resetFilters() {
    categoryLinks.forEach(categoryLink => {
      categoryLink.classList.remove('active');
    });

    // Show all products
    productItems.forEach(product => {
      product.style.display = 'block';
    });
  }

  // Reset filters when the page loads
  resetFilters();
});
