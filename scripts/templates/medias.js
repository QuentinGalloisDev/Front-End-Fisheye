function mediaTemplate(media, photographeName) {
    const { date, id, image, video, likes, photographerId, price, title } = media;
    const photoMedia = `assets/photographers/${photographeName}/${image}`
    const videoMedia = `assets/photographers/${photographeName}/${video}`
    // gallery.push(photoMedia)
    // console.log(gallery)
    //On créer une fonction pour afficher les médias sur la page
    function getUserMediaDOM() {
        //On créer les éléments dans le DOM
        const container = document.createElement("div")
        container.setAttribute("class", "container_media")
        // On créer un élément img si les données contiennent une image ou bien un élément video.
        const details = document.createElement("div")
        details.setAttribute("class", "details_media")
        const titre = document.createElement("h3")
        const likesNumber = document.createElement("p")

        main.appendChild(container)
        if (media.hasOwnProperty('image')) {
            const photo = document.createElement("img")
            container.appendChild(photo)
            photo.setAttribute("src", photoMedia)
            photo.setAttribute("id", id)
            photo.setAttribute("alt", `La photo de ${title}`)
        }
        else {
            const lecteur = document.createElement("video")
            lecteur.setAttribute("controls", "")
            container.appendChild(lecteur)
            const source = document.createElement("source")
            lecteur.appendChild(source)
            source.setAttribute("src", videoMedia)
        }
        container.appendChild(details)
        details.appendChild(titre)
        details.appendChild(likesNumber)

        // On insère les données
        titre.textContent = title
        likesNumber.textContent = `${likes} ♥`
        // On créer la lightbox

        container.addEventListener("click", (e) => {

            e.preventDefault()
            getUrlPhoto(photoMedia, videoMedia)
            // createLightbox()

            function getUrlPhoto(url, urlVideo) {
                const element = insertDomLightbox(url, urlVideo)

                document.body.appendChild(element)
            }
            // On créer la structure de la lightbox avec l'url en variable.
            function insertDomLightbox(url, urlVideo) {
                const testImage = /(?:jpg)$|(?:png)$/g
                const lightbox = document.querySelector(".lightbox")
                lightbox.style.display = "block"
                const picture = document.querySelector(".lightbox .lightbox_container img")
                const video = document.querySelector(".lightbox .lightbox_container video")
                if (testImage.test(url)) {
                    // Si il y a une image (test avec cette regex : (?:jpg)$|(?:png)$) ) on créé une image
                    video.style.display = "none"
                    picture.style.display = "block"
                    picture.src = url
                }
                else {
                    picture.style.display = "none"
                    video.style.display = "block"
                    video.src = urlVideo
                }


                // On ajoute un écouteur d'évènement sur l'élément close qui va fermer la lightbox au click
                lightbox.querySelector(".lightbox_close").addEventListener("click", e => {
                    lightbox.style.display = "none"
                })
                window.addEventListener("keydown", (event) => {
                    if (event.key === "Escape") {
                        lightbox.style.display = "none"
                    }
                })
                return lightbox

            }
        }

        )



        return container
    }
    return { getUserMediaDOM }

}