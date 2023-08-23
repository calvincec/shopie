const userToken = localStorage.getItem("authToken")

const decodedToken = parseJwt(userToken)
const userId = (decodedToken.UserID)

let cartItemsContainer = document.getElementById("products-container")
let products = [];

let greetingsElement = document.getElementById('helloMessage')

let totalItemsElement = document.getElementById('total-items')
let totalCostsElement = document.getElementById('total-price')


let checkOutSection = document.getElementById('cart-section')
greetingsElement.innerText = decodedToken.UserName
async function fetchProductsInCart() {

    try {
        const response = await fetch(`http://localhost:4503/cart/view/${userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const data = await response.json()


        if(data.message){
            document.querySelector(".empty-cart").style.display = "block";
            cartItemsContainer.style.display = "none"
            checkOutSection.style.display = "none"
        } 
        if(!data.message){
            document.querySelector(".empty-cart").style.display = "none";
            cartItemsContainer.style.display = "flex"
            checkOutSection.style.display = "block"
        }
        console.log(data);


        totalCostsElement.innerText = `${data.totalPrice}`  
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

        const productTitle = document.createElement('div')
        productTitle.classList.add('product-title')
        productTitle.innerHTML = `<b>Title</b> ${product.productName}`

        const productDescription = document.createElement("div");
        productDescription.classList.add("product-description");
        productDescription.innerHTML = `<b>Description:</b>  ${product.productDescription}`;

        productDescription.appendChild(productTitle)

        const productPrice = document.createElement("div");
        productPrice.classList.add("product-price");
        productPrice.innerHTML =  `<b>Price: </b> ${product.price}`
        //product.price;
        
        productDetails.appendChild(productDescription)
        productDetails.appendChild(productPrice)

        const removeFromCart = document.createElement("button")
        removeFromCart.classList.add('remove-from-cart')
        
        removeFromCart.style.padding = "10px"
        removeFromCart.textContent = "Remove From cart"

        removeFromCart.addEventListener('click', async () => {
            let productID = product.cartId;
        
            try {
                const result = await removeItemFromCart(productID);
                if (result.ok) {
                    console.log(`item ${productID} deleted`);
                    updateProductCards(); // Update UI after successful removal
                    const notificationElement = document.getElementById("notification");
                    notificationElement.style.display = "block";
                    setTimeout(() => {
                        notificationElement.style.display = "none";
                    }, 4000); // Hide after 4 seconds
                }
            } catch (error) {
                console.log(error);
            }
        });
       
        productCard.appendChild(productImageContainer)
     //   productCard.appendChild(productTitle)
        productCard.appendChild(productDetails)
        productCard.appendChild(removeFromCart)
        cartItemsContainer.appendChild(productCard)
    });
}



async function removeItemFromCart(productID) {
    try {
        const result = await fetch(`http://localhost:4503/cart/${productID}`, {
            method: "DELETE"
        });

        return result; // Return the result for checking success in the event listener
    } catch (error) {
        console.log(error);
    }
}

function viewProfile(){
    window.location.href = "/Frontend/edit-profile/edit-profile.html"
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
function logout(){

    localStorage.clear()
    window.location.href = "/Frontend/welcome.html"
}
fetchProductsInCart()
updateProductCards()