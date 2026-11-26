/tracker toolbar js/ 
export function initTrackerToolbar() {
    const search = document.getElementById("searchText");
    const button = document.getElementById("searchButton");

    button.addEventListener("click", () => {
        search.dispatchEvent(new Event("input", { bubbles: true }));
    });
}
