const alternateTextElement = document.getElementById("alternateText");
const alternateTexts = ["Welcome to Shoppie!", "Free delivery", "Genuine Products"];
const userInputForm = document.getElementById('input-form')
const messageElement = document.getElementById('message-element')
const loginbutton = document.querySelector('#login-button')



let currentAlternateTextIndex = 0;

loginbutton.addEventListener('click', async(e)=>{
    e.preventDefault()
    window.location.href = '/Frontend/login/login.html'
})


userInputForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value
    const phoneNumber = document.getElementById('phone-number').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirm-password').value
    if (!validatePhoneNumber(phoneNumber)) {
        messageElement.innerText = "Ensure the phone number matches the format 254..."
        return;
    }

    if (password < 5) {
        messageElement.innerText = "Password must be atleast 6 characters"
        return;
    }
    if (password !== confirmPassword) {
        messageElement.innerText = "Passwords do not match";
        return;
    }

    try {

        const response = await fetch('http://localhost:4503/users/register', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                UserName: userName,
                Email: email,
                PhoneNumber: phoneNumber,
                Password: password,
                ResetToken: null,
                isActive: 1,
                isAdmin: 0
            })
        })


        if (response.ok){
            messageElement.innerText = "Acccount created successfully"
            messageElement.style.color = 'green'
            window.location.href = '/Frontend/login/login.html'
        }
        else {
            const error = await  response.json()
            messageElement.innerText = error.error
        }
    } catch (e) {
        console.log(e)
    }


})

function updateAlternateText() {
    alternateTextElement.textContent = alternateTexts[currentAlternateTextIndex];
    currentAlternateTextIndex = (currentAlternateTextIndex + 1) % alternateTexts.length;
}

function validatePhoneNumber(phoneNumber) {
    const phoneNumberPattern = /^254\d{9}$/; // Regular expression pattern for the format

    return phoneNumberPattern.test(phoneNumber);
}





updateAlternateText();
setInterval(updateAlternateText, 3000);