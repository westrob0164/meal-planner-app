/**
 * js/components/scheduleView.js
 * Generates the 14-day grid layout displaying meals and embedded prep tasks.
 * Exports exactly one function matching the filename.
 */
export function scheduleView() {
  const targetSelector = "#menu-schedule-view";
  const scheduleData = window.APP_CONFIG.SCHEDULE_TEMPLATE;
  const mealsLibrary = window.APP_CONFIG.MEALS;
  const warnings = window.APP_CONFIG.NUTRITION_WARNINGS;

  // 1. Create a container wrapper for the schedule grid matrix
  const gridContainer = dom.create("schedule-grid", targetSelector);

  // 2. Loop through all 14 days inside the configuration template
  scheduleData.forEach((day) => {
    // Resolve meal details from the base library using config IDs
    const breakfastMeal = mealsLibrary[day.breakfast];
    const mainMeal = mealsLibrary[day.main];
    const lightMeal = mealsLibrary[day.light];

    // Build a card container frame for the individual day
    const dayCard = dom.create("day-card", gridContainer, {
      data: { index: day.index }
    });

    // Append day label header (e.g., "Monday (W1)")
    dom.create("day-header", dayCard, { tag: "h3", text: day.dayLabel });

    // Build meal slot sections
    const mealsList = dom.create("day-meals-list", dayCard, { tag: "ul" });

    dom.create("meal-slot", mealsList, { 
      tag: "li", 
      html: `<strong>Breakfast:</strong> ${breakfastMeal.name}` 
    });

    dom.create("meal-slot", mealsList, { 
      tag: "li", 
      html: `<strong>Noon Meal:</strong> ${mainMeal.name}` 
    });

    dom.create("meal-slot", mealsList, { 
      tag: "li", 
      html: `<strong>Evening Meal:</strong> ${lightMeal.name}` 
    });

    // 3. Embedded Prep Tasks: Check if this specific day is Monday or Wednesday
    // Monday indexes are 1 (Week 1) and 8 (Week 2)
    if (day.index === 1 || day.index === 8) {
      const prepBox = dom.create("inline-prep-box", dayCard);
      dom.create("prep-title", prepBox, { tag: "h4", text: "⚡ Monday Morning Batch Prep" });
      const prepList = dom.create("prep-task-list", prepBox, { tag: "ul" });
      dom.create("task-item", prepList, { tag: "li", text: "Use Instant Pot to make a master batch of Brown Rice." });
      dom.create("task-item", prepList, { tag: "li", text: "Use Slow Cooker to cook the Red Lentils." });
    }

    // Wednesday indexes are 3 (Week 1) and 10 (Week 2)
    if (day.index === 3 || day.index === 10) {
      const prepBox = dom.create("inline-prep-box", dayCard);
      dom.create("prep-title", prepBox, { tag: "h4", text: "⚡ Wednesday Batch Prep" });
      const prepList = dom.create("prep-task-list", prepBox, { tag: "ul" });
      dom.create("task-item", prepList, { tag: "li", text: "Cook French Green Lentils (will last through Saturday)." });
      dom.create("task-item", prepList, { tag: "li", text: "Boil a batch of skin-on Potatoes." });
    }

    // 4. The Moose Factor: Inject heart safety warnings for external Sunday dinners
    if (mainMeal.hasWarning) {
      const warningBox = dom.create("heart-warning-box", dayCard);
      dom.create("warning-title", warningBox, { tag: "h4", text: "Sunday Dining Cheat-Sheet" });
      
      const dangerList = dom.create("warning-list danger", warningBox, { tag: "ul" });
      dom.create("list-label", dangerList, { tag: "li", html: `<strong>${warnings.dangerous.label}</strong>` });
      warnings.dangerous.items.forEach(item => dom.create("item", dangerList, { tag: "li", text: item }));

      const cautionList = dom.create("warning-list caution", warningBox, { tag: "ul" });
      dom.create("list-label", cautionList, { tag: "li", html: `<strong>${warnings.caution.label}</strong>` });
      warnings.caution.items.forEach(item => dom.create("item", cautionList, { tag: "li", text: item }));

      const safeList = dom.create("warning-list safe", warningBox, { tag: "ul" });
      dom.create("list-label", safeList, { tag: "li", html: `<strong>${warnings.safe.label}</strong>` });
      warnings.safe.items.forEach(item => dom.create("item", safeList, { tag: "li", text: item }));
    }
  });
}
