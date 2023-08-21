const alternateTextElement = document.getElementById("alternateText");
const alternateTexts = ["Welcome to Shoppie!", "Free delivery", "Genuine Products"];
let currentAlternateTextIndex = 0;

const loginForm = document.getElementById('form-login')
const messageElement = document.getElementById('message-element')



loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    if(password.length<5){
        messageElement.style.color = "red"
        messageElement.innerText = "Password must contain at least 6 characters";
        return;
    }
    try {
        const response = await fetch('http://localhost:4503/users/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: 
                JSON.stringify({
                    Email: email,
                    Password: password
                })
            
        })
        
        if(response.ok){
            messageElement.style.color = 'green'
            messageElement.innerText = "Log in Successful"
            const data = await response.json()
            localStorage.setItem("authToken", data.token)

            const decodedToken = parseJwt(data.token)

            console.log(decodedToken.Role)

                window.location.href = "/Frontend/dashboard/dashboard.html"

        }

        else {
            const error = await response.json();
            messageElement.style.color = 'red'
            messageElement.innerText = error.error
        }
        
    }catch (e) {
        console.log(e.message)
    }
    
})

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


function updateAlternateText() {
    alternateTextElement.textContent = alternateTexts[currentAlternateTextIndex];
    currentAlternateTextIndex = (currentAlternateTextIndex + 1) % alternateTexts.length;
}

updateAlternateText();
setInterval(updateAlternateText, 3000);