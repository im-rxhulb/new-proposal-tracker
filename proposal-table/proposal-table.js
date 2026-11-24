import { proposals, subscribe, deleteProposal, changeProposalStatus } from "../data.js";

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

export function initProposalTable() {
    const tableBody = document.getElementById("proposalRows");
    const searchInput = document.getElementById("searchText");
    const statusFilter = document.getElementById("statusFilter");
    const resultMessage = document.getElementById("resultMessage");

    function render(list) {
        if (list.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5">No matching proposals found.</td></tr>';
        } else {
            tableBody.innerHTML = list.map(item => {
                const statusClass = item.status === "Won" ? "status status-won"
                    : item.status === "Lost" ? "status status-lost"
                    : item.status === "Follow-up" ? "status status-follow" : "status";

                return `
                    <tr>
                        <td><strong>${escapeHTML(item.project)}</strong><br>${escapeHTML(item.client)}</td>
                        <td>${escapeHTML(item.deadline)}</td>
                        <td>₹ ${Number(item.value).toLocaleString("en-IN")}</td>
                        <td><span class="${statusClass}">${escapeHTML(item.status)}</span></td>
                        <td><div class="action-buttons">
                            <button class="small-button" data-action="status" data-id="${item.id}">Next status</button>
                            <button class="delete-button" data-action="delete" data-id="${item.id}"
                                title="Delete proposal" aria-label="Delete proposal">×</button>
                        </div></td>
                    </tr>
                    <tr class="notes-row"><td colspan="5">
                        <details class="proposal-notes">
                            <summary>View notes</summary>
                            <p>${escapeHTML(item.notes || "No notes added yet.")}</p>
                        </details>
                    </td></tr>`;
            }).join("");
        }

        resultMessage.textContent = `Showing ${list.length} proposal(s).`;
    }

    function filterProposals() {
        const query = searchInput.value.trim().toLowerCase();
        const status = statusFilter.value;
        const filtered = proposals.filter(item => {
            const textMatches = item.project.toLowerCase().includes(query)
                || item.client.toLowerCase().includes(query);
            const statusMatches = status === "All" || item.status === status;
            return textMatches && statusMatches;
        });
        render(filtered);
    }

    searchInput.addEventListener("input", filterProposals);
    statusFilter.addEventListener("change", filterProposals);

    tableBody.addEventListener("click", event => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;

        const id = Number(button.dataset.id);
        if (button.dataset.action === "delete") deleteProposal(id);
        if (button.dataset.action === "status") changeProposalStatus(id);
    });

    render(proposals);
    subscribe(filterProposals);
}
