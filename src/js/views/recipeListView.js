import { elements } from "./base";

export const clearResults = () => {
    elements.resultList.innerHTML = ""
    elements.searchResPages.innerHTML = ""
};

export const renderRecipes = (recipes, page = 1, resPerPage = 5) => {
    // render recipes
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons 
    renderButtons(page, recipes.length, resPerPage);
}

const renderRecipe = (recipe => {
    const markup = `
        <a class="results__link results__link--active" href="#${recipe.id}">
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
            </div>
        </a>
    `

    elements.resultList.insertAdjacentHTML("beforeend", markup);
})

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, "next");
    } else if (page < pages) {
        button = `
        ${createButton(page, "prev")}
        ${createButton(page, "next")}`
    } else if (page === pages && pages > 1) {
        button = createButton(page, "prev");
    }

    button && elements.searchResPages.insertAdjacentHTML("afterbegin", button);
}

//type: prev or next
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === "prev" ? page - 1 : page + 1}">
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
    </button>`;

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};