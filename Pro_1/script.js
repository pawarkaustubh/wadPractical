const products = [
  {
    image: "assets/wireless_headphones.jpg",
    name: "Wireless Headphones",
    price: "₹7,999",
    description: "Noise-cancelling overear headphones.",
  },
  {
    image: "assets/smartwatch.jpg",
    name: "Smartwatch",
    price: "₹12,999",
    description: "Fitness tracking smartwatch.",
  },
  {
    image: "assets/gaming_mouse.jpg",
    name: "Gaming Mouse",
    price: "₹2,499",
    description: "Ergonomic gaming mouse.",
  },
  {
    image: "assets/laptop_stand.jpg",
    name: "Laptop Stand",
    price: "₹1,999",
    description: "Adjustable aluminium stand.",
  },
  // Add 10 more dummy products to test pagination
  ...Array.from({ length: 10 }, (_, i) => ({
    image: "https://via.placeholder.com/80",
    name: `Product ${i + 5}`,
    price: `₹${(i + 5) * 1000}`,
    description: `Description for product ${i + 5}.`,
  })),
];

const rowsPerPage = 10;
let currentPage = 1;

function displayProducts() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedItems = products.slice(start, end);

  for (const product of paginatedItems) {
    const row = `
        <tr>
          <td><img src="${product.image}" alt="Product"></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.description}</td>
        </tr>
      `;
    tableBody.insertAdjacentHTML("beforeend", row);
  }

  const pageInfo = document.getElementById("pageInfo");
  const totalPages = Math.ceil(products.length / rowsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function nextPage() {
  const totalPages = Math.ceil(products.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
}

// Initial display
displayProducts();
