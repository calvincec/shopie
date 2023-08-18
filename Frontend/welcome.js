const alternateTextElement = document.getElementById("alternateText");
const alternateTexts = ["Welcome to Shoppie!", "Free delivery", "Genuine Products"];
const errorElement = document.getElementById('no-products-found')
let currentAlternateTextIndex = 0;

function updateAlternateText() {
    alternateTextElement.textContent = alternateTexts[currentAlternateTextIndex];
    currentAlternateTextIndex = (currentAlternateTextIndex + 1) % alternateTexts.length;
}

updateAlternateText();
setInterval(updateAlternateText, 3000);
const products = [];
for (let i = 1; i <= 25; i++) {
    products.push({
        name: `Product ${i}`,
        price: `Ksh.${(Math.random() * 100000).toFixed(2)}`,
        image: "https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/96/097216/1.jpg?7904"
    });
}

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

function generateProductCards(productsToDisplay) {
    productContainer.innerHTML = "";

    productsToDisplay.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const productImage = document.createElement("img");
        productImage.src = product.image;

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: ${product.price}`;

        card.appendChild(productImage);
        card.appendChild(productName);
        card.appendChild(productPrice);

        productContainer.appendChild(card);
    });
}
// searchInput.addEventListener('input', () => {
//     const searchTerm = searchInput.value.toLowerCase();
//     const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));


//     generateProductCards(filteredProducts);

//     if (filteredProducts < 1) {
//             errorElement.innerHTML = "No product(s) found"
//     }
//     else {
//         errorElement.innerHTML = ""
//     }
// })

generateProductCards(products);