import { proposals, subscribe } from "../shared/data.js";

export function initDashboard() {
    function updateCards() {
        const sent = proposals.filter(item =>
            item.status === "Sent" || item.status === "Follow-up"
        ).length;
        const won = proposals.filter(item => item.status === "Won").length;
        const totalValue = proposals.reduce(
            (sum, item) => sum + Number(item.value), 0
        );

        document.getElementById("totalCount").textContent = proposals.length;
        document.getElementById("sentCount").textContent = sent;
        document.getElementById("wonCount").textContent = won;
        document.getElementById("valueCount").textContent =
            "₹ " + totalValue.toLocaleString("en-IN");
    }

    updateCards();
    subscribe(updateCards);
}
