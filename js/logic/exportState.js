/**
 * js/logic/exportState.js
 * Extracts active window.DATA memory state and posts it to the PHP disk writer.
 * Exports exactly one function matching the filename.
 */
export function exportState() {
  // 1. Double check that we have active data to export
  if (!window.DATA || Object.keys(window.DATA).length === 0) {
    console.error("Export halted: window.DATA state layer is empty.");
    return Promise.reject("Empty state");
  }

  console.log("Preparing state payload dump for disk serialization...");

  // 2. Fire an asynchronous atomic POST request to your background service
  return $.ajax({
    url: "utilities/save_state.php",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(window.DATA),
    success: function(response) {
      console.log("✅ Success: State serialized to disk successfully.", response);
    },
    error: function(xhr, status, error) {
      console.error("❌ Critical: State extraction pipeline writing failure.", error);
    }
  });
}
