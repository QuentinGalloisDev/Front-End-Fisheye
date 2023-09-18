

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", 'true')
    modal.style.display = "none";
    const background = document.querySelector(".background")
    background.style.display = "none"
    let main = document.querySelector("#main")
    main.setAttribute("aria-hidden", 'false')
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", 'false')
    modal.style.display = "block";
    const background = document.querySelector(".background")
    background.style.display = "block"
    let main = document.querySelector("#main")
    main.setAttribute("aria-hidden", 'true')
    let firstChamp = document.getElementById("firstName")
    //On met le focus sur le premier champ du formmulaire
    firstChamp.focus()
    // Quand l'utilisateur appui sur escape, la modal se ferme.
    modal.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeModal()
        }
    })
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