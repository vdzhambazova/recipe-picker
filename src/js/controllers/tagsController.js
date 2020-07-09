import * as views from "../views";
import * as controllers from "../controllers";

export const tagsController = (state, event) => {
    const btn = event.target.closest(".btn");
    if (btn) {
        // 1. Prepare UI
        views.toggleSelectTag(btn, state.selectedTags.includes(btn.value));
        
        // 2. Set State
        if (state.selectedTags.includes(btn.value)) {
            const index = state.selectedTags.indexOf(btn.value);
            state.selectedTags.splice(index, 1);
        } else {
            state.selectedTags.push(btn.value)
        }

        state.selectedRecipes = state.allRecipes.recipes
            .filter(recipe => state.selectedTags
                .every(tag => recipe.tags.includes(tag)));

        if (state.selectedRecipes.length > 0) state.currentRecipe = state.selectedRecipes[0];

        // 3. Call recipe list controller
        controllers.recipeListController(state);
        // 4. Call recipe content controller 
        controllers.recipeContentController(state);
    }
}