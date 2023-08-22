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

const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const numberField = document.getElementById("phone-number");

editButton.addEventListener("click", () => {
  nameField.innerHTML = `<input type="text" value="${nameField.innerText}">`;
  emailField.innerHTML = `<input type="email" value="${emailField.innerText}">`;
  numberField.innerHTML = `<input type="number" value="${numberField.innerText}">`; // Fixed syntax error here
  editButton.style.display = "none";
  saveButton.style.display = "block";
});

saveButton.addEventListener("click", async () => {
  const newName = nameField.querySelector("input").value;
  const newEmail = emailField.querySelector("input").value;
  const newNumber = numberField.querySelector("input").value; // Get the new phone number value

  // Make API call to update data here
  // Handle success and error responses

  // Update the UI
  nameField.innerHTML = newName;
  emailField.innerHTML = newEmail;
  numberField.innerHTML = newNumber; // Update the phone number value in the UI
  editButton.style.display = "block";
  saveButton.style.display = "none";
});


function logout(){

    localStorage.clear()
    window.location.href = "/Frontend/welcome.html"
}