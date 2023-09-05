function mediaTemplate(media, photographeName, gallery, tabIndex) {
    let { date, id, image, video, likes, photographerId, price, title } = media;
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
        const photo = document.createElement("img")
        main.appendChild(container)

        if (media.hasOwnProperty('image')) {

            container.appendChild(photo)
            photo.setAttribute("src", photoMedia)
            photo.setAttribute("id", id)
            photo.setAttribute("alt", `La photo de ${title}`)
            photo.setAttribute("tabindex", `${tabIndex}`)
        }
        else {
            const lecteur = document.createElement("video")
            lecteur.setAttribute("controls", "")
            container.appendChild(lecteur)
            const source = document.createElement("source")
            lecteur.appendChild(source)
            source.setAttribute("src", videoMedia)
            lecteur.setAttribute("tabindex", `${tabIndex}`)
        }
        container.appendChild(details)
        details.appendChild(titre)
        details.appendChild(likesNumber)

        // On insère les données
        titre.textContent = title
        titre.setAttribute("tabindex", `${tabIndex}`)
        likesNumber.setAttribute("class", "a b")
        likesNumber.setAttribute("tabindex", `${tabIndex}`)
        likesNumber.innerHTML = `${likes} <svg role="img" aria-label="likes" : focusable="false" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        </svg>`

        function getUrlPhoto(url, urlVideo, gallery) {
            const element = insertDomLightbox(url, urlVideo, gallery)

            document.body.appendChild(element)
        }
        function insertDomLightbox(url, urlVideo, gallery) {
            const testImage = /(?:jpg)$|(?:png)$/g
            const lightbox = document.querySelector(".lightbox")
            lightbox.style.display = "block"
            const picture = document.querySelector(".lightbox .lightbox_container img")
            const video = document.querySelector(".lightbox .lightbox_container video")
            const titleLightbox = document.querySelector(".title_lightbox")



            if (testImage.test(url)) {
                // Si il y a une image (test avec cette regex : (?:jpg)$|(?:png)$) ) on créé une image
                video.style.display = "none"
                video.src = ""
                picture.style.display = "block"
                picture.src = url
                picture.id = id
                titleLightbox.innerHTML = title
            }
            else {
                picture.src = ""
                picture.style.display = "none"
                video.style.display = "block"
                video.src = urlVideo
                video.id = id
                titleLightbox.innerHTML = title

            }
            let currentIndex = gallery.findIndex(imageSrc => imageSrc.url === url || imageSrc.url === urlVideo)
            console.log(currentIndex)
            console.log(testImage.test(picture.src))
            // On ajoute un écouteur d'évènement sur l'élément close qui va fermer la lightbox au click
            lightbox.querySelector(".lightbox_close").addEventListener("click", e => {
                lightbox.style.display = "none"
            })
            window.addEventListener("keydown", (event) => {
                switch (event.key) {
                    case "Escape":
                        lightbox.style.display = "none"
                        break;

                    case "ArrowRight":
                        goToNext()
                        break;

                    case "ArrowLeft":
                        goToPrev()
                        break;
                }
                if (event.key === "Escape") {

                }
            })
            // Navigation de la lightbox
            lightbox.querySelector(".lightbox_next").addEventListener("click", e => {
                goToNext()

            })
            function goToNext() {

                if (currentIndex == gallery.length - 1) {
                    currentIndex = 0;
                    titleLightbox.innerHTML = ""
                    titleLightbox.innerHTML = gallery[currentIndex].title
                    picture.src = gallery[currentIndex].url

                }
                else {
                    picture.src = gallery[currentIndex + 1].url
                    titleLightbox.innerHTML = ""
                    titleLightbox.innerHTML = gallery[currentIndex + 1].title
                    currentIndex += 1
                }

                if (testImage.test(gallery[currentIndex].url)) {
                    video.src = ""
                    video.style.display = "none"
                    picture.style.display = "flex"
                    picture.src = gallery[currentIndex].url
                }
                else if (testImage.test(gallery[currentIndex].url) === false) {
                    picture.style.display = "none"
                    video.style.display = "flex"
                    video.src = gallery[currentIndex].url
                }
            }
            function goToPrev() {
                if (currentIndex == 0) {
                    currentIndex = gallery.length - 1
                    titleLightbox.innerHTML = ""
                    titleLightbox.innerHTML = gallery[currentIndex].title
                    picture.src = gallery[currentIndex].url
                }
                else {
                    picture.src = gallery[currentIndex - 1].url
                    titleLightbox.innerHTML = ""
                    titleLightbox.innerHTML = gallery[currentIndex - 1].title
                    currentIndex -= 1
                }


                if (testImage.test(gallery[currentIndex].url)) {
                    video.src = ""
                    video.style.display = "none"
                    picture.style.display = "flex"
                    picture.src = gallery[currentIndex].url
                }
                else if (testImage.test(gallery[currentIndex].url) === false) {
                    picture.style.display = "none"
                    video.style.display = "flex"
                    video.src = gallery[currentIndex].url

                }
                if (currentIndex < 0) {
                    currentIndex = gallery.length - 1
                    video.src = ""
                    video.style.display = "none"
                    picture.style.display = "flex"
                    picture.src = gallery[currentIndex].url
                }
            }
            lightbox.querySelector(".lightbox_prev").addEventListener("click", e => {
                goToPrev()
            })
            return lightbox
        }
        //Quand on appuie sur la touche enter sur une image ou une vidéo, on ouvre la lightbox.
        container.querySelector("img, video").addEventListener("keydown", (touche) => {
            if (touche.key === "Enter") {
                getUrlPhoto(photoMedia, videoMedia, gallery)
            }
        })
        //Quand on clique sur une image ou une vidéo on ouvre la lightbox.
        container.querySelector("img, video").addEventListener("click", (e) => {

            e.preventDefault()
            getUrlPhoto(photoMedia, videoMedia, gallery)
        }

        )
        return container
    }
    return { getUserMediaDOM }

}