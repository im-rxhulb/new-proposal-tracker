// Shared proposal data used by the dashboard, table, form and reminders.
export let proposals = [
    {
        project: "Website Redesign",
        client: "Nova Studio",
        deadline: "2026-11-12",
        value: 25000,
        id: 1,
        status: "Sent",
        follow: "2026-11-09",
        notes: "Waiting for client response."
    },
    {
        project: "Brand Identity",
        client: "Pixel Works",
        deadline: "2026-11-15",
        value: 18000,
        id: 2,
        status: "Follow-up",
        follow: "2026-11-08",
        notes: "Share the revised design."
    },
    {
        project: "E-commerce Website",
        client: "Urban Cart",
        deadline: "2026-11-20",
        value: 22000,
        id: 3,
        status: "Won",
        follow: "2026-11-10",
        notes: "Project approved by client."
    },
    {
        project: "Social Media Designs",
        client: "Bloom Cafe",
        deadline: "2026-11-18",
        value: 7000,
        id: 4,
        status: "Draft",
        follow: "2026-11-13",
        notes: "Prepare proposal document."
    }
];

let nextProposalId = 5;
const subscribers = new Set();

export function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
}

function notify() {
    subscribers.forEach(callback => callback(proposals));
}

export function addProposal(details) {
    proposals.push({ ...details, id: nextProposalId++ });
    notify();
}

export function deleteProposal(id) {
    proposals = proposals.filter(proposal => proposal.id !== id);
    notify();
}

export function changeProposalStatus(id) {
    const proposal = proposals.find(item => item.id === id);
    if (!proposal) return;

    const statuses = ["Draft", "Sent", "Follow-up", "Won", "Lost"];
    const currentIndex = statuses.indexOf(proposal.status);
    proposal.status = statuses[(currentIndex + 1) % statuses.length];
    notify();
}
