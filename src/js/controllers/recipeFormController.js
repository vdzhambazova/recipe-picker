import * as views from "../views";
import { recipeListController } from "../controllers";

export const recipeFormController = (state) => {
    // 1. Get input
    const title = views.getTitleInput();
    const prepTime = views.getPrepTimeInput();
    const servingsCount = views.getServingsInput();
    const ingredients = views.getIngredientsInput();
    const directions = views.getDirectionsInput();
    const tags = views.getTagsInput();

    // 2. Set State
    if (title
        && prepTime
        && servingsCount
        && ingredients.length > 0
        && directions
        && tags.length > 0) {
        views.clearInput();
        views.clearResults();
        state.allRecipes.addRecipe(
            title,
            prepTime,
            servingsCount,
            ingredients,
            directions,
            tags);

    } else {
        alert("Fill all form fields!");
    }

    // 3. Call recipe list controller
    recipeListController(state);
}