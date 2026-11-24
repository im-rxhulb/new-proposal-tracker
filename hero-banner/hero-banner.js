export function initHeroBanner() {
    const bannerImage = document.querySelector(".hero-banner img");

    bannerImage.addEventListener("error", () => {
        bannerImage.alt = "Freelance Flow banner illustration is unavailable";
        bannerImage.style.display = "none";
    });
}
