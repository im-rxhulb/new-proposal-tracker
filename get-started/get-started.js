export function initGetStarted() {
    const button = document.querySelector(".get-started-button");

    button.addEventListener("click", () => {
        document.getElementById("overview")?.scrollIntoView({
            behavior: "smooth"
        });
    });
}
