const userToken = localStorage.getItem("authToken")

const decodedToken = parseJwt(userToken)
const userId = (decodedToken.UserID)

let cartItemsContainer = document.getElementById("products-container")
let products = [];


async function fetchProductsInCart() {

    try {
        const response = await fetch(`http://localhost:4503/cart/view/${userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const data = await response.json()
        return data.products
    } catch (error) {
        console.log(error);
    }
}
async function updateProductCards() {
    products = await fetchProductsInCart(); // Update the global 'products' array with fetched data
    console.log(products, "dskjjbdskbdk");
    generateProductCards(products);
}


function generateProductCards(products) {
    cartItemsContainer.innerHTML = ""
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const productImageContainer = document.createElement("div");
        productImageContainer.classList.add("product-image-container");

        const productImage = document.createElement("img");
        productImage.classList.add("product-image");
        productImage.src = product.productImage;
        productImage.alt = "Product Image";
        productImageContainer.appendChild(productImage);

        const productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        const productDescription = document.createElement("div");
        productDescription.classList.add("product-description");
        productDescription.textContent = product.productDescription;


        const productPrice = document.createElement("div");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price;
        productDetails.appendChild(productDescription)
        productDetails.appendChild(productPrice)

        const removeFromCart = document.createElement("button")
        removeFromCart.classList.add('remove-from-cart')
        
        removeFromCart.style.padding = "10px"
        removeFromCart.style.text = "Remove"
        productCard.appendChild(productImageContainer)
        productCard.appendChild(productDetails)
        productCard.appendChild(removeFromCart)
        cartItemsContainer.appendChild(productCard)
    });
}





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

fetchProductsInCart()
updateProductCards()