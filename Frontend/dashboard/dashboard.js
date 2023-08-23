const token = localStorage.getItem("authToken")
const userJsonString = localStorage.getItem('user');
const adminUI = document.getElementById('admin-ui');
const customerUI = document.getElementById('user-ui')
const greetingsElement = document.getElementById("helloAdminMessage")
const customerGreetings = document.getElementById('helloCustomerMessage')

const userLogoutButton = document.getElementById('user-logout')



document.addEventListener("DOMContentLoaded", () => {
    const decodedToken = parseJwt(token)
   let  userId = decodedToken.UserID
    // console.log(userId);
    // console.log(decodedToken);
    if (!token) {
        console.log("no tokn");
        window.location.href = '/Frontend/login/login.html'
    } 
        if (decodedToken.Role === "user") {
            customerUI.style.display = "block"
            adminUI.style.display = "none"
            adminUI.style.visibility = "hidden"


        } else {
            adminUI.style.display = "block"
            customerUI.style.display = "none"
            customerUI.style.visibility = "hidden"
            
        }


        greetingsElement.innerHTML = `Hello, <br> ${decodedToken.UserName}`
        customerGreetings.innerHTML = `Hello, <br> ${decodedToken.UserName}`

        greetingsElement.style.fontSize = '14px'
        customerGreetings.style.fontSize = '14px'
    
})


userLogoutButton.addEventListener('click', () => {
    logout()
})
function logout(){

    localStorage.clear()
    window.location.href = "/Frontend/welcome.html"
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

