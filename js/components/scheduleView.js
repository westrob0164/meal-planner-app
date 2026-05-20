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

  $(targetSelector).empty();
  const gridContainer = dom.create("schedule-grid", targetSelector);

  scheduleTemplate.forEach((day) => {
    window.DATA.schedule = window.DATA.schedule || {};
    
    const activeBreakfastId = window.DATA.schedule[`day_${day.index}_breakfast`] || day.breakfast;
    const activeMainId = window.DATA.schedule[`day_${day.index}_main`] || day.main;
    const activeLightId = window.DATA.schedule[`day_${day.index}_light`] || day.light;

    const breakfastMeal = mealsLibrary[activeBreakfastId];
    const mainMeal = mealsLibrary[activeMainId];
    const lightMeal = mealsLibrary[activeLightId];

    const dayCard = dom.create("day-card", gridContainer, {
      data: { index: day.index }
    });

    dom.create("day-header", dayCard, { tag: "h3", text: day.dayLabel });
    const mealsList = dom.create("day-meals-list", dayCard, { tag: "ul" });

    // 1. Build slots with matching background modifier types
    const slotBreakfast = dom.create("meal-slot target-breakfast type-breakfast", mealsList, { 
      tag: "li", 
      html: `<strong>Breakfast:</strong> <span class="assigned-meal-text">${breakfastMeal.name}</span>`,
      data: { index: day.index, slot: "breakfast" }
    });

    const slotMain = dom.create("meal-slot target-main type-main", mealsList, { 
      tag: "li", 
      html: `<strong>Noon Meal:</strong> <span class="assigned-meal-text">${mainMeal.name}</span>`,
      data: { index: day.index, slot: "main" }
    });

    const slotLight = dom.create("meal-slot target-light type-light", mealsList, { 
      tag: "li", 
      html: `<strong>Evening Meal:</strong> <span class="assigned-meal-text">${lightMeal.name}</span>`,
      data: { index: day.index, slot: "light" }
    });

    // 2. Unlocked Sunday Breakfast! Only lock external dinners/evenings provided by family
    if (mainMeal.isExternal) slotMain.addClass("locked-slot");
    if (lightMeal.isExternal) slotLight.addClass("locked-slot");

    // 3. Embedded Batch Prep Tasks
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

    // 4. Sunday Heart-Safety Warnings
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

  // 5. jQuery-UI Drop Handler
  $(targetSelector).find(".meal-slot:not(.locked-slot)").droppable({
    accept: function(draggable) {
      const slotType = $(this).data("slot");
      const dragType = draggable.data("type") ? draggable.data("type").toLowerCase() : "";
      return slotType === dragType;
    },
    hoverClass: "slot-hover-active",
    drop: function(event, ui) {
      const dayIndex = $(this).data("index");
      const slotName = $(this).data("slot");
      const droppedMealId = ui.draggable.data("id");

      window.DATA.schedule = window.DATA.schedule || {};
      window.DATA.schedule[`day_${dayIndex}_${slotName}`] = droppedMealId;

      window.DATA.shoppingList = [];

      scheduleView();
      shoppingListView();
    }
  });
}
