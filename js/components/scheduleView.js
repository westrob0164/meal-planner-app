/**
 * js/components/pillboxView.js
 * Generates the master sidebar list of available heart-healthy meal pills.
 * Handles persistent custom meal creation via window.DATA storage mirroring.
 * Exports exactly one function matching the filename.
 */
export function pillboxView() {
  const targetSelector = "#meal-pillbox-view";
  const staticMeals = window.APP_CONFIG.MEALS;

  // 1. Clear previous rendering and build framework
  $(targetSelector).empty();
  dom.create("pillbox-header", targetSelector, { tag: "h3", text: "🍉 Master Meal Inventory" });
  
  // 2. Add Custom Meal Creation Input Fields
  const formBox = dom.create("pillbox-add-form", targetSelector);
  
  const nameInput = dom.create("pillbox-input", formBox, {
    tag: "input",
    attr: { type: "text", placeholder: "New meal name (e.g., Baked Salmon)..." }
  });

  const typeSelect = dom.create("pillbox-select", formBox, {
    tag: "select"
  });
  dom.create("opt", typeSelect, { tag: "option", attr: { value: "Breakfast" }, text: "Breakfast" });
  dom.create("opt", typeSelect, { tag: "option", attr: { value: "Main" }, text: "Noon Meal" });
  dom.create("opt", typeSelect, { tag: "option", attr: { value: "Light" }, text: "Evening Meal" });

  dom.create("pillbox-btn", formBox, {
    tag: "button",
    text: "Add to Inventory",
    attr: { type: "button" },
    on: {
      click: function() {
        const name = nameInput.val().trim();
        const type = typeSelect.val();
        if (name === "") return;

        const newId = "custom_" + Date.now();

        // STATE MIRRORING FIX: Initialize and save straight to window.DATA layer
        window.DATA.customMeals = window.DATA.customMeals || {};
        window.DATA.customMeals[newId] = {
          id: newId,
          name: name,
          type: type,
          ingredients: [name] // Self-populates ingredient pill array cleanly
        };

        console.log(`Custom item permanently registered to memory store: "${name}" (${type})`);
        
        // Clear text field and instantly refresh the inventory view column
        nameInput.val("");
        pillboxView();
      }
    }
  });

  dom.create("pillbox-instruction", targetSelector, { 
    tag: "p", 
    text: "Drag a meal pill and drop it onto a matching calendar slot.", 
    style: "font-size:12px; color:#64748b; margin: 15px 0 10px 0;" 
  });

  const listWrapper = dom.create("pillbox-items-container", targetSelector);

  // 3. COMBINE STATIC CONFIG MEALS WITH USER CREATED DATA MEALS
  window.DATA.customMeals = window.DATA.customMeals || {};
  const combinedMeals = { ...staticMeals, ...window.DATA.customMeals };

  // 4. Loop through the unified dictionary to generate your draggable list elements
  Object.values(combinedMeals).forEach((meal) => {
    if (meal.id === "sun_main" || meal.id === "external_evening") return;

    const itemPill = dom.create("inventory-meal-pill", listWrapper, {
      text: meal.name,
      data: { id: meal.id, type: meal.type } // Correctly binds type parameters for drop targets
    });

    itemPill.addClass(`type-${meal.type.toLowerCase()}`);
  });

  // 5. Activate jQuery-UI cloning engine
  $(targetSelector).find(".inventory-meal-pill").draggable({
    helper: "clone",
    opacity: 0.85,
    cursor: "move",
    revert: "invalid",
    start: function() {
      $(this).css("z-index", 1000);
    }
  });
}
