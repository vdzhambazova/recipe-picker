import * as controllers from "../controllers";
import { State } from "../state";
import { elements } from "../views"

const state = new State();
window.state = state;

export const initListeners = () => {
    // Handle load
    window.addEventListener('load', () => {
        controllers.recipeListController(state);
        controllers.recipeContentController(state);
    });

    // Handle hash change
    window.addEventListener("hashchange", () => controllers.recipeContentController(state));

    // Handle submit
    elements.recipeForm.addEventListener("submit", e => {
        e.preventDefault();
        controllers.recipeFormController(state);
    });

    // Handle tag clicks
    elements.tagsPickFrom.addEventListener("click", event => controllers.tagsController(state, event));

    // Handle pagination
    elements.resultPages.addEventListener("click", e => {
        const btn = e.target.closest(".btn-inline");
        if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            controllers.recipeListController(state, goToPage);
        }
    });
}
