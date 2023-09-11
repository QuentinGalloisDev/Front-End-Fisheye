async function getPhotographers() {


    let response = await fetch("././data/photographers.json")
    let { photographers } = await response.json()


    return ({
        photographers: [...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    let tabIndex = 3
    photographers.forEach((photographer) => {
        tabIndex += 1
        const photographerModel = photographerTemplate(photographer, tabIndex);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

