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
    const likesAndPrice = document.createElement("div")
    likesAndPrice.setAttribute("class", "likesAndPrice")
    const likes = document.createElement("p")
    const price = document.createElement("span")
    likes.setAttribute("class", "likes")
    price.setAttribute("class", "price")

    // On place les éléments du dom
    button.before(divDetails)
    divDetails.appendChild(name)
    divDetails.appendChild(paragraphLocation)
    divDetails.appendChild(paragraphTagline)
    photographeHeader.appendChild(img)
    divDetails.appendChild(likesAndPrice)
    likesAndPrice.appendChild(likes)
    likesAndPrice.appendChild(price)

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
    likes.textContent = `${total} ♥ `
    price.textContent = `${artist.price}€/Jour`

    // On sélectionne les likes

}
async function createMediaDisplay(medias, photographName, gallery) {
    const main = document.querySelector("#main")
    const mainContainerMedia = document.createElement("div")
    mainContainerMedia.setAttribute("class", "main_container_media")
    medias.forEach(media => {
        const mediaModel = mediaTemplate(media, photographName, gallery)

        const mediaDisplayDom = mediaModel.getUserMediaDOM()
        main.appendChild(mainContainerMedia)
        mainContainerMedia.appendChild(mediaDisplayDom)
    });

}
async function displayPhotographe(gallery) {
    const { photographe } = await getPhotographer()
    const mediaPhotographe = await getMediaPhotographe()
    createPhotographerDisplay(photographe, mediaPhotographe)
    // const gallery = mediaPhotographe.map(e => { return e.image })
    // console.log(gallery)
    gallery = mediaPhotographe.map(src => {
        if (src.image) { return `assets/photographers/${photographe.name}/${src.image}` }
        else { return `assets/photographers/${photographe.name}/${src.video}` }
    })
    createMediaDisplay(mediaPhotographe, photographe.name, gallery)

    //On récupére les photos de l'objet mediaPhotographe
    console.log(mediaPhotographe)

    //SI ça finis par jpg retourn l'url de l'image sinon retourne l'url de la video
    const testIfImage = /(?:jpg)$|(?:png)$/g

    console.log(gallery)

    // console.log(likesParagraph) 

    // On sélectionne les likes totaux
    let sumLikes = document.querySelector(".likes")
    let sumLikesText = sumLikes.innerHTML
    toString(sumLikesText)
    const afterLikes = sumLikesText.split(" ")
    let sumLikesInt = afterLikes[0]
    sumLikesInt = parseInt(sumLikesInt)
    // On sélectionne les likes des médias
    let likesParagraph = document.querySelectorAll(".details_media p")
    likesParagraph.forEach((e) => {
        let classes = e.classList
        let numberLikesMedia = e.innerHTML
        toString(numberLikesMedia)
        const afterLikes = numberLikesMedia.split(" ")
        // On sélectionne uniquement le nombre de likes qu'on transforme en entier.
        let numberLikesMediaNoHeart = afterLikes[0]
        numberLikesMediaNoHeart = parseInt(numberLikesMediaNoHeart)


        e.addEventListener("click", element => {
            element.preventDefault()
            console.log(numberLikesMediaNoHeart)
            let result = classes.toggle("c");


            if (result) {
                e.innerHTML = ""
                e.innerHTML = `${numberLikesMediaNoHeart + 1} ♥`
                sumLikes.innerHTML = ""
                sumLikesInt += 1
                sumLikes.innerHTML = `${sumLikesInt} ♥`
            }
            else {
                e.innerHTML = ""
                e.innerHTML = `${numberLikesMediaNoHeart} ♥`
                sumLikes.innerHTML = ""
                sumLikesInt -= 1
                sumLikes.innerHTML = `${sumLikesInt} ♥`
            }
        })
    })

    function comparePopularity(a, b) {
        return a - b

    }
    function compareDate() {

    }
    function compareTitre() {

    }
    // test système de tri
    document.querySelector("#sort_type").addEventListener("change", (event) => {
        switch (event.target.value) {
            case "popularité":
                console.log(event.target.value)
                mediaPhotographe.sort(function (a, b) {
                    return a.likes - b.likes
                })
                console.log(mediaPhotographe)
                break;
            case "date":
                console.log(event.target.value)
                mediaPhotographe.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date)
                })
                console.log(mediaPhotographe)
                break;
            case "titre":
                console.log(event.target.value)
                mediaPhotographe.sort(function (a, b) {
                    a = a.title
                    b = b.title
                    return a.localeCompare(b);
                })
                console.log(mediaPhotographe)
                break;
        }
    })


    // test système de tri
}
displayPhotographe()


