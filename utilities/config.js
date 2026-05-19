/**
 * utilities/config.js
 * Application-wide static configurations, templates, and schemas.
 * Loaded in the global script layer as a traditional top-level script.
 */

window.APP_CONFIG = {
  // Step 1.3: Unique isolation prefix to prevent LocalStorage cross-project collisions
  prefix: "HEART_MEAL_PLANNER_V1_",

  // Standard phone-friendly categorization for sorting grocery shopping items
  SHOPPING_CATEGORIES: [
    "Produce", 
    "Grains & Legumes", 
    "Proteins & Eggs", 
    "Pantry Oils & Dressings"
  ],

  // Static Nutrition Safety Dictionary for your heart-health recovery reminders
  NUTRITION_WARNINGS: {
    dangerous: {
      label: "Pass Completely 🚫",
      items: [
        "Salt Beef (Salt Junk)", 
        "Jiggs Dinner Gravy", 
        "Processed Meats", 
        "Deep-Fried Foods"
      ]
    },
    caution: {
      label: "Small Helping Only ⚠️",
      items: [
        "Moose (if cooked in the salt pot)", 
        "Potatoes with Butter", 
        "White Flour Dumplings (Duffs)"
      ]
    },
    safe: {
      label: "Fill Your Plate Green-Light ✅",
      items: [
        "Lean Moose Meat (unbrined)", 
        "Turnips (Rutabaga)", 
        "Carrots", 
        "Cabbage (steamed without salt meat)"
      ]
    }
  },

  // Base library dictionary mapping unique IDs to specific meal specifications
  MEALS: {
    "porridge_walnuts": { 
      id: "porridge_walnuts", 
      name: "Porridge: Oats + 12-Grain + Walnuts", 
      type: "Breakfast", 
      ingredients: ["Oats", "12-Grain Cereal", "Walnuts"] 
    },
    "super_salad": { 
      id: "super_salad", 
      name: "Super-Salad: Greens, Garlic, Nuts", 
      type: "Breakfast", 
      ingredients: ["Mixed Greens", "Garlic", "Assorted Nuts"] 
    },
    "eggs_garlic": { 
      id: "eggs_garlic", 
      name: "2 Eggs: Poached/Boiled with Garlic & Olive Oil", 
      type: "Breakfast", 
      ingredients: ["Eggs", "Garlic", "Olive Oil"] 
    },
    "sun_breakfast": { 
      id: "sun_breakfast", 
      name: "Family Sunday Breakfast", 
      type: "Breakfast", 
      ingredients: [], 
      isExternal: true 
    },
    
    "red_lentils_rice": { 
      id: "red_lentils_rice", 
      name: "Golden Red Lentils over Brown Rice", 
      type: "Main", 
      ingredients: ["Red Lentils", "Brown Rice"] 
    },
    "potatoes_fish": { 
      id: "potatoes_fish", 
      name: "Boiled Potatoes (skin on) with Olive Oil & Fish/Lean Protein", 
      type: "Main", 
      ingredients: ["Potatoes", "Olive Oil", "Fish/Lean Protein"] 
    },
    "green_lentils_walnuts": { 
      id: "green_lentils_walnuts", 
      name: "French Green Lentils with Leeks and Walnuts", 
      type: "Main", 
      ingredients: ["Green Lentils", "Leeks", "Walnuts"] 
    },
    "leftover_green_lentils_rice": { 
      id: "leftover_green_lentils_rice", 
      name: "Leftover Green Lentils served over Brown Rice", 
      type: "Main", 
      ingredients: ["Green Lentils", "Brown Rice"] 
    },
    "baked_potato_broccoli": { 
      id: "baked_potato_broccoli", 
      name: "Baked Potato topped with Garlic & Steamed Broccoli", 
      type: "Main", 
      ingredients: ["Potatoes", "Garlic", "Broccoli"] 
    },
    "clear_fridge_stew": { 
      id: "clear_fridge_stew", 
      name: "Clear the Fridge Stew: Any leftover veggies & lentils", 
      type: "Main", 
      ingredients: ["Leftover Vegetables", "Leftover Lentils"] 
    },
    "sun_main": { 
      id: "sun_main", 
      name: "Family Sunday Moose Dinner", 
      type: "Main", 
      ingredients: [], 
      isExternal: true, 
      hasWarning: true 
    },

    "external_evening": { 
      id: "external_evening", 
      name: "Evening Meal provided by others", 
      type: "Light", 
      ingredients: [], 
      isExternal: true 
    },
    "small_salad": { 
      id: "small_salad", 
      name: "Small Salad: Greens & Balsamic Dressing", 
      type: "Light", 
      ingredients: ["Mixed Greens", "Balsamic Dressing"] 
    },
    "leftover_red_lentil_soup": { 
      id: "leftover_red_lentil_soup", 
      name: "Leftover Red Lentil Soup", 
      type: "Light", 
      ingredients: ["Red Lentils"] 
    },
    "sauted_veggies": { 
      id: "sauted_veggies", 
      name: "Warm Veggies: Sautéed Broccoli & Cauliflower", 
      type: "Light", 
      ingredients: ["Broccoli", "Cauliflower"] 
    },
    "light_salad": { 
      id: "light_salad", 
      name: "Light Salad: Radishes, Onions & Olive Oil", 
      type: "Light", 
      ingredients: ["Radishes", "Onions", "Olive Oil"] 
    },
    "lentil_rice_bowl": { 
      id: "lentil_rice_bowl", 
      name: "Lentil/Rice Bowl: Small portion of leftovers", 
      type: "Light", 
      ingredients: ["Red Lentils", "Green Lentils", "Brown Rice"] 
    },
    "light_salad_mustard": { 
      id: "light_salad_mustard", 
      name: "Very Light: Just greens with your Mustard/Garlic dressing", 
      type: "Light", 
      ingredients: ["Mixed Greens", "Mustard", "Garlic"] 
    }
  },

  // 14-Day Menu Matrix Blueprint referencing the Meal IDs above
  SCHEDULE_TEMPLATE: [
    { index: 0, dayLabel: "Sunday (W1)", breakfast: "sun_breakfast", main: "sun_main", light: "external_evening" },
    { index: 1, dayLabel: "Monday (W1)", breakfast: "porridge_walnuts", main: "red_lentils_rice", light: "small_salad" },
    { index: 2, dayLabel: "Tuesday (W1)", breakfast: "super_salad", main: "potatoes_fish", light: "leftover_red_lentil_soup" },
    { index: 3, dayLabel: "Wednesday (W1)", breakfast: "eggs_garlic", main: "green_lentils_walnuts", light: "sauted_veggies" },
    { index: 4, dayLabel: "Thursday (W1)", breakfast: "porridge_walnuts", main: "leftover_green_lentils_rice", light: "light_salad" },
    { index: 5, dayLabel: "Friday (W1)", breakfast: "super_salad", main: "baked_potato_broccoli", light: "lentil_rice_bowl" },
    { index: 6, dayLabel: "Saturday (W1)", breakfast: "porridge_walnuts", main: "clear_fridge_stew", light: "light_salad_mustard" },
    
    { index: 7, dayLabel: "Sunday (W2)", breakfast: "sun_breakfast", main: "sun_main", light: "external_evening" },
    { index: 8, dayLabel: "Monday (W2)", breakfast: "porridge_walnuts", main: "red_lentils_rice", light: "small_salad" },
    { index: 9, dayLabel: "Tuesday (W2)", breakfast: "super_salad", main: "potatoes_fish", light: "leftover_red_lentil_soup" },
    { index: 10, dayLabel: "Wednesday (W2)", breakfast: "eggs_garlic", main: "green_lentils_walnuts", light: "sauted_veggies" },
    { index: 11, dayLabel: "Thursday (W2)", breakfast: "porridge_walnuts", main: "leftover_green_lentils_rice", light: "light_salad" },
    { index: 12, dayLabel: "Friday (W2)", breakfast: "super_salad", main: "baked_potato_broccoli", light: "lentil_rice_bowl" },
    { index: 13, dayLabel: "Saturday (W2)", breakfast: "porridge_walnuts", main: "clear_fridge_stew", light: "light_salad_mustard" }
  ],

  // Batch cooking rules map to specific day indexes in the cycle
  PREP_TASKS: [
    { 
      dayIndexes: [1, 8], 
      title: "Monday Morning Batch Prep", 
      tasks: [
        "Use Instant Pot to make a master batch of Brown Rice.", 
        "Use Slow Cooker to cook the Red Lentils."
      ] 
    },
    { 
      dayIndexes: [3, 10], 
      title: "Wednesday Batch Prep", 
      tasks: [
        "Cook French Green Lentils (sturdier and will last through Saturday).", 
        "Boil a batch of skin-on Potatoes."
      ] 
    }
  ]
};
