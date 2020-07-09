import * as views from "../views";

export const recipeListController = (state, goToPage) => {
    // 1. Prepare UI
    views.clearResults();

    // 2. Render recipe list
    state.selectedRecipes.length > 0 || state.selectedTags.length > 0
        ? views.renderRecipes(state.selectedRecipes, goToPage)
        : views.renderRecipes(state.allRecipes.recipes, goToPage)
}
