const alternateTextElement = document.getElementById("alternateText");
const alternateTexts = ["Welcome to Shoppie!", "Free delivery", "Genuine Products"];
const errorElement = document.getElementById('lottie-animation');
let cartItemCount = 0;
let currentAlternateTextIndex = 0;

const userToken = localStorage.getItem("authToken")


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

function generateProductCardsmem(productsToDisplay) {
    productContainer.innerHTML = "";

    productsToDisplay.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const productImage = document.createElement("img");
        productImage.src = product.productImage;

        const productName = document.createElement("h3");
        productName.textContent = product.productName;

        productName.classList.add('productName')

        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: ${product.price}`;

        const productDescription = document.createElement("p");
        productDescription.textContent = product.productDescription;
        productDescription.classList.add("product-description")
        const addToCartSection = document.createElement('div');
        addToCartSection.className = 'add-to-cart';

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.max = product.stock
        quantityInput.value = '1';

        const addButton = document.createElement('button');
        addButton.className = "add-button"
        addButton.textContent = 'Add to Cart';

        addButton.style.backgroundColor = "#007BFF"
        addButton.style.padding = "12px"
        addButton.style.borderRadius = "8px"
        addButton.style.color = "white"
        addToCartSection.appendChild(quantityInput);
        addToCartSection.appendChild(addButton);

        addButton.addEventListener('click', async () => {
            const quantity = parseInt(quantityInput.value);
        
        
            if (quantity > product.stock) {
                alert('Items cannot be more than the available stock.');
                return;
            }
        
            for (let i = 0; i < quantity; i++) {
                await addProductToCart(product.productId, 1);
                showToast("Added to Cart!")
            }
        });
        
        const productStock = document.createElement("p");
        productStock.style.marginTop = "15px"
        productStock.style.fontStyle = "italic";


        productStock.textContent = `Items left in stock: ${product.stock}`;

        card.appendChild(productImage);
        card.appendChild(productName);
        card.appendChild(productPrice);
        card.appendChild(productDescription);
        card.appendChild(productStock);
        card.appendChild(addToCartSection)
        productContainer.appendChild(card);
    });
}


async function addProductToCart(productID, orderNo) {


    const decodedToken = parseJwt(token)
    const userId = (decodedToken.UserID)
    console.log(userId);
    try {

        const response = await fetch(`http://localhost:4503/cart/${userId}`, {
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body:
            JSON.stringify({
                productId: productID,
                orderNo: orderNo
            })

        })

        console.log(response);
        if(response.ok){
            console.log("added to crt");
        }

    } catch (error) {
        console.log(error.message);
    }
}

async function fetchProductsmem() {
    try {
        const response = await fetch("http://localhost:4503/product/all");
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function updateProductCardsmem() {
    products = await fetchProductsmem(); // Update the global 'products' array with fetched data
    generateProductCardsmem(products);
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchTerm));

    generateProductCardsmem(filteredProducts);

    if (filteredProducts.length < 1) {
        document.getElementById('lottie-animation').style.display = 'block';
       
    } else {
        document.getElementById('lottie-animation').style.display = 'none';
    }
});

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join(''),
        );

        return JSON.parse(payload);
    } catch (error) {
        console.error('Error parsing JWT token:', error);
        return null;
    }
}

function viewProfile(){
    window.location.href = "/Frontend/edit-profile/edit-profile.html"
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.opacity = 1;

    
    setTimeout(() => {
        toast.style.opacity = 0;
    }, 2000);
}

updateProductCardsmem();