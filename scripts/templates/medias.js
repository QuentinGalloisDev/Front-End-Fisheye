function mediaTemplate(data, photographeName) {
    const { date, id, image, video, likes, photographerId, price, title } = data;
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
        if (data.hasOwnProperty('image')) {
            const photo = document.createElement("img")
            container.appendChild(photo)
            photo.setAttribute("src", photoMedia)
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
        return container
    }
    return { getUserMediaDOM }

}