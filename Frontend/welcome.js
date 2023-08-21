const alternateTextElement = document.getElementById("alternateText");
const alternateTexts = ["Welcome to Shoppie!", "Free delivery", "Genuine Products"];
const errorElement = document.getElementById('no-products-found');
let currentAlternateTextIndex = 0;

function updateAlternateText() {
    alternateTextElement.textContent = alternateTexts[currentAlternateTextIndex];
    currentAlternateTextIndex = (currentAlternateTextIndex + 1) % alternateTexts.length;
}

updateAlternateText();
setInterval(updateAlternateText, 3000);

let products = [];

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

function generateProductCards(productsToDisplay) {
    productContainer.innerHTML = "";

    productsToDisplay.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const productImage = document.createElement("img");
        productImage.src = product.productImage;

        const productName = document.createElement("h3");
        productName.textContent = product.productName;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: ${product.price}`;

        const productDescription = document.createElement("p");
        productDescription.textContent = product.productDescription;

        const productStock = document.createElement("p");
        productStock.textContent = `Stock: ${product.stock}`;

        card.appendChild(productImage);
        card.appendChild(productName);
        card.appendChild(productPrice);
        card.appendChild(productDescription);
        card.appendChild(productStock);

        productContainer.appendChild(card);
    });
}

async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:4503/product/all");
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function updateProductCards() {
    products = await fetchProducts(); // Update the global 'products' array with fetched data
    generateProductCards(products);
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchTerm));

    generateProductCards(filteredProducts);

    if (filteredProducts.length < 1) {
        errorElement.innerHTML = "No product(s) found";
    } else {
        errorElement.innerHTML = "";
    }
});

updateProductCards();
