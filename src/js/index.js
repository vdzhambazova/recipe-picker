import { elements } from "./views/base";
import Recipes from "./models/Recipes";
import * as recipeFormView from "./views/recipeFormView";
import * as recipeListView from "./views/recipeListView";
import * as recipeContentView from "./views/recipeContentView";

/** Global state of the app
 * - All Recipes List
 * - Selected Recipes List
 * - Current recipe
 * - All Tags
 * - Selected Tags
 */

const state = {};

const recipeFormController = () => {
    // 1. Get input
    // const title = "Мусака";
    // const prepTime = "45 минути";
    // const portionsCount = "4 порции";

    const title = recipeFormView.getTitleInput();
    const prepTime = recipeFormView.getPrepTimeInput();
    const servingsCount = recipeFormView.getServingsInput();
    const ingredients = recipeFormView.getIngredientsInput();
    const description = recipeFormView.getDescriptionInput();
    const tags = recipeFormView.getTagsInput();

    // 3. Add to state
    if (title
        && prepTime
        && servingsCount
        && ingredients.length > 0
        && description
        && tags.length > 0) {
        recipeFormView.clearInput();
        recipeListView.clearResults();
        state.allRecipes.addRecipe(
            title,
            prepTime,
            servingsCount,
            ingredients,
            description,
            tags)

    } else {
        alert("Fill all form fields!")
    }

    // 3. Save to storage and render
    recipeListView.renderRecipes(state.allRecipes.recipes);
    console.log(state.allRecipes.recipes);
}

elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        recipeListView.clearResults();
        recipeListView.renderRecipes(state.allRecipes.recipes, goToPage)
    }
});

elements.recipeForm.addEventListener("submit", e => {
    e.preventDefault();
    recipeFormController();
});

const recipeContentController = () => {
    //Get Id from URL
    const id = window.location.hash.replace("#", "");
    if (id) {
        //Prepare UI for changes
        recipeContentView.clearRecipe();

        //hilight selected 
        if (state.allRecipes) recipeListView.highlightSelected(id)

        //Create new recipe object
        state.recipe = new Recipe(id);

        try {
            //Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch (err) {
            console.log(err)
            alert("Error proccesing recipe");
        }
    }

}

["hashchange", "load"].forEach(event => window.addEventListener(event, showRecipeController));


window.addEventListener('load', () => {
    // 1. Get init state

    //all recipes
    state.allRecipes = new Recipes();
    state.allRecipes.readStorage();

    //all tags
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

    //selected recipes
    state.selectedRecipes = [];

    //selected tags
    state.selectedTags = [];

    //current recipe
    if (state.allRecipes.recipes.length > 0) {
        state.currentRecipe = state.allRecipes.recipes[0]
    }

    // Render the existing recipes
    recipeListView.renderRecipes(state.allRecipes.recipes);
    console.log(state.allRecipes.recipes);
});

