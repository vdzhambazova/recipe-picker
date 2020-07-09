import * as views from "../views";

export const recipeListController = (state, goToPage) => {
    // 1. Prepare UI
    views.clearResults();
    
    // 2. Render recipe list
    views.renderRecipes(state.allRecipes.recipes, goToPage);
}
