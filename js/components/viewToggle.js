/**
 * js/components/viewToggle.js
 * Generates a desktop/mobile layout toggle button.
 * Automatically defaults mobile screens to show only today's plan.
 * Exports exactly one function matching the filename.
 */
import { scheduleView } from "./scheduleView.js";

export function viewToggle() {
  const targetSelector = "#app-header";
  
  // 1. PHASE 2 AUTO-DETECT: Default mobile phone views to isolated mode automatically
  if (window.DATA.isIsolatedView === undefined) {
    const isMobileScreen = window.innerWidth <= 768;
    window.DATA.isIsolatedView = isMobileScreen; 
    console.log(`Auto-detection: Initialized isolated view to ${window.DATA.isIsolatedView}`);
  }

  // 2. Remove previous rendering if re-drawing
  $(".view-toggle-container").remove();

  // 3. Create the toggle bar using your dom.create engine
  const toggleContainer = dom.create("view-toggle-container", targetSelector);
  const labelText = window.DATA.isIsolatedView ? "📅 Show Full 14-Day Menu" : "📱 Show Only Today's Plan";

  dom.create("view-toggle-btn", toggleContainer, {
    tag: "button",
    text: labelText,
    attr: { type: "button" },
    on: {
      click: function() {
        window.DATA.isIsolatedView = !window.DATA.isIsolatedView;
        viewToggle();
        scheduleView();
      }
    }
  });
}
