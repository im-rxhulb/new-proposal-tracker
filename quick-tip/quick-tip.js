// quick tip js code
export function initQuickTip() {
    // This component is informational and does not need interactive behaviour.
    document.querySelector(".quick-tip-panel")
        .setAttribute("data-component-ready", "true");
}
