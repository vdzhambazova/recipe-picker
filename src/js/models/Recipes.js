import uniqid from "uniqid";

export class Recipes {
    constructor() {
        this.recipes = [];
    }

    addRecipe(title, prepTime, servingsCount, ingredients, directions, tags, isDraft = false) {
        const recipe = { id: uniqid(), title, prepTime, servingsCount, ingredients, directions, tags, isDraft };
        this.recipes.push(recipe);

        this.persistData();

        return recipe;
    }

    deleteRecipe(id) {
        const index = this.recipes.findIndex(el => el.id === id);
        this.recipes.splice(index, 1);

        this.persistData();
    }

    toggleDraftStatus(id) {
        const recipe = this.recipes.find(el => el.id === id);
        if (recipe) {
            recipe.isDraft = !recipe.isDraft;
            this.persistData();
        }
    }

    getPublishedRecipes() {
        return this.recipes.filter(recipe => !recipe.isDraft);
    }

    persistData() {
        localStorage.setItem("recipes", JSON.stringify(this.recipes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem("recipes"));
        if (storage) this.recipes = storage;
    }
}
