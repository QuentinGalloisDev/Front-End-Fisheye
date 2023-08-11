

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const background = document.querySelector(".background")
    background.style.display = "none"
}


function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    const background = document.querySelector(".background")
    background.style.display = "block"



}
const send = document.querySelector("#submitForm")
send.addEventListener("click", (event) => {
    event.preventDefault()
    const firstName = document.querySelector("#firstName").value
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const message = document.querySelector("#message").value
    const background = document.querySelector(".background")
    background.style.display = "none"
    const formData = { prénom: firstName, nom: name, mail: email, message: message }
    console.log(formData)
})