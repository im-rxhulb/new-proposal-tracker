const componentFiles = [
    ["navbar-root", "navbar/navbar.html"],
    ["hero-banner-root", "hero-banner/hero-banner.html"],
    ["get-started-root", "get-started/get-started.html"],
    ["dashboard-section-root", "dashboard-section/dashboard-section.html"],
    ["stat-total-root", "stat-total/stat-total.html"],
    ["stat-sent-root", "stat-sent/stat-sent.html"],
    ["stat-won-root", "stat-won/stat-won.html"],
    ["stat-value-root", "stat-value/stat-value.html"],
    ["opportunity-tracker-root", "opportunity-tracker/opportunity-tracker.html"],
    ["tracker-toolbar-root", "tracker-toolbar/tracker-toolbar.html"],
    ["proposal-table-root", "proposal-table/proposal-table.html"],
    ["proposal-form-root", "proposal-form/proposal-form.html"],
    ["follow-up-reminders-root", "follow-up-reminders/follow-up-reminders.html"],
    ["quick-tip-root", "quick-tip/quick-tip.html"],
    ["footer-root", "footer/footer.html"]
];

async function loadComponent(elementId, filePath) {
    const response = await fetch(filePath);

    if (!response.ok) {
        throw new Error(`Could not load ${filePath}`);
    }

    document.getElementById(elementId).innerHTML = await response.text();
}

async function startFreelanceFlow() {
    try {
        await Promise.all(
            componentFiles.map(([elementId, filePath]) =>
                loadComponent(elementId, filePath)
            )
        );

        const modules = [
            ["navbar", "initNavbar"],
            ["hero-banner", "initHeroBanner"],
            ["get-started", "initGetStarted"],
            ["dashboard-section", "initDashboardSection"],
            ["stat-total", "initStatTotal"],
            ["stat-sent", "initStatSent"],
            ["stat-won", "initStatWon"],
            ["stat-value", "initStatValue"],
            ["opportunity-tracker", "initOpportunityTracker"],
            ["tracker-toolbar", "initTrackerToolbar"],
            ["proposal-table", "initProposalTable"],
            ["proposal-form", "initProposalForm"],
            ["follow-up-reminders", "initFollowUpReminders"],
            ["quick-tip", "initQuickTip"],
            ["footer", "initFooter"]
        ];

        for (const [folder, initName] of modules) {
            const module = await import(`../${folder}/${folder}.js`);
            module[initName]();
        }

        const dashboard = await import("../js/dashboard.js");
        dashboard.initDashboard();
    } catch (error) {
        console.error("Freelance Flow failed to load:", error);
        document.body.insertAdjacentHTML(
            "afterbegin",
            '<p class="load-error">Please run this project using VS Code Live Server.</p>'
        );
    }
}

startFreelanceFlow();
