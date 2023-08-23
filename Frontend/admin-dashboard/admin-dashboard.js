let productsadm = []

const productContaineradm = document.querySelector("#productContaineradm");
const searchInputadm = document.getElementById("searchadm");
const searchButtonadm = document.getElementById("search-button");
const info = document.querySelector('.info')
const addproduct = document.querySelector('.addproduct')
const eddtoproducts = document.querySelector('#add-products')
const cancelbtn = document.querySelector('.cancelbtn')
const addproductfm = document.querySelector('.addproductfm')
const addnew = document.querySelector('.addnew')




addproduct.style.display = 'none'




function generateProductCards(productsToDisplay) {
    productContaineradm.innerHTML = "";
    if (productsToDisplay.length==0){
        productContaineradm.innerHTML = "No products available"
        return
    }
    productsToDisplay.forEach(product => {
       
        const card = document.createElement("div");
        card.classList.add("product-cardadm");

        const productImage = document.createElement("img");
        productImage.src = product.productImage;

        const productName = document.createElement("h3");
        productName.textContent = product.productName;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: ${product.price}`;

        const productDescription = document.createElement("p");
        productDescription.textContent = product.productDescription;

        const updateDelete = document.createElement('div');
        updateDelete.className = 'updatedeleteadm';

        const update = document.createElement('div')
        update.className = 'edit'
        const deleteitem = document.createElement('div')
        deleteitem.className = 'delete'
        
        update.innerHTML = 'update'
        deleteitem.innerHTML = 'delete'

        updateDelete.appendChild(update);
        updateDelete.appendChild(deleteitem);
        const productStock = document.createElement("p");
        productStock.style.marginTop = "15px"
        productStock.style.fontStyle = "italic";

        productStock.textContent = `Items left in stock: ${product.stock}`;

        card.appendChild(productImage);
        card.appendChild(productName);
        card.appendChild(productPrice);
        card.appendChild(productDescription);
        card.appendChild(productStock);
        card.appendChild(updateDelete);

        updateDelete.style.width = "100%"
        productContaineradm.appendChild(card);

        const deletebtn = deleteitem
        deletebtn.addEventListener('click', async (e)=>{
        e.preventDefault()
        const id = product.productId
        
        const res= await deleteproduct(id)
        if(res=="product deleted successfully"){
            productContaineradm.removeChild(card)
            info.innerHTML=res
            setTimeout(info.innerHTML='',7000)  
        }
        else{
            
            info.innerHTML=res
            info.style.color = 'red'
            setTimeout(info.innerHTML='',7000)
            info.style.color = 'green'
        }
        updateProductCards();
        })


        update.addEventListener('click', async(e)=>{
            e.preventDefault()
            productContaineradm.innerHTML=""
            productContaineradm.appendChild(addproduct)
            const updatedetails = [product.productName, product.productDescription,product.price, product.stock]
            
            
            const productName = document.querySelector('#product-name')
            const productDescription = document.querySelector('#product-description')
            const price = document.querySelector('#product-price')
            const stock = document.querySelector('#product-stock')

            productName.value = updatedetails[0]
            productDescription.value = updatedetails[1]
            price.value = updatedetails[2]
            stock.value = updatedetails[3]
            addnew.innerHTML = `Updating The Product `

            addproduct.style.display = 'block'
            addproduct.style.position = 'absolute'
            addproduct.style.left = 0;
            addproduct.style.right = 0
            addproduct.style.marginLeft= 'auto'; 
            addproduct.style.marginRight= 'auto';
            addproduct.style.boxShadow = 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px';

            addproductfm.addEventListener('submit', async(e)=>{
                e.preventDefault()
                // const productName = document.querySelector('#product-name')
                // const productDescription = document.querySelector('#product-description')
                // const price = document.querySelector('#product-price')
                const prodimg = document.querySelector('#product-image')
                // const stock = document.querySelector('#product-stock')
                const msg = document.querySelector('.msg')
        
                const productNam = productName.value
                const productDesc = productDescription.value 
                const pric = price.value
                const prodim = prodimg.value
                const stoc = stock.value
                
                
                const values = [productNam, productDesc, pric,prodim, stoc, product.productId]
                const res = await editproduct(values)
                if (res == "product updated successfully") {
                    addproductfm.reset();
                
                    msg.innerHTML = 'Product updated successfully';
                    msg.style.color = "green";
                    msg.style.marginBottom = "10px"
                
                    setTimeout(() => {
                        msg.innerHTML = '';
                        updateProductCards();
                    }, 2000);
                }
            })
           
        })
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
    products = await fetchProducts(); 
    
    generateProductCards(products);
}

searchInputadm.addEventListener('input', () => {
    const searchTerm = searchInputadm.value.toLowerCase();
    const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchTerm));

    generateProductCards(filteredProducts);

    if (filteredProducts.length < 1) {
        errorElement.innerHTML = "No product(s) found";
    } else {
        errorElement.innerHTML = "";
    }
});

async function deleteproduct(productId){
    try {
       const response = await fetch(`http://localhost:4503/product/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-type": 'application/json'
        }}) 

        if(response.ok){
            return "product deleted successfully"
        }
        else{
            return "product not deleted"
        }
        
    } catch (error) {
        return error
    }
}
async function newproduct(values){
    try {
        const response = await fetch(`http://localhost:4503/product`, {
        method: "POST",
        body:JSON.stringify( {
            productName: values[0],
            productDescription: values[1],
            price: values[2],
            productImage: values[3],
            stock: values[4]
        }),
        headers: {
            "Content-type": 'application/json'
        }}) 

        
        
        if(response.ok){
            return "product Added successfully"
        }
        else{
            return "product not added"
        } 
    } catch (error) {
        return error
    }
}
async function editproduct(values){
    try {
        const response = await fetch(`http://localhost:4503/product/${values[5]}`, {
        method: "PUT",
        body:JSON.stringify( {
            productName: values[0],
            productDescription: values[1],
            price: values[2],
            productImage: values[3],
            stock: values[4]
        }),
        headers: {
            "Content-type": 'application/json'
        }}) 

        
        
        if(response.ok){
            return "product updated successfully"
        }
        else{
            return "product not updated"
        } 
    } catch (error) {
        return error
    }
}
  
eddtoproducts.addEventListener('click',()=>{
    productContaineradm.innerHTML=''
    productContaineradm.appendChild(addproduct);
    addproduct.style.display = 'block';
    addproduct.style.position = 'absolute';
    addproduct.style.left = 0;
    addproduct.style.right = 0
    addproduct.style.marginLeft= 'auto'; 
    addproduct.style.marginRight= 'auto';
    addproduct.style.boxShadow = 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px';

    addproductfm.addEventListener('submit', async(e)=>{
        e.preventDefault()
        const productName = document.querySelector('#product-name')
        const productDescription = document.querySelector('#product-description')
        const price = document.querySelector('#product-price')
        const prodimg = document.querySelector('#product-image')
        const stock = document.querySelector('#product-stock')
        const msg = document.querySelector('.msg')

        const productNam = productName.value
        const productDesc = productDescription.value 
        const pric = price.value
        const prodim = prodimg.value
        const stoc = stock.value

        const values = [productNam, productDesc, pric,prodim, stoc]
        const res = await newproduct(values)
        if (res == "product Added successfully") {
            addproductfm.reset();
        
            msg.innerHTML = 'Product added successfully';
            msg.style.color = "green";
            msg.style.marginBottom = "10px"
        
            setTimeout(() => {
                msg.innerHTML = '';
                updateProductCards();
            }, 2000);
        }
    })

})

cancelbtn.addEventListener('click',()=>{
    addproductfm.reset()
    addnew.innerHTML = `Add a New Product `
    updateProductCards();
})
updateProductCards();

