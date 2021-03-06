import * as views from "../views";

export const recipeContentController = (state) => {
    const recipe = getCurrentRecipeFromHash(state) || state.currentRecipe;
    renderRecipeContent(recipe, state);
}

const renderRecipeContent = (recipe, state) => {
    // 1. Prepare UI 
    views.clearRecipe();
    if (state.allRecipes.length > 0) views.highlightSelected(recipe.id);

    // 2. Render recipe
    recipe && views.renderRecipe(recipe);
}

const getCurrentRecipeFromHash = (state) => {
    // 1. Get Id from URL
    const id = window.location.hash.replace("#", "");
    
    // 2. Set current recipe
    if (id) state.currentRecipe = state.allRecipes.recipes.find(r => r.id === id);
    return state.currentRecipe;
}