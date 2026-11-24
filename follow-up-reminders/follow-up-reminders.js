import { proposals, subscribe } from "../data.js";

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

export function initFollowUpReminders() {
    const container = document.getElementById("reminderList");

    function renderReminders() {
        const pending = proposals.filter(item =>
            item.follow && item.status !== "Won" && item.status !== "Lost"
        );

        if (pending.length === 0) {
            container.innerHTML = "<p>No pending follow-ups. Add a follow-up date to an opportunity to see it here.</p>";
            return;
        }

        container.innerHTML = pending.map(item => `
            <article class="reminder">
                <span class="reminder-mark" aria-hidden="true"></span>
                <div>
                    <h3>${escapeHTML(item.client)} — ${escapeHTML(item.project)}</h3>
                    <p>Follow up: ${escapeHTML(item.follow)}</p>
                </div>
            </article>
        `).join("");
    }

    renderReminders();
    subscribe(renderReminders);
}
