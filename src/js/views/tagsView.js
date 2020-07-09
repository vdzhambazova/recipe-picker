export const toggleSelectTag = (btn, isActive) => {
    isActive ? btn.classList.remove("tags__pick--active") : btn.classList.add("tags__pick--active")
}