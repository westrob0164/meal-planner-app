/**
 * js/components/viewToggle.js
 * Generates a desktop/mobile layout toggle button and displays meta debugging info.
 * Exports exactly one function matching the filename.
 */
import { scheduleView } from "./scheduleView.js";

export function viewToggle() {
  const targetSelector = "#app-header";
  
  // 1. PHASE 2 AUTO-DETECT: Check screen boundaries or touch capabilities
  if (window.DATA.isIsolatedView === undefined) {
    const isMobileScreen = window.innerWidth <= 768;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    window.DATA.isIsolatedView = (isMobileScreen || isTouchDevice); 
  }

  // 2. Clear out any previous renderings of the buttons and debug boxes
  $(".view-toggle-container").remove();
  $(".meta-debug-banner").remove();

  // 3. 🚀 DEBUGGING OVERRIDE: Read the raw meta line from the head and show it on the page
  const metaTag = $('meta[name="viewport"]');
  const metaContentString = metaTag.length ? metaTag.attr('content') : "🚨 META VIEWPORT TAG NOT FOUND!";
  
  // Inject a high-visibility information bar at the top
  const debugBanner = dom.create("meta-debug-banner", targetSelector, {
    style: "background: #0f172a; color: #38bdf8; padding: 10px; font-family: monospace; font-size: 11px; border-radius: 4px; margin-bottom: 10px; word-break: break-all;"
  });
  
  dom.create("debug-text-line", debugBanner, {
    tag: "div",
    html: `<strong>Active Viewport Meta read by Phone:</strong><br>${metaContentString}`
  });

  dom.create("debug-screen-line", debugBanner, {
    tag: "div",
    html: `<strong>Internal Browser Screen Width:</strong> ${window.innerWidth}px | <strong>Mode:</strong> ${window.DATA.isIsolatedView ? "Single Day" : "Full 14-Day"}`
  });

  // 4. Create the standard layout toggle buttons
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

