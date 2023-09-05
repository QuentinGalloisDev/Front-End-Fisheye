//Mettre le code JavaScript lié à la page photographer.html


// Récupérer le tableau des photographes
async function getPromesse() {
    // let params = (new URL(document.location)).searchParams
    // let id = params.get('id')
    let response = await fetch("././data/photographers.json")
    let photographers = await response.json()
    photographers = photographers.photographers

    // let photographe = photographers.find(element => element.id == id)
    return ({ photographers })
    // return ({
    //     photographers: [...photographers]
    // })
}
async function getMedia() {
    let responseMedia = await fetch("././data/photographers.json")
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
async function getGallery(photographe) {
    const { medias } = await getMedia()
    const id = getId()
    const mediaPhotographe = medias.filter(media => parseInt(media.photographerId) === parseInt(id))
    const gallery = mediaPhotographe.map(src => {
        {
            if (src.image) { return { url: `assets/photographers/${photographe.name}/${src.image}`, title: src.title } }
            else { return { url: `assets/photographers/${photographe.name}/${src.video}`, title: src.title } }
        }
    })
    return gallery
}
let heartSvg = `<svg role="img" aria-label="likes" : focusable="false" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        </svg>`

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
    likes.innerHTML = `${total} ${heartSvg} `
    price.textContent = `${artist.price}€/Jour`

    // On met les tabIndex
    name.setAttribute("tabindex", "2")
    paragraphLocation.setAttribute("tabindex", "3")
    paragraphTagline.setAttribute("tabindex", "4")
    button.setAttribute("tabindex", "5")
    img.setAttribute("tabindex", "6")
    likes.setAttribute("tabindex", "7")
    price.setAttribute("tabindex", "8")

}
async function createMediaDisplay(medias, photographName, gallery, tabIndex) {
    const main = document.querySelector("#main")
    const mainContainerMedia = document.createElement("div")
    mainContainerMedia.setAttribute("class", "main_container_media")
    tabIndex = 10
    medias.forEach(media => {
        const mediaModel = mediaTemplate(media, photographName, gallery, tabIndex)
        tabIndex += 1
        const mediaDisplayDom = mediaModel.getUserMediaDOM()
        main.appendChild(mainContainerMedia)
        mainContainerMedia.appendChild(mediaDisplayDom)
    });
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
                e.innerHTML = `${numberLikesMediaNoHeart + 1} ${heartSvg}`
                sumLikes.innerHTML = ""
                sumLikesInt += 1
                sumLikes.innerHTML = `${sumLikesInt} ${heartSvg}`
            }
            else {
                e.innerHTML = ""
                e.innerHTML = `${numberLikesMediaNoHeart} ${heartSvg}`
                sumLikes.innerHTML = ""
                sumLikesInt -= 1
                sumLikes.innerHTML = `${sumLikesInt} ${heartSvg}`
            }
        })


        e.addEventListener("keydown", (element) => {
            if (element.key == "Enter") {
                let result = classes.toggle("c");
                if (result) {
                    e.innerHTML = ""
                    e.innerHTML = `${numberLikesMediaNoHeart + 1} ${heartSvg}`
                    sumLikes.innerHTML = ""
                    sumLikesInt += 1
                    sumLikes.innerHTML = `${sumLikesInt} ${heartSvg}`
                }
                else {
                    e.innerHTML = ""
                    e.innerHTML = `${numberLikesMediaNoHeart} ${heartSvg}`
                    sumLikes.innerHTML = ""
                    sumLikesInt -= 1
                    sumLikes.innerHTML = `${sumLikesInt} ${heartSvg}`
                }
            }
        })




    })

}
async function displayPhotographe(gallery, tabIndex) {
    const { photographe } = await getPhotographer()
    const mediaPhotographe = await getMediaPhotographe()
    gallery = await getGallery(photographe)
    createPhotographerDisplay(photographe, mediaPhotographe)

    createMediaDisplay(mediaPhotographe, photographe.name, gallery, tabIndex)

    //On récupére les photos de l'objet mediaPhotographe
    console.log(mediaPhotographe)

    //SI ça finis par jpg retourn l'url de l'image sinon retourne l'url de la video
    const testIfImage = /(?:jpg)$|(?:png)$/g

    console.log(gallery)




    // test patterns tri

    const SelectActions = {
        Close: 0,
        CloseSelect: 1,
        First: 2,
        Last: 3,
        Next: 4,
        Open: 5,
        PageDown: 6,
        PageUp: 7,
        Previous: 8,
        Select: 9,
        Type: 10,
    };

    /*
     * Helper functions
     */

    // filter an array of options against an input string
    // returns an array of options that begin with the filter string, case-independent
    function filterOptions(options = [], filter, exclude = []) {
        return options.filter((option) => {
            const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
            return matches && exclude.indexOf(option) < 0;
        });
    }

    // map a key press to an action
    function getActionFromKey(event, menuOpen) {
        const { key, altKey, ctrlKey, metaKey } = event;
        const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
        // handle opening when closed
        if (!menuOpen && openKeys.includes(key)) {
            return SelectActions.Open;
        }

        // home and end move the selected option when open or closed
        if (key === 'Home') {
            return SelectActions.First;
        }
        if (key === 'End') {
            return SelectActions.Last;
        }

        // handle typing characters when open or closed
        if (
            key === 'Backspace' ||
            key === 'Clear' ||
            (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
        ) {
            return SelectActions.Type;
        }

        // handle keys when open
        if (menuOpen) {
            if (key === 'ArrowUp' && altKey) {
                return SelectActions.CloseSelect;
            } else if (key === 'ArrowDown' && !altKey) {
                return SelectActions.Next;
            } else if (key === 'ArrowUp') {
                return SelectActions.Previous;
            } else if (key === 'PageUp') {
                return SelectActions.PageUp;
            } else if (key === 'PageDown') {
                return SelectActions.PageDown;
            } else if (key === 'Escape') {
                return SelectActions.Close;
            } else if (key === 'Enter' || key === ' ') {
                return SelectActions.CloseSelect;
            }
        }
    }

    // return the index of an option from an array of options, based on a search string
    // if the filter is multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
    function getIndexByLetter(options, filter, startIndex = 0) {
        const orderedOptions = [
            ...options.slice(startIndex),
            ...options.slice(0, startIndex),
        ];
        const firstMatch = filterOptions(orderedOptions, filter)[0];
        const allSameLetter = (array) => array.every((letter) => letter === array[0]);

        // first check if there is an exact match for the typed string
        if (firstMatch) {
            return options.indexOf(firstMatch);
        }

        // if the same letter is being repeated, cycle through first-letter matches
        else if (allSameLetter(filter.split(''))) {
            const matches = filterOptions(orderedOptions, filter[0]);
            return options.indexOf(matches[0]);
        }

        // if no matches, return -1
        else {
            return -1;
        }
    }

    // get an updated option index after performing an action
    function getUpdatedIndex(currentIndex, maxIndex, action) {
        const pageSize = 10; // used for pageup/pagedown

        switch (action) {
            case SelectActions.First:
                return 0;
            case SelectActions.Last:
                return maxIndex;
            case SelectActions.Previous:
                return Math.max(0, currentIndex - 1);
            case SelectActions.Next:
                return Math.min(maxIndex, currentIndex + 1);
            case SelectActions.PageUp:
                return Math.max(0, currentIndex - pageSize);
            case SelectActions.PageDown:
                return Math.min(maxIndex, currentIndex + pageSize);
            default:
                return currentIndex;
        }
    }

    // check if element is visible in browser view port
    function isElementInView(element) {
        var bounding = element.getBoundingClientRect();

        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // check if an element is currently scrollable
    function isScrollable(element) {
        return element && element.clientHeight < element.scrollHeight;
    }

    // ensure a given child element is within the parent's visible scroll area
    // if the child is not visible, scroll the parent
    function maintainScrollVisibility(activeElement, scrollParent) {
        const { offsetHeight, offsetTop } = activeElement;
        const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

        const isAbove = offsetTop < scrollTop;
        const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

        if (isAbove) {
            scrollParent.scrollTo(0, offsetTop);
        } else if (isBelow) {
            scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
        }
    }

    /*
     * Select Component
     * Accepts a combobox element and an array of string options
     */
    const Select = function (el, options = []) {
        // element refs
        this.el = el;
        this.comboEl = el.querySelector('[role=combobox]');
        this.listboxEl = el.querySelector('[role=listbox]');

        // data
        this.idBase = this.comboEl.id || 'combo';
        this.options = options;

        // state
        this.activeIndex = 0;
        this.open = false;
        this.searchString = '';
        this.searchTimeout = null;

        // init
        if (el && this.comboEl && this.listboxEl) {
            this.init();
        }
    };

    Select.prototype.init = function () {
        // select first option by default
        this.comboEl.innerHTML = this.options[0];

        // add event listeners
        this.comboEl.addEventListener('blur', this.onComboBlur.bind(this));
        this.comboEl.addEventListener('click', this.onComboClick.bind(this));
        this.comboEl.addEventListener('keydown', this.onComboKeyDown.bind(this));

        // create options
        this.options.map((option, index) => {
            const optionEl = this.createOption(option, index);
            this.listboxEl.appendChild(optionEl);
        });
    };

    Select.prototype.createOption = function (optionText, index) {
        const optionEl = document.createElement('div');
        optionEl.setAttribute('role', 'option');
        optionEl.id = `${this.idBase}-${index}`;
        optionEl.className =
            index === 0 ? 'combo-option option-current' : 'combo-option';
        optionEl.setAttribute('aria-selected', `${index === 0}`);
        optionEl.innerText = optionText;

        optionEl.addEventListener('click', (event) => {
            event.stopPropagation();
            this.onOptionClick(index);
            let arrow = document.querySelector(".combo::after")

            console.log(optionText)
        });
        optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

        return optionEl;
    };

    Select.prototype.getSearchString = function (char) {
        // reset typing timeout and start new timeout
        // this allows us to make multiple-letter matches, like a native select
        if (typeof this.searchTimeout === 'number') {
            window.clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = window.setTimeout(() => {
            this.searchString = '';
        }, 500);

        // add most recent letter to saved search string
        this.searchString += char;
        return this.searchString;
    };

    Select.prototype.onComboBlur = function () {
        // do not do blur action if ignoreBlur flag has been set
        if (this.ignoreBlur) {
            this.ignoreBlur = false;
            return;
        }

        // select current option and close
        if (this.open) {
            this.selectOption(this.activeIndex);
            this.updateMenuState(false, false);
        }
    };

    Select.prototype.onComboClick = function () {
        this.updateMenuState(!this.open, false);
    };

    Select.prototype.onComboKeyDown = function (event) {
        const { key } = event;
        const max = this.options.length - 1;

        const action = getActionFromKey(event, this.open);

        switch (action) {
            case SelectActions.Last:
            case SelectActions.First:
                this.updateMenuState(true);
            // intentional fallthrough
            case SelectActions.Next:
            case SelectActions.Previous:
            case SelectActions.PageUp:
            case SelectActions.PageDown:
                event.preventDefault();
                return this.onOptionChange(
                    getUpdatedIndex(this.activeIndex, max, action)
                );
            case SelectActions.CloseSelect:
                event.preventDefault();
                this.selectOption(this.activeIndex);
            // intentional fallthrough
            case SelectActions.Close:
                event.preventDefault();
                return this.updateMenuState(false);
            case SelectActions.Type:
                return this.onComboType(key);
            case SelectActions.Open:
                event.preventDefault();
                return this.updateMenuState(true);
        }
    };

    Select.prototype.onComboType = function (letter) {
        // open the listbox if it is closed
        this.updateMenuState(true);

        // find the index of the first matching option
        const searchString = this.getSearchString(letter);
        const searchIndex = getIndexByLetter(
            this.options,
            searchString,
            this.activeIndex + 1
        );

        // if a match was found, go to it
        if (searchIndex >= 0) {
            this.onOptionChange(searchIndex);
        }
        // if no matches, clear the timeout and search string
        else {
            window.clearTimeout(this.searchTimeout);
            this.searchString = '';
        }
    };

    Select.prototype.onOptionChange = function (index) {
        // update state
        this.activeIndex = index;


        // update aria-activedescendant
        this.comboEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

        // update active option styles
        const options = this.el.querySelectorAll('[role=option]');
        [...options].forEach((optionEl) => {
            optionEl.classList.remove('option-current');
        });
        options[index].classList.add('option-current');

        // ensure the new option is in view
        if (isScrollable(this.listboxEl)) {
            maintainScrollVisibility(options[index], this.listboxEl);
        }

        // ensure the new option is visible on screen
        // ensure the new option is in view
        if (!isElementInView(options[index])) {
            options[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    Select.prototype.onOptionClick = function (index) {
        this.onOptionChange(index);
        this.selectOption(index);
        this.updateMenuState(false);
    };

    Select.prototype.onOptionMouseDown = function () {
        // Clicking an option will cause a blur event,
        // but we don't want to perform the default keyboard blur action
        this.ignoreBlur = true;
    };

    Select.prototype.selectOption = function (index) {
        // update state
        this.activeIndex = index;

        // update displayed value
        const selected = this.options[index];
        this.comboEl.innerHTML = selected;
        switch (selected) {
            case "Popularité":
                mediaPhotographe.sort(function (a, b) {
                    return b.likes - a.likes
                })
                mainContainerMedia = document.querySelector(".main_container_media")
                console.log(mediaPhotographe)
                mainContainerMedia.remove()
                gallery = mediaPhotographe.map(src => {
                    {
                        if (src.image) { return { url: `assets/photographers/${photographe.name}/${src.image}`, title: src.title } }
                        else { return { url: `assets/photographers/${photographe.name}/${src.video}`, title: src.title } }
                    }
                })
                createMediaDisplay(mediaPhotographe, photographe.name, gallery)

                console.log(gallery)
                break;
            case "Date":
                mediaPhotographe.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date)
                })

                mainContainerMedia = document.querySelector(".main_container_media")
                console.log(mediaPhotographe)
                mainContainerMedia.remove()
                gallery = mediaPhotographe.map(src => {
                    {
                        if (src.image) { return { url: `assets/photographers/${photographe.name}/${src.image}`, title: src.title } }
                        else { return { url: `assets/photographers/${photographe.name}/${src.video}`, title: src.title } }
                    }
                })
                createMediaDisplay(mediaPhotographe, photographe.name, gallery)

                console.log(gallery)
                break;
            case "Titre":
                mediaPhotographe.sort(function (a, b) {
                    a = a.title
                    b = b.title
                    return a.localeCompare(b);
                })
                mainContainerMedia = document.querySelector(".main_container_media")
                console.log(mediaPhotographe)
                mainContainerMedia.remove()
                gallery = mediaPhotographe.map(src => {
                    {
                        if (src.image) { return { url: `assets/photographers/${photographe.name}/${src.image}`, title: src.title } }
                        else { return { url: `assets/photographers/${photographe.name}/${src.video}`, title: src.title } }
                    }
                })
                createMediaDisplay(mediaPhotographe, photographe.name, gallery)

                console.log(gallery)
                break;
        }

        // update aria-selected
        const options = this.el.querySelectorAll('[role=option]');
        [...options].forEach((optionEl) => {
            optionEl.setAttribute('aria-selected', 'false');
        });
        options[index].setAttribute('aria-selected', 'true');
    };

    Select.prototype.updateMenuState = function (open, callFocus = true) {
        if (this.open === open) {
            return;
        }

        // update state
        this.open = open;

        // update aria-expanded and styles
        this.comboEl.setAttribute('aria-expanded', `${open}`);
        open ? this.el.classList.add('open') : this.el.classList.remove('open');

        // update activedescendant
        const activeID = open ? `${this.idBase}-${this.activeIndex}` : '';
        this.comboEl.setAttribute('aria-activedescendant', activeID);

        if (activeID === '' && !isElementInView(this.comboEl)) {
            this.comboEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // move focus back to the combobox, if needed
        callFocus && this.comboEl.focus();
    };

    // init select

    // Save a list of named combobox actions, for future readability
    const options = [
        'Popularité',
        'Titre',
        'Date',

    ];
    const selectEls = document.querySelectorAll('.js-select');

    selectEls.forEach((el) => {
        new Select(el, options);
    });
    ;

    // Création custom select.
    let mainContainerMedia = document.querySelector(".main_container_media")

}
displayPhotographe()



