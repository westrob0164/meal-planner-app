/**
 * Project: Heart-Healthy Meal Planner
 * File:    main.js
 * Desc:    The "Conductor" script. Manages project config, data hydration,
 *          and isolates structural event triggers.
 **/

import { appFrame } from "./components/appFrame.js";
import { scheduleView } from "./components/scheduleView.js";
import { shoppingListView } from "./components/shoppingListView.js"; // <--- Add this import



// 1. PROJECT CONFIGURATION
// Isolated application prefix managed out of global utilities/config.js layer
// Initial fallback values provided here for architectural structural safety
window.APP_CONFIG = window.APP_CONFIG || {
    prefix: "HEART_MEAL_PLANNER_V1_" 
};

// 2. GLOBAL DATA STORE
window.DATA = window.DATA || {};

$(document).ready(function() {
    console.clear();
    
    // 3. INITIALIZE DATA ENGINE
    initAppData().then(() => {
        // Hydrate configuration records
        fetch('utilities/dataList.txt')
            .then(res => res.text())
            .then(text => {
                const names = text.split(/\r?\n/).filter(n => n.trim() !== "");
                
                names.forEach(name => {
                    window.DATA[name] = getLocalData(name);
                });

                console.log("🚀 Data Engine Hydrated. Attaching listeners...");
                setupEventListeners();
                
                console.log("Starting Application Interface UI...");
                startProjectUI(); 
            });
    });
});

/**
 * 4. CENTRALIZED EVENT LISTENERS
 * Keeps your root initialization cycle completely isolated from UI bindings
 */
function setupEventListeners() {
    // Settings Modal Toggle Actions
    $('#openSettings').on('click', function() {
        $('#settingsModal').css('display', 'flex').hide().fadeIn(200);
    });

    $('#closeSettings, .modal-overlay').on('click', function(e) {
        if (e.target === this || $(e.target).is('#closeSettings')) {
            $('#settingsModal').fadeOut(200);
        }
    });

    // Core System Backup Actions
    $("#saveButton").on("click", function() {
        saveLocalToDb().then(() => {
            alert("✅ Backup saved to SQLite successfully.");
        }).catch(err => {
            alert("❌ System save error. Review developer logs.");
        });
    });

    $("#restoreButton").on("click", function() {
        if (confirm("⚠️ WARNING: This will overwrite your current screen data with the DB backup. Continue?")) {
            restoreLocalFromDb();
        }
    });
}

/**
 * 5. START PROJECT UI
 * Clean, untainted execution entry point for your application logic
 */
function startProjectUI() {
    // Execute base interface skeleton deployment
    appFrame();
    
    // Execute 14-day layout template card construction matrix
    scheduleView();

    // Compile and build interactive phone-friendly grocery item rows
    shoppingListView();


    
    console.log("Meal app framework and schedule matrix deployed successfully.");
}
