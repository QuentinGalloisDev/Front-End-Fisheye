//Mettre le code JavaScript lié à la page photographer.html

//Faire un searchparams pour récupérer l'id dans l'url.


// Récupérer le tableau des photographes
async function getPromesse() {
    // let params = (new URL(document.location)).searchParams
    // let id = params.get('id')
    let response = await fetch("http://localhost:5500/././data/photographers.json")
    let photographers = await response.json()
    photographers = photographers.photographers

    // let photographe = photographers.find(element => element.id == id)
    return ({ photographers })
    // return ({
    //     photographers: [...photographers]
    // })
}
async function getMedia() {
    let responseMedia = await fetch("http://localhost:5500/././data/photographers.json")
    let medias = await responseMedia.json()
    medias = medias.media
    // console.log(medias)
    return ({ medias })
}

//Faire une recherche du photographe suivant l'id trouvé
function getId() {
    let params = (new URL(document.location)).searchParams
    let id = params.get('id')
    return id
}
async function getPhotographer() {
    const { photographers } = await getPromesse()
    const id = getId()
    let photographe = photographers.find(element => element.id == id)
    // console.log({ photographe })
    return ({ photographe })
}



async function getMediaPhotographe() {
    const { medias } = await getMedia()
    const id = getId()
    const mediaPhotographe = medias.filter(media => parseInt(media.photographerId) === parseInt(id))
    // console.log(mediaPhotographe)
    return mediaPhotographe
}


async function createPhotographerDisplay(artist, media) {

    const portrait = `assets/photographers/${artist.portrait}`;
    // On créer les éléments du dom
    const divDetails = document.createElement('div')
    const name = document.createElement('h2')
    const paragraphLocation = document.createElement('p')
    const paragraphTagline = document.createElement('p')
    const img = document.createElement('img');
    // On sélectionne l'élément où intégrer les données
    const photographeHeader = document.querySelector(".photograph-header")
    const button = document.querySelector(".contact_button")
    const likesAndPrice = document.createElement("p")
    likesAndPrice.setAttribute("class", "likesAndPrice")

    // On place les éléments du dom
    button.before(divDetails)
    divDetails.appendChild(name)
    divDetails.appendChild(paragraphLocation)
    divDetails.appendChild(paragraphTagline)
    photographeHeader.appendChild(img)
    divDetails.appendChild(likesAndPrice)

    // Et on y insère les données 
    name.textContent = artist.name
    paragraphLocation.textContent = `${artist.city}, ${artist.country}`
    paragraphTagline.textContent = artist.tagline
    img.setAttribute('src', portrait)
    // On calcul le nombre total de likes
    let sum = media.map(likes => { return likes.likes })
    const initialValue = 0;
    let total = sum.reduce((acc, curr) =>
        acc + curr
        , initialValue)
    likesAndPrice.textContent = `${total}♥ ${artist.price}€/Jour`


}
async function createMediaDisplay(medias, photographName) {
    const main = document.querySelector("#main")
    const mainContainerMedia = document.createElement("div")
    mainContainerMedia.setAttribute("class", "main_container_media")

    medias.forEach(media => {
        const mediaModel = mediaTemplate(media, photographName)
        const mediaDisplayDom = mediaModel.getUserMediaDOM()
        main.appendChild(mainContainerMedia)
        mainContainerMedia.appendChild(mediaDisplayDom)
    });
}
async function displayPhotographe() {
    const { photographe } = await getPhotographer()
    const mediaPhotographe = await getMediaPhotographe()
    createPhotographerDisplay(photographe, mediaPhotographe)
    createMediaDisplay(mediaPhotographe, photographe.name)

    console.log(photographe)
    console.log(mediaPhotographe)

    // On récupére toutes les photos qui s'affiche.
    let allPhotos = Array.from(document.querySelectorAll(".container_media img"))
    const gallery = allPhotos.map(image => image.getAttribute('src'))

    //Pour chaque photo on ajoute un écouteur d'évènement click
    // allPhotos.forEach(photo => photo.addEventListener("click", e => {
    //     e.preventDefault()
    //     // On importe la structure de la lightbox dans le body
    //     function getUrlPhoto(url) {
    //         const element = buildDomLightbox(url)
    //         document.body.appendChild(element)
    //     }
    // On créer la structure de la lightbox avec l'url en variable.
    // function buildDomLightbox(url) {
    //     const domlightbox = document.createElement("div")
    //     domlightbox.setAttribute("class", "lightbox")
    //     domlightbox.style.display = "block"
    //     domlightbox.innerHTML = ` <button class="lightbox_close">Fermer</button>
    // <button class="lightbox_next">Suivant</button>
    // <button class="lightbox_prev">Précédent</button>
    // <div class="lightbox_container">
    //    <img src="${url}"> 
    // </div>`



    // On ajoute un écouteur d'évènement sur l'élément close qui va fermer la lightbox au click
    // domlightbox.querySelector(".lightbox_close").addEventListener("click", e => {
    //     domlightbox.style.display = "none"
    // })
    // domlightbox.querySelector(".lightbox_next").addEventListener("click", e => {
    //     let attributeSrc = photo.getAttribute("src")
    //     // nextImage(gallery, attributeSrc)
    //     let i = gallery.findIndex(image => image === attributeSrc)
    //     if (i === gallery.length - 1) {
    //         i = -1
    //     }

    //     const containerImage = document.querySelector(".lightbox_container")
    //     containerImage.innerHTML = ""
    //     const image = document.querySelector("img")
    //     containerImage.appendChild(image)
    //     console.log(i)



    // })
    // domlightbox.querySelector(".lightbox_prev").addEventListener("click", e => {
    //     prevImage(gallery, attributeSrc)
    // })

    function nextImage(gallery, attributeSrc) {
        // let i = gallery.findIndex(image => image === attributeSrc)
        // if (i === gallery.length - 1) {
        //     i = -1
        // }

        // const container = document.querySelector(".lightbox_container")
        // container.innerHTML = ""
        // const image = document.createElement("img")
        // container.appendChild(image)

        // console.log(i)
        // image.src = gallery[i + 1]
        // console.log(i)
        // loadImage(gallery[i + 1])

    }
    function prevImage(gallery, attributeSrc) {
        // let i = gallery.findIndex(image => image === attributeSrc)
        // if (i === gallery.length - 1) {
        //     i = -1
        // }

        // loadImage(gallery[i - 1])
        // console.log(i)
    }
    // function loadImage(src) {

    //     const container = document.querySelector(".lightbox_container")
    //     container.innerHTML = ""
    //     const image = document.createElement("img")
    //     container.appendChild(image)
    //     image.src = src

    // }
    // return domlightbox
    // }
    // Fin domlightbox


    // getUrlPhoto(photo.src)
    // })

    // )


}
displayPhotographe()


