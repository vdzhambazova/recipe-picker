import * as views from "../views";

export const recipeListController = (state, goToPage) => {
    // 1. Prepare UI
    views.clearResults();

    // 2. Render recipe list (only published recipes)
    const recipesToShow = state.selectedRecipes.length > 0 || state.selectedTags.length > 0
        ? state.selectedRecipes
        : state.allRecipes.getPublishedRecipes();
    
    views.renderRecipes(recipesToShow, goToPage);
}
