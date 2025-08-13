const delay = ms => new Promise(res => setTimeout(res, ms));

const animesGenres = [
    {
        dataValue: '129-Girls-Love',
        englishName: 'Girls Love',
        russianName: 'Сёдзё-ай'
    },
    {
        dataValue: '133-Boys-Love',
        englishName: 'Boys Love',
        russianName: 'Сёнен-ай'
    }
];

const mangasGenres = [
    {
        dataValue: '170-Girls-Love',
        englishName: 'Girls Love',
        russianName: 'Сёдзё-ай'
    },
    {
        dataValue: '165-Boys-Love',
        englishName: 'Boys Love',
        russianName: 'Сёнен-ай'
    }
];

async function loadGenres(genres) {
    await delay(1500)

    const isAlreadyGenerated = document
        .getElementsByClassName('genre-generated')
        .length !== 0

    if (isAlreadyGenerated) {
        return
    }

    const genreList = document.getElementsByClassName('b-block_list genres_v2 anime-params m10')[0]

    for (let genre of genres) {
        const newLi = document.createElement('li')
        newLi.setAttribute('data-field', 'genre')
        newLi.setAttribute('data-value', genre.dataValue)
        newLi.setAttribute('class', 'genre-generated')

        const newInput = document.createElement('input')
        newInput.setAttribute('autocomplete', 'off')
        newInput.setAttribute('type', 'checkbox')

        const newEnSpan = document.createElement('span')
        newEnSpan.setAttribute('class', 'genre-en')
        newEnSpan.textContent = genre.englishName

        const newRuSpan = document.createElement('span')
        newRuSpan.setAttribute('class', 'genre-ru')
        newRuSpan.textContent = genre.russianName

        const infoSpan = document.getElementsByClassName('b-question mobile bubbled-processed')[0]
        const newInfoSpan = infoSpan.cloneNode(true)
        newInfoSpan.setAttribute(
            'data-href',
            `https://shikimori.one/moderations/genre_v2s/${genre.dataValue}/tooltip`
        )

        newLi.appendChild(newInput)
        newLi.appendChild(newEnSpan)
        newLi.appendChild(newRuSpan)
        newLi.appendChild(newInfoSpan)

        genreList.appendChild(newLi)
    }
}

async function checkPage() {
    let currentUrl = window.location.href

    if (currentUrl.includes('genres')) {
        return
    }

    if (currentUrl.includes('animes')) {
        await loadGenres(animesGenres)
    }

    if (currentUrl.includes('mangas')) {
        await loadGenres(mangasGenres)
    }
}

(function () {
    const pushState = history.pushState;
    const replaceState = history.replaceState;
    history.pushState = function () {
        pushState.apply(history, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
    };
    history.replaceState = function () {
        replaceState.apply(history, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
    };
    window.addEventListener('popstate', function () {
        window.dispatchEvent(new Event('locationchange'))
    });
})();

window.addEventListener('locationchange', async () => await checkPage())

//on load
await checkPage()