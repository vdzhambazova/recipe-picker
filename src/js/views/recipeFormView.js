import { elements } from "./base";

export const getTitleInput = () => elements.titleInput.value.trim();
export const getPrepTimeInput = () => elements.prepTimeInput.value.trim();
export const getServingsInput = () => elements.servingsInput.value.trim();
export const getIngredientsInput = () => elements.ingredientsInput.value.split(",")
    .map(Function.prototype.call, String.prototype.trim);
export const getDescriptionInput = () => elements.descriptionInput.value.trim();
export const getTagsInput = () => {
    const tags = []
    elements.dinnerTagInput.checked && tags.push(elements.dinnerTagInput.value);
    elements.breakfastTagInput.checked && tags.push(elements.breakfastTagInput.value);
    elements.brunchTagInput.checked && tags.push(elements.brunchTagInput.value);
    elements.summerTagInput.checked && tags.push(elements.summerTagInput.value);
    elements.veggieTagInput.checked && tags.push(elements.veggieTagInput.value);
    elements.healthyTagInput.checked && tags.push(elements.healthyTagInput.value);
    elements.meatTagInput.checked && tags.push(elements.meatTagInput.value);
    elements.junkTagInput.checked && tags.push(elements.junkTagInput.value);
    elements.dessertTagInput.checked && tags.push(elements.dessertTagInput.value);

    return tags;
}

export const clearInput = () => {
    elements.titleInput.value = "";
    elements.prepTimeInput.value = "";
    elements.servingsInput.value = "";
    elements.ingredientsInput.value = "";
    elements.descriptionInput.value = "";
    elements.dinnerTagInput.checked = false;
    elements.breakfastTagInput.checked = false;
    elements.brunchTagInput.checked = false;
    elements.summerTagInput.checked = false;
    elements.veggieTagInput.checked = false;
    elements.healthyTagInput.checked = false;
    elements.meatTagInput.checked = false;
    elements.junkTagInput.checked = false;
    elements.dessertTagInput.checked = false;
}