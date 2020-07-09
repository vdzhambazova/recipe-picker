import * as views from "../views";

export const tagsController = (state, event) => {
    const btn = event.target.closest(".btn");
    if (btn) {
        views.toggleSelectTag(btn, state.selectedTags.includes(btn.value));
        if (state.selectedTags.includes(btn.value)) {
            const index = state.selectedTags.indexOf(btn.value);
            state.selectedTags.splice(index, 1);
        } else {
            state.selectedTags.push(btn.value)
        }
    }
}