/**
 * js/components/pillboxView.js
 * Generates the master sidebar list of available heart-healthy meal pills.
 * Handles persistent custom meal creation and forces type-sorted organization.
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

        window.DATA.customMeals = window.DATA.customMeals || {};
        window.DATA.customMeals[newId] = {
          id: newId,
          name: name,
          type: type,
          ingredients: [name]
        };

        console.log(`Custom item permanently registered to memory store: "${name}" (${type})`);
        
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

  // 4. 🚀 TYPE-SORTING ENGINE PIPELINE
  // Sorts arrays so elements organize by category group instead of insertion order
  const typeOrder = { "breakfast": 1, "main": 2, "light": 3 };
  
  const sortedMealsArray = Object.values(combinedMeals).sort((mealA, mealB) => {
    const orderA = typeOrder[mealA.type.toLowerCase()] || 99;
    const orderB = typeOrder[mealB.type.toLowerCase()] || 99;
    return orderA - orderB;
  });

  // 5. Loop through the newly SORTED array to generate your draggable list elements
  sortedMealsArray.forEach((meal) => {
    if (meal.id === "sun_main" || meal.id === "external_evening") return;

    const itemPill = dom.create("inventory-meal-pill", listWrapper, {
      text: meal.name,
      data: { id: meal.id, type: meal.type }
    });

    itemPill.addClass(`type-${meal.type.toLowerCase()}`);
  });

  // 6. Activate jQuery-UI cloning engine
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
