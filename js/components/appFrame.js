/**
 * js/components/appFrame.js
 * Builds the structural master layout containers for the Meal Planner.
 * Exports exactly one function matching the filename.
 */
export function appFrame() {
  // Grab your structural target entry node
  const appRoot = document.body;
  if (!appRoot) return;

  // 1. Create Main Application Header
  // Syntax: dom.create(className, appendTo, options)
  const header = dom.create("app-main-header", appRoot, { 
    tag: "header", 
    id: "app-header" 
  });
  
  dom.create("app-main-title", header, { 
    tag: "h1", 
    text: "Heart-Healthy 14-Day Meal Planner" 
  });

  // 2. Create the Grid Workspace Layout
  const workspace = dom.create("app-grid-workspace", appRoot, { 
    id: "app-workspace" 
  });

  // 3. Create individual target panels inside workspace for other components
  dom.create("menu-schedule-panel", workspace, { 
    tag: "section", 
    id: "menu-schedule-view" 
  });
  
  dom.create("daily-prep-panel", workspace, { 
    tag: "section", 
    id: "daily-prep-view" 
  });
  
  dom.create("shopping-list-panel", workspace, { 
    tag: "section", 
    id: "shopping-list-view" 
  });
}
