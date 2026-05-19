/**
 * js/components/shoppingListView.js
 * Compiles ingredients into removable pills and handles custom item additions.
 * Exports exactly one function matching the filename.
 */
export function shoppingListView() {
  const targetSelector = "#shopping-list-view";
  const mealsLibrary = window.APP_CONFIG.MEALS;
  const scheduleTemplate = window.APP_CONFIG.SCHEDULE_TEMPLATE;

  // 1. Gather raw list if window.DATA doesn't have one yet
  if (!window.DATA.shoppingList || window.DATA.shoppingList.length === 0) {
    const ingredientsSet = new Set();
    scheduleTemplate.forEach(day => {
      if (mealsLibrary[day.breakfast]) mealsLibrary[day.breakfast].ingredients.forEach(i => ingredientsSet.add(i));
      if (mealsLibrary[day.main]) mealsLibrary[day.main].ingredients.forEach(i => ingredientsSet.add(i));
      if (mealsLibrary[day.light]) mealsLibrary[day.light].ingredients.forEach(i => ingredientsSet.add(i));
    });

    const blacklistedItems = ["Leftover Vegetables", "Leftover Lentils", "Red Lentils", "Green Lentils", "Brown Rice"];
    
    window.DATA.shoppingList = Array.from(ingredientsSet)
      .filter(item => !blacklistedItems.includes(item))
      .map(item => ({ name: item, checked: false }));
  }

  // 2. Clear previous render and build the main card shell
  $(targetSelector).empty();
  const shoppingCard = dom.create("shopping-master-card", targetSelector);
  dom.create("shopping-header", shoppingCard, { tag: "h3", text: "📋 Shopping List Manager" });
  
  // 3. NEW: Add custom item input bar container
  const inputRow = dom.create("shopping-input-row", shoppingCard);
  
  const textInput = dom.create("shopping-input-field", inputRow, {
    tag: "input",
    attr: { type: "text", placeholder: "Add item (e.g., Dish Soap, Eggs)..." }
  });

  dom.create("shopping-add-btn", inputRow, {
    tag: "button",
    text: "Add",
    attr: { type: "button" },
    on: {
      click: function() {
        const value = textInput.val().trim();
        if (value === "") return; // Skip empty submissions

        // Push new item directly into your mirrored window.DATA state store
        window.DATA.shoppingList.push({ name: value, checked: false });
        console.log(`Custom item added to state store: "${value}"`);

        // Re-render your layout view to deploy the new pill cleanly
        shoppingListView();
      }
    }
  });

  // Listen for Enter key press inside the input field as well
  textInput.on("keypress", function(e) {
    if (e.which === 13) {
      $(this).next("button").trigger("click");
    }
  });

  // 4. Flex container that flows like words wrapping lines for our pills
  const pillsWrapper = dom.create("shopping-pills-container", shoppingCard);

  // 5. Render pills from our mirrored state tracking array
  window.DATA.shoppingList.forEach((listItem, idx) => {
    const pillClass = listItem.checked ? "shopping-pill pill-checked" : "shopping-pill";
    
    const pill = dom.create(pillClass, pillsWrapper, {
      data: { index: idx }
    });

    // Label text area for checking items off
    dom.create("pill-text", pill, {
      tag: "span",
      text: listItem.name,
      on: {
        click: function(e) {
          e.stopPropagation();
          const currentStatus = !window.DATA.shoppingList[idx].checked;
          window.DATA.shoppingList[idx].checked = currentStatus;
          
          if (currentStatus) {
            pill.addClass("pill-checked");
          } else {
            pill.removeClass("pill-checked");
          }
        }
      }
    });

    // Delete cross interactive element (×)
    dom.create("pill-delete-btn", pill, {
      tag: "button",
      text: "×",
      attr: { type: "button", "aria-label": `Remove ${listItem.name}` },
      on: {
        click: function(e) {
          e.stopPropagation();
          window.DATA.shoppingList.splice(idx, 1);
          shoppingListView();
        }
      }
    });
  });
}
