import { elements } from "./views/base";
import Recipes from "./models/Recipes";
import * as recipeFormView from "./views/recipeFormView";
import * as recipeListView from "./views/recipeListView";
import * as recipeContentView from "./views/recipeContentView";
import * as tagsView from "./views/tagsView";

/** State */
const state = {};
//Testing
window.state = state;

/**
 * Recipe From Controller
 */
const recipeFormController = () => {
    // 1. Get input
    const title = recipeFormView.getTitleInput();
    const prepTime = recipeFormView.getPrepTimeInput();
    const servingsCount = recipeFormView.getServingsInput();
    const ingredients = recipeFormView.getIngredientsInput();
    const directions = recipeFormView.getDirectionsInput();
    const tags = recipeFormView.getTagsInput();

    // 2. Add to state
    if (title
        && prepTime
        && servingsCount
        && ingredients.length > 0
        && directions
        && tags.length > 0) {
        recipeFormView.clearInput();
        recipeListView.clearResults();
        state.allRecipes.addRecipe(
            title,
            prepTime,
            servingsCount,
            ingredients,
            directions,
            tags)

    } else {
        alert("Fill all form fields!");
    }

    // 3. Call recipe list controller
    recipeListController();
}

/**
 * Recipe List Controller
 */
const recipeListController = (goToPage) => {
    // 1. Render recipe list
    renderRecipeList(state.allRecipes.recipes, goToPage);
}

/**
 * Recipe Content Controller
 */
const recipeContentController = (recipe) => {
    const currentRecipe = recipe || getCurrentRecipeFromHash();
    renderRecipeContent(currentRecipe);
}

/**
 * Tags Controller
 */
const tagsController = (e) => {
    const btn = e.target.closest(".btn");
    if (btn) {
        tagsView.toggleSelectTag(btn, state.selectedTags.includes(btn.value));
        if (state.selectedTags.includes(btn.value)) {
            const index = state.selectedTags.indexOf(btn.value);
            state.selectedTags.splice(index, 1);
        } else {
            state.selectedTags.push(btn.value)
        }
    }
}

/** Liseners */

/** Set global state of the app
 * - All Recipes List
 * - Selected Recipes List
 * - Current recipe
 * - All Tags
 * - Selected Tags
 */
window.addEventListener('load', () => {
    // 1. Set all recipes
    state.allRecipes = new Recipes();
    state.allRecipes.readStorage();

    // 2. Set all tags
    state.allTags = [
        "Dinner",
        "Breakfast",
        "Brunch",
        "Summer",
        "Junk",
        "Meat",
        "Healthy",
        "Veggie",
        "Dessert"];

    // 3. Set selected recipes
    state.selectedRecipes = [];

    // 4. Set selected tags
    state.selectedTags = [];

    // 5. Set current recipe
    if (state.allRecipes.recipes.length > 0) {
        state.currentRecipe = state.allRecipes.recipes[0];
        // 6. Call recipe list controller
        recipeListController();
        // 7. Call recipe content controller 
        recipeContentController(state.currentRecipe);
    }
});

// Handle hash change
window.addEventListener("hashchange", () => recipeContentController())

// Handle submit
elements.recipeForm.addEventListener("submit", e => {
    e.preventDefault();
    recipeFormController();
});

// Handle tag clicks
elements.tagsPickFrom.addEventListener("click", e => tagsController(e));

// Handle pagination
elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        recipeListView.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10);
        recipeListController(goToPage);
    }
});

const renderRecipeList = (recipes, goToPage) => {
    recipeListView.renderRecipes(recipes, goToPage);
}

const renderRecipeContent = (recipe) => {
    // 1. Prepare UI for changes
    recipeContentView.clearRecipe();
    if (state.allRecipes) recipeListView.highlightSelected(recipe.id);

    // 2. Render recipe
    recipeContentView.renderRecipe(recipe);
}

const getCurrentRecipeFromHash = () => {
    // Get Id from URL
    const id = window.location.hash.replace("#", "");
    if (id) state.currentRecipe = state.allRecipes.recipes.find(r => r.id === id);
    return state.currentRecipe;
}