<?php
/**
 * utilities/save_state.php
 * Atomic file writer for local application planning state tracking.
 * Serializes data to disk and triggers an automatic background Git deploy.
 */

// 1. Guard check to ensure incoming data payload exists
$rawPayload = file_get_contents('php://input');
if (empty($rawPayload)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No data payload received."]);
    exit();
}

$targetFilePath = '../data/meal_state.json';

if (!is_dir('../data')) {
    mkdir('../data', 0755, true);
}

// 2. Write data using an exclusive file lock to avoid conflicts or corrupted files
$writeResult = file_put_contents($targetFilePath, $rawPayload, LOCK_EX);

if ($writeResult === false) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to write payload to disk destination."]);
    exit();
}

// 3. 🚀 NEW PHASE 2 TRIGGER: Background Git push automation
//exec() triggers your batch script silently on your local desktop machine
$batchFilePath = realpath(__DIR__ . '/deploy_push.bat');

if ($batchFilePath && file_exists($batchFilePath)) {
    // Windows background execution sequence command string
    pclose(popen("start /B cmd /c \"$batchFilePath\"", "r"));
    
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "State saved and automatic background GitHub deployment triggered."]);
} else {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "State saved locally, but batch automation file was missing."]);
}
