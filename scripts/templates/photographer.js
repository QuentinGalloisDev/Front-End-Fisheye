function photographerTemplate(data, tabIndex) {
    const { name, portrait, city, country, tagline, price, id } = data;
    // On récupére les portraits des photographes dans le dossier assets
    const picture = `assets/photographers/${portrait}`;
    //On créer une fonction pour afficher les photographes sur la page d'accueil
    function getUserCardDOM() {
        //On créer les éléments dans le DOM

        const article = document.createElement('article');
        const lien = document.createElement('a')
        lien.setAttribute("tabIndex", `${tabIndex}`)
        const img = document.createElement('img');
        const paragraphLocation = document.createElement('p')
        const paragraphTagline = document.createElement('p')
        const span = document.createElement('span')
        const div = document.createElement('div')
        const h2 = document.createElement('h2');

        //Et on y insère les données
        img.setAttribute("src", picture)
        img.setAttribute("alt", `Le portrait de ${name}`)
        div.setAttribute("class", "portrait")

        h2.textContent = name;
        paragraphLocation.textContent = `${city}, ${country}`
        paragraphTagline.textContent = tagline
        span.textContent = `${price} €/jour`
        lien.href = `photographer.html?id=${id}`
        lien.setAttribute('aria-label', `Portrait de ${name}. Lien vers la page de ${name}`)

        article.appendChild(lien)
        lien.appendChild(div);
        div.appendChild(img)
        lien.appendChild(h2);
        lien.appendChild(paragraphLocation)
        lien.appendChild(paragraphTagline)
        lien.appendChild(span)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}