//Mettre le code JavaScript lié à la page photographer.html

//Faire un searchparams pour récupérer l'id dans l'url.


// Récupérer le tableau des photographes
async function getPromesse() {
    // let params = (new URL(document.location)).searchParams
    // let id = params.get('id')
    let response = await fetch("http://localhost:5500/././data/photographers.json")
    let photographers = await response.json()
    photographers = photographers.photographers
    //Faire une recherche du photographe suivant l'id trouvé
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
getMedia()
async function getId() {
    let params = (new URL(document.location)).searchParams
    let id = params.get('id')
    return id
}
async function getPhotographe() {
    const { photographers } = await getPromesse()
    const id = await getId()
    let photographe = photographers.find(element => element.id == id)
    // console.log({ photographe })
    return ({ photographe })
}
getPhotographe()


async function getMediaPhotographe() {
    const { medias } = await getMedia()
    const id = await getId()
    let mediaPhotographe = []
    for (let i of medias) {
        if (i.photographerId == id) {
            mediaPhotographe.push(i)
        }
    }
    // console.log(mediaPhotographe)
    return ({ mediaPhotographe })
}
getMediaPhotographe()

async function createPhotographeDisplay(artist, media) {

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
    let somme = 0
    for (let i of sum) {
        somme += i
    }

    likesAndPrice.textContent = `${somme}♥ ${artist.price}€/Jour`


}
async function createMediaDisplay(media, photographName) {
    const main = document.querySelector("#main")
    const mainContainerMedia = document.createElement("div")
    mainContainerMedia.setAttribute("class", "main_container_media")

    media.forEach(element => {
        const mediaModel = mediaTemplate(element, photographName)
        const mediaDisplayDom = mediaModel.getUserMediaDOM()
        main.appendChild(mainContainerMedia)
        mainContainerMedia.appendChild(mediaDisplayDom)
    });
}
async function displayPhotographe() {
    const { photographe } = await getPhotographe()
    const { mediaPhotographe } = await getMediaPhotographe()
    createPhotographeDisplay(photographe, mediaPhotographe)
    createMediaDisplay(mediaPhotographe, photographe.name)

    console.log(photographe)
    console.log(mediaPhotographe)


}
displayPhotographe()


//Afficher les éléments du photographe suivant les résultats de la recherche