function mediaTemplate(media, photographeName) {
    const { date, id, image, video, likes, photographerId, price, title } = media;
    const photoMedia = `assets/photographers/${photographeName}/${image}`
    const videoMedia = `assets/photographers/${photographeName}/${video}`
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
            getUrlPhoto(photoMedia)
            // createLightbox()

            function getUrlPhoto(url) {
                const element = buildDomLightbox(url)
                console.log(element)
                document.body.appendChild(element)
            }
            // On créer la structure de la lightbox avec l'url en variable.
            function buildDomLightbox(url) {

                const domlightbox = document.createElement("div")
                domlightbox.setAttribute("class", "lightbox")
                domlightbox.style.display = "block"
                domlightbox.innerHTML = `<button class="lightbox_close">Fermer</button>
            <button class="lightbox_next">Suivant</button>
            <button class="lightbox_prev">Précédent</button>
            <div class="lightbox_container">
               <img src="${url}"> 
            </div>`
                // On ajoute un écouteur d'évènement sur l'élément close qui va fermer la lightbox au click
                domlightbox.querySelector(".lightbox_close").addEventListener("click", e => {
                    domlightbox.style.display = "none"
                })
                return domlightbox

            }
        }

        )



        return container
    }
    return { getUserMediaDOM }

}