import { Recipes } from "../models";

/** Set global state of the app
 * - All Recipes List
 * - Selected Recipes List
 * - Current recipe
 * - All Tags
 * - Selected Tags
 */
export class State {
    constructor() {
        this.allRecipes = new Recipes();
        this.allRecipes.readStorage();

        this.allTags = [
            "Dinner",
            "Breakfast",
            "Brunch",
            "Summer",
            "Junk",
            "Meat",
            "Healthy",
            "Veggie",
            "Dessert"];

        this.selectedRecipes = [];
        this.selectedTags = [];
    }
}