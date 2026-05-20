/**
 * js/components/pillboxView.js
 * Generates the master sidebar list of available heart-healthy meal pills.
 * Configures jQuery-UI clone-dragging capabilities.
 * Exports exactly one function matching the filename.
 */
export function pillboxView() {
  const targetSelector = "#meal-pillbox-view";
  const mealsLibrary = window.APP_CONFIG.MEALS;

  // Clear previous rendering and set header
  $(targetSelector).empty();
  dom.create("pillbox-header", targetSelector, { tag: "h3", text: "🍉 Master Meal Inventory" });
  dom.create("pillbox-instruction", targetSelector, { tag: "p", text: "Drag a meal pill and drop it onto a calendar slot to change your plan.", style: "font-size:12px; color:#64748b; margin-bottom:15px;" });

  const listWrapper = dom.create("pillbox-items-container", targetSelector);

  // Loop through your configuration dictionary to generate the inventory
  Object.values(mealsLibrary).forEach((meal) => {
    // Skip dynamic or family meals that shouldn't be copied around randomly
    if (meal.isExternal) return;

    // Build the master inventory item card
    const itemPill = dom.create("inventory-meal-pill", listWrapper, {
      text: meal.name,
      data: { id: meal.id, type: meal.type } // Store metadata for dropping
    });

    // Color treat based on meal classification type
    itemPill.addClass(`type-${meal.type.toLowerCase()}`);
  });

  // 🚀 ACTIVATE JQUERY-UI DRAGGABLE WITH CLONING
  $(targetSelector).find(".inventory-meal-pill").draggable({
    helper: "clone",       // Creates a copy of the pill while dragging instead of moving original
    opacity: 0.85,
    cursor: "move",
    revert: "invalid",     // Snaps pill back home if missed or dropped outside a valid day slot
    start: function() {
      $(this).css("z-index", 1000);
    }
  });
}
