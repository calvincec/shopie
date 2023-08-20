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
            const data = await response.json()
            console.log(data)
            console.log(data.token)
            messageElement.style.color = 'green'
            messageElement.innerText = "Log in Successful"
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


function updateAlternateText() {
    alternateTextElement.textContent = alternateTexts[currentAlternateTextIndex];
    currentAlternateTextIndex = (currentAlternateTextIndex + 1) % alternateTexts.length;
}

updateAlternateText();
setInterval(updateAlternateText, 3000);