import { elements } from "./base";

export const clearRecipe = () => {
    elements.recipe.innerHTML = "";
}

export const renderRecipe = (recipe) => {
    const markup = `
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
        <div class="recipe__details">
            <div class="recipe__info">
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.prepTime}</span>
            </div>
            <div class="recipe__info">
                <span class="recipe__info-data recipe__info-data--people">${recipe.servingsCount}</span>
            </div>
        </div>

    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(i => createIngredient(i)).join("")}
        </ul>
    </div>
    <div class="recipe__directions">
        <h2 class="heading-2">Как да приготвим:</h2>
            <p class="recipe__directions-text">
                ${recipe.directions}
            </p>
    </div>`

    elements.recipe.insertAdjacentHTML("afterbegin", markup);
}

const createIngredient = ingredient => `
    <li class="recipe__item">
        <div class="recipe__ingredient">${ingredient}</div>
    </li>`;