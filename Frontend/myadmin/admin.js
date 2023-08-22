const adminTopnavText = `
        <div class="alternating-menu">
            <p id="alternateText">Welcome to Shoppie</p>
        </div>
        <div class="search-container">
            <input type="text" id="search" placeholder="Search...">
            <button type="button" id="search-button">Search Products</button>
        </div>
        <div class="menus">
            <span class="material-symbols-outlined">add new product</span>
            <span class="material-symbols-outlined">log out</span>
        </div>
`
const adminTopnavStyling = `
    .top-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color: #007BFF;
    }
    .alternating-menu{
        width: 18.00%;
    }
    .alternating-menu p {
    margin-left: 40px;
    margin-top: 20px;
    font-size: 24px;
    color: white;
    font-weight: 900;
    }
    .menus {
    padding: 20px;
    }
    .menus span {
    margin-right: 20px;
    /* color: white; */
    }
    .menus :hover {
    cursor: pointer;
    }
    .material-symbols-outlined {
        color: black;
        background-color: white;
        padding: 10px;
        border-radius: 5px;
    }
    .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    }
    #search {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 300px;
    margin-left: 10px;
    }
    #search-button {
    padding: 10px 20px;
    background-color: white;
    border: none;
    border-radius: 5px;
    color: black;
    font-size: 16px;
    cursor: pointer;
    margin-left: 20px;
    }
    #search-button:hover, .material-symbols-outlined:hover {
    background-color: #0056b3;
    }
`

const customerTopnavText = `
    <div class="alternating-menu">
        <p id="alternateText">Welcome to Shoppie</p>
    </div>
    <div class="search-container">
        <input type="text" id="search" placeholder="Search...">
        <button type="button" id="search-button">Search Products</button>
    </div>
    <div class="menus">
        <span class="material-symbols-outlined">person</span>

        <span class="material-symbols-outlined">shopping_cart</span>
    </div>
`

const topnavstyles = document.querySelector('.top-navstyles')
const topnav = document.querySelector('.top-nav')


topnav.innerHTML = adminTopnavText
topnavstyles.innerHTML = adminTopnavStyling




const token = localStorage.getItem("authToken")



document.addEventListener("DOMContentLoaded", () => {
 
    if(!token){
        console.log("hamna token aadmin");
    }
})

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