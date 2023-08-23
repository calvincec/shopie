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


    updateUserDetails(newEmail, newNumber)
    // Make API call to update data here
    // Handle success and error responses

    // Update the UI
    emailField.innerHTML = newEmail;
    numberField.innerHTML = newNumber;
    editButton.style.display = "block";
    deleteButton.style.display = "block";
    saveButton.style.display = "none";
});

async function updateUserDetails(Email, Phonenumber) {
    try {
        const response = await fetch(`http://localhost:4503/users/update-information/${userID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Email: Email,
                Phonenumber: Phonenumber
            })
        })

        if (response.ok) {
            console.log("updated succesfully");
        } else {
            const error = await response.json()
            console.log(error.error);
        }
    } catch (error) {

    }
}

deleteButton.addEventListener('click', () => {

    const confirmation = confirm("Are you sure you want to deactivate your account?");

    console.log(confirmation);
    if(confirmation){
            disableAccount()
            setTimeout(() => {
                logout();
            }, 1500)
    }
    else {
        return;
    }
})

async function disableAccount() {
    try {
        const response = await fetch(`http://localhost:4503/users/disable-account/${userID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.ok){
            console.log("deactivated ok");

            let x = await response.json()
            console.log(x.message);
        }
        else {
            const errorResponse = await response.json();
            console.log("Error:", errorResponse);
        }


    } catch (error) {

        console.log(error)
    }
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

function logout() {
    localStorage.clear();
    window.location.href = "/Frontend/welcome.html";
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


