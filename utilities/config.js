window.APP_CONFIG = {
    projectName: "Church-Offerings",
    prefix: "CHURCH_V1",
    // Put anything here that changes per project
    denominations: [100, 50, 20, 10, 5, 2, 1],
    gridRange: { start: 90, end: 220 }
};
/**
 * Project: [NEW PROJECT NAME]
 * File:    config.js
 * Desc:    System core profile settings, storage sandboxing, 
 *          and empty global data schema definitions.
 **/

// ==========================================================================
// 1. ENGINE CONFIGURATION (Used globally by core system scripts)
// ==========================================================================
window.APP_CONFIG = {
    // CRITICAL: Change this string prefix for every project to isolate LocalStorage variables
    prefix: "TEMPLATE_V1", 
    version: "1.0.0",
    
    // Auto-save configuration intervals (e.g., 5000 for 5 seconds)
    // PROMPT: Set to 0 to disable automated background saving and rely entirely on clicks
    saveInterval: 5000 

    /* 
    💡 ADDITIONAL ENGINE SETTINGS TO CONSIDER FOR SPECIFIC PROJECTS:
    ------------------------------------------------------------------------
    * debugMode: true,          // Toggle verbose logging in your custom logger
    * itemsPerPage: 25,         // If your grid/components handle data pagination
    * theme: "dark",            // Default UI styling flag for your css/layout components
    * maxBackupHistory: 5       // Safety limit if your PHP scripts support multiple rollbacks
    */
};

// ==========================================================================
// 2. DATA RUNTIME SCHEMA (Populated by dbSync.js during init)
// ==========================================================================
window.DATA = {
    // Core working arrays/objects used by your components and managers
    // PROMPT: Always seed collections as empty arrays [] or blank lookup structures {}
    collections: {}, 
    
    // UI state flags to keep track of active selections across components
    activeId: null

    /* 
    💡 DATA INITIALIZATION STRUCTURAL QUESTIONS FOR YOUR LOGIC SYSTEM:
    ------------------------------------------------------------------------
    * Are you handling lookups? Use keyed objects (e.g., tasks: {}) for O(1) performance.
    * Are you tracking timelines? Use arrays (e.g., logs: []) to preserve historical sorting.
    * Do you need authentication? Add a default 'userProfile: null' object.
    * Do you have persistent system filters? Add 'activeFilter: "all"' to match menu options.
    */
};

console.log(`🔧 System Engine Configuration locked: [${window.APP_CONFIG.prefix} v${window.APP_CONFIG.version}]`);
