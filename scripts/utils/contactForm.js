

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";



}
const send = document.querySelector("#submitForm")
send.addEventListener("click", (event) => {
    event.preventDefault()
    const firstName = document.querySelector("#firstName").value
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const message = document.querySelector("#message").value

    console.log(firstName, name, email, message)
})