<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $complaintId = trim($_POST['complaint_id'] ?? '');
    $status = trim($_POST['status'] ?? '');
    
    if (empty($complaintId) || empty($status)) {
        echo json_encode(['success' => false, 'message' => 'Complaint ID and status are required']);
        exit;
    }
    
    // Validate status
    $validStatuses = ['Pending', 'In Progress', 'Resolved'];
    if (!in_array($status, $validStatuses)) {
        echo json_encode(['success' => false, 'message' => 'Invalid status']);
        exit;
    }
    
    try {
        $stmt = $db->prepare("UPDATE complaints SET status = ? WHERE complaint_id = ?");
        $stmt->execute([$status, $complaintId]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Status updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Complaint not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error updating status']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
