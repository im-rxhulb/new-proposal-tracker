import { addProposal } from "../data.js";

export function initProposalForm() {
    const form = document.getElementById("proposalForm");

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const amount = Number(document.getElementById("projectValue").value);
        if (!Number.isFinite(amount) || amount <= 0) return;

        addProposal({
            project: document.getElementById("projectName").value.trim(),
            client: document.getElementById("clientName").value.trim(),
            deadline: document.getElementById("deadline").value,
            value: amount,
            status: document.getElementById("proposalStatus").value,
            follow: document.getElementById("followDate").value,
            notes: document.getElementById("proposalNotes").value.trim()
        });

        form.reset();
        document.getElementById("resultMessage").textContent =
            "Your opportunity has been added successfully!";
    });
}
