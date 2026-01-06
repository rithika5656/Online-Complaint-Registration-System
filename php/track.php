<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $complaintId = trim($_GET['id'] ?? '');
    
    if (empty($complaintId)) {
        echo json_encode(['success' => false, 'message' => 'Complaint ID is required']);
        exit;
    }
    
    try {
        $stmt = $db->prepare("SELECT complaint_id, name, category, description, status, created_at FROM complaints WHERE complaint_id = ?");
        $stmt->execute([$complaintId]);
        $complaint = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($complaint) {
            echo json_encode([
                'success' => true,
                'data' => $complaint
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Complaint not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error retrieving complaint']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
