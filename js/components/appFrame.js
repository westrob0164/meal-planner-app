/**
 * js/components/appFrame.js
 * Builds the structural master layout containers for the Phase 2 Meal Planner.
 * Exports exactly one function matching the filename.
 */
export function appFrame() {
  const appRoot = document.body;
  if (!appRoot) return;

  // 1. Create Main Application Header
  const header = dom.create("app-main-header", appRoot, { 
    tag: "header", 
    id: "app-header" 
  });
  
  dom.create("app-main-title", header, { 
    tag: "h1", 
    text: "Heart-Healthy 14-Day Planner (Desktop Mode)" 
  });

  // 2. Create the Grid Workspace Layout (Adjusted for Sidebar)
  const workspace = dom.create("app-grid-workspace", appRoot, { 
    id: "app-workspace" 
  });

  // PHASE 2 NEW: Create the Left-Hand Master Meal Pillbox Panel
  dom.create("master-pillbox-panel", workspace, {
    tag: "section",
    id: "meal-pillbox-view"
  });

  // Right-hand workspace container for schedules and lists
  const mainContent = dom.create("main-content-area", workspace, {
    id: "main-content-area"
  });

  // Place schedule and shopping views inside the main content area
  dom.create("menu-schedule-panel", mainContent, { 
    tag: "section", 
    id: "menu-schedule-view" 
  });
  
  dom.create("shopping-list-panel", mainContent, { 
    tag: "section", 
    id: "shopping-list-view" 
  });
}
