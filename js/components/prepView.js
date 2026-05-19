/**
 * js/components/prepView.js
 * Renders the batch cooking and meal preparation task dashboard.
 * Exports exactly one function matching the filename.
 */
export function prepView() {
  const targetSelector = "#daily-prep-view";
  const prepTasks = window.APP_CONFIG.PREP_TASKS;

  // 1. Create the card container framework inside the workspace slot
  const prepCard = dom.create("prep-dashboard-card", targetSelector);
  
  // Header section
  dom.create("prep-card-header", prepCard, { 
    tag: "h3", 
    text: "Batch Cooking & Success Strategy" 
  });

  // 2. Loop through your structured prep routines
  prepTasks.forEach((routine) => {
    const routineBox = dom.create("prep-routine-group", prepCard);
    
    // Display the title (e.g., "Monday Morning Batch Prep")
    dom.create("routine-title", routineBox, { 
      tag: "h4", 
      text: routine.title 
    });

    // Create the task list
    const taskList = dom.create("routine-task-list", routineBox, { tag: "ul" });

    // Populate each instructional step
    routine.tasks.forEach((taskText) => {
      dom.create("routine-task-item", taskList, { 
        tag: "li", 
        text: taskText 
      });
    });
  });
}
