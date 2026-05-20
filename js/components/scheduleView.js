/**
 * js/components/scheduleView.js
 * Generates the 14-day grid layout displaying meals, embedded preps,
 * and configures color-matched interactive jQuery-UI droppable target zones.
 * Exports exactly one function matching the filename.
 */
import { shoppingListView } from "./shoppingListView.js";

export function scheduleView() {
  const targetSelector = "#menu-schedule-view";
  const scheduleTemplate = window.APP_CONFIG.SCHEDULE_TEMPLATE;
  const mealsLibrary = window.APP_CONFIG.MEALS;
  const warnings = window.APP_CONFIG.NUTRITION_WARNINGS;

  // 1. Clear out previous renderings to prevent layout duplication
  $(targetSelector).empty();

  // 2. Create the container grid matrix using your dom.create engine
  const gridContainer = dom.create("schedule-grid", targetSelector);

  // 3. Calculate today's system index for auto-isolation view filtering
  const systemDate = new Date();
  const currentDayOfWeekIndex = systemDate.getDay(); 
  const currentWeekOffset = window.DATA.currentWeek === 2 ? 7 : 0;
  const targetTodayIndex = currentDayOfWeekIndex + currentWeekOffset;

  // 4. Loop through all 14 days inside the configuration matrix
  scheduleTemplate.forEach((day) => {
    // Look up active viewport toggle settings to isolate a single day view if active
    if (window.DATA.isIsolatedView) {
      if (day.index !== targetTodayIndex) return;
    }

    window.DATA.schedule = window.DATA.schedule || {};
    window.DATA.customMeals = window.DATA.customMeals || {};
    
    // Combine dictionaries so the card engine can resolve custom IDs smoothly
    const dynamicMealsLibrary = { ...mealsLibrary, ...window.DATA.customMeals };
    
    const activeBreakfastId = window.DATA.schedule[`day_${day.index}_breakfast`] || day.breakfast;
    const activeMainId = window.DATA.schedule[`day_${day.index}_main`] || day.main;
    const activeLightId = window.DATA.schedule[`day_${day.index}_light`] || day.light;

    const breakfastMeal = dynamicMealsLibrary[activeBreakfastId];
    const mainMeal = dynamicMealsLibrary[activeMainId];
    const lightMeal = dynamicMealsLibrary[activeLightId];

    // Build the master card container for this day
    const dayCard = dom.create("day-card", gridContainer, {
      data: { index: day.index }
    });

    // Highlight today's card with a special blue border style if showing full layout
    if (day.index === targetTodayIndex) {
      dayCard.addClass("today-card-highlight");
    }

    dom.create("day-header", dayCard, { tag: "h3", text: day.dayLabel });
    const mealsList = dom.create("day-meals-list", dayCard, { tag: "ul" });

    // 5. Build droppable target slots with color classes matching the sidebar pills
    const slotBreakfast = dom.create("meal-slot target-breakfast type-breakfast", mealsList, { 
      tag: "li", 
      html: `<strong>Breakfast:</strong> <span class="assigned-meal-text">${breakfastMeal ? breakfastMeal.name : 'None'}</span>`,
      data: { index: day.index, slot: "breakfast" }
    });

    const slotMain = dom.create("meal-slot target-main type-main", mealsList, { 
      tag: "li", 
      html: `<strong>Noon Meal:</strong> <span class="assigned-meal-text">${mainMeal ? mainMeal.name : 'None'}</span>`,
      data: { index: day.index, slot: "main" }
    });

    const slotLight = dom.create("meal-slot target-light type-light", mealsList, { 
      tag: "li", 
      html: `<strong>Evening Meal:</strong> <span class="assigned-meal-text">${lightMeal ? lightMeal.name : 'None'}</span>`,
      data: { index: day.index, slot: "light" }
    });

    // Unlocked Sunday Breakfast! Only lock external dinners/evenings provided by family
    if (mainMeal && mainMeal.isExternal) slotMain.addClass("locked-slot");
    if (lightMeal && lightMeal.isExternal) slotLight.addClass("locked-slot");

    // 6. Embedded Batch Prep Tasks
    if (day.index === 1 || day.index === 8) {
      const prepBox = dom.create("inline-prep-box", dayCard);
      dom.create("prep-title", prepBox, { tag: "h4", text: "⚡ Monday Morning Batch Prep" });
      const prepList = dom.create("prep-task-list", prepBox, { tag: "ul" });
      dom.create("task-item", prepList, { tag: "li", text: "Use Instant Pot to make a master batch of Brown Rice." });
      dom.create("task-item", prepList, { tag: "li", text: "Use Slow Cooker to cook the Red Lentils." });
    }

    if (day.index === 3 || day.index === 10) {
      const prepBox = dom.create("inline-prep-box", dayCard);
      dom.create("prep-title", prepBox, { tag: "h4", text: "⚡ Wednesday Batch Prep" });
      const prepList = dom.create("prep-task-list", prepBox, { tag: "ul" });
      dom.create("task-item", prepList, { tag: "li", text: "Cook French Green Lentils (will last through Saturday)." });
      dom.create("task-item", prepList, { tag: "li", text: "Boil a batch of skin-on Potatoes." });
    }

    // 7. Sunday Heart-Safety Warnings
    if (mainMeal && mainMeal.hasWarning) {
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

  // 🚀 JQUERY-UI DROPPABLE REGISTRATION PIPELINE
  $(targetSelector).find(".meal-slot:not(.locked-slot)").droppable({
    accept: function(draggable) {
      // Validate slot types match (e.g. Breakfast targets only accept Breakfast pills)
      const slotType = $(this).data("slot");
      const dragType = draggable.data("type") ? draggable.data("type").toLowerCase() : "";
      return slotType === dragType;
    },
    hoverClass: "slot-hover-active",
    drop: function(event, ui) {
      const dayIndex = $(this).data("index");
      const slotName = $(this).data("slot");
      const droppedMealId = ui.draggable.data("id");

      console.log(`Dropped meal "${droppedMealId}" into Day ${dayIndex} (${slotName})`);

      // 1. Update mirrored active global state tracking layout
      window.DATA.schedule = window.DATA.schedule || {};
      window.DATA.schedule[`day_${dayIndex}_${slotName}`] = droppedMealId;

      // 2. Wipe the shopping list cache so it automatically recalculates with the new ingredients
      window.DATA.shoppingList = [];

      // 3. Cleanly refresh the interface panels to display changes instantly
      scheduleView();
      shoppingListView();
    }
  });
}
