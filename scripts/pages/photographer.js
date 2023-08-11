//Mettre le code JavaScript lié à la page photographer.html

//Faire un searchparams pour récupérer l'id dans l'url.


// Récupérer le tableau des photographes
async function getPromesse() {
    // let params = (new URL(document.location)).searchParams
    // let id = params.get('id')
    let response = await fetch("../../data/photographers.json")
    let photographers = await response.json()
    photographers = photographers.photographers

    // let photographe = photographers.find(element => element.id == id)
    return ({ photographers })
    // return ({
    //     photographers: [...photographers]
    // })
}
async function getMedia() {
    let responseMedia = await fetch("../../data/photographers.json")
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
    img.setAttribute("alt", `Le portrait de ${artist.name}`)
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
    // const gallery = mediaPhotographe.map(e => { return e.image })
    // console.log(gallery)
    createMediaDisplay(mediaPhotographe, photographe.name)

    //On récupére les photos de l'objet mediaPhotographe
    console.log(mediaPhotographe)
    //SI ça finis par jpg retourn l'url de l'image sinon retourne l'url de la video
    const testIfImage = /(?:jpg)$|(?:png)$/g
    let gallery = mediaPhotographe.map(src => {
        if (src.image) { return `assets/photographers/${photographe.name}/${src.image}` }
        else { return `assets/photographers/${photographe.name}/${src.video}` }
    })
    // console.log(gallery)

    function goToNext() {
        // récupère la src de l'image en cours
        let image = document.querySelector(".lightbox img")
        let src = image.getAttribute("src")
        let video = document.querySelector(".lightbox video")

        console.log(src)
        //Si la src finis par mp4 on créé un élément video
        const testVideo = /(?:mp4)$/g
        // récupère l'index de la photo en cours
        let i = gallery.findIndex(image => image === src)
        // Si on arrive à la fin du tableau on l'index reviens au début 
        if (i >= gallery.length - 1) {
            i = -1
            image.setAttribute("src", gallery[i])
            // 
        }
        image.setAttribute("src", gallery[i + 1])
        video.setAttribute("src", gallery[i + 1])
        let srcVideo = video.getAttribute("src")
        if (testVideo.test(srcVideo) === false) {
            image.style.display = "flex"
            video.style.display = "none"

        }
        else {
            video.style.display = "block"
        }
    }
    function goToPrev() {
        // récupère la src de l'image en cours
        let image = document.querySelector(".lightbox img")
        let src = image.getAttribute("src")
        let video = document.querySelector(".lightbox video")

        const testVideo = /(?:mp4)$/g
        console.log(src)
        // récupère l'index de la photo en cours
        let i = gallery.findIndex(image => image === src)
        // si on arrive au début du tableau, on reviens à la fin
        if (i === 0) {
            i = gallery.length
        }
        video.setAttribute("src", gallery[i - 1])
        image.setAttribute("src", gallery[i - 1])
        let srcVideo = video.getAttribute("src")
        if (testVideo.test(srcVideo) === false) {
            video.style.display = "none"
        }
        else {
            video.style.display = "block"
        }

    }

    let next = document.querySelector(".lightbox .lightbox_next")
    next.addEventListener("click", e => {
        goToNext()

    })

    window.addEventListener("keydown", (event) => {
        let lightboxOpen = document.querySelector(".lightbox")
        if (lightboxOpen.style.display === "block") {
            switch (event.key) {
                case "ArrowRight":
                    goToNext()
                    break;

                case "ArrowLeft":
                    goToPrev()
                    break;
            }
        }
    })
    let prev = document.querySelector(".lightbox .lightbox_prev")
    prev.addEventListener("click", e => {

        goToPrev()
    })

}
displayPhotographe()


