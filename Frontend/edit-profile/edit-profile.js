const token = localStorage.getItem("authToken");
const decodedToken = parseJwt(token);
const userID = decodedToken.UserID;
const editButton = document.getElementById("editButton");
const deleteButton = document.getElementById('delete-profile');
const saveButton = document.getElementById("saveButton");

const nameField = document.getElementById('name')
const emailField = document.getElementById("email");
const numberField = document.getElementById("phone-number");

document.addEventListener("DOMContentLoaded", function () {
    $(".dropdown").click(function (event) {
        event.stopPropagation();
        $(this).find(".dropdown-content").toggle();
    });

    // Hide the dropdown content on DOM content load
    $(".dropdown-content").hide();

    $(document).click(function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdown-content").hide();
        }
    });




    editButton.addEventListener("click", () => {
        emailField.innerHTML = `<input type="email" value="${emailField.innerText}">`;
        numberField.innerHTML = `<input type="number" value="${numberField.innerText}">`;
        editButton.style.display = "none";
        deleteButton.style.display = "none";
        saveButton.style.display = "block";
    });

    saveButton.addEventListener("click", async () => {
        const newEmail = emailField.querySelector("input").value;
        const newNumber = numberField.querySelector("input").value;

        // Make API call to update data here
        // Handle success and error responses

        // Update the UI
        emailField.innerHTML = newEmail;
        numberField.innerHTML = newNumber;
        editButton.style.display = "block";
        deleteButton.style.display = "block";
        saveButton.style.display = "none";
    });



    ; // You might need to define this function if it's not included in the provided code.

    // Add any other functions or code you have here
});

function logout() {
    localStorage.clear();
    window.location.href = "/Frontend/welcome.html";
}

async function fetchUserDetails() {

    try {
        const response = await fetch(`http://localhost:4503/users/${userID}`, {
            method: "GET",
        })

        if (response.ok) {

            const data = await response.json()
            console.log(data);

            nameField.innerText = data.Username;
            emailField.innerText = data.Email;
            numberField.innerText = data.PhoneNumber
        } else {
            const error = await response.json()

            console.log(error.error);
        }

    } catch (error) {
        console.log(error);
    }
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

fetchUserDetails()


