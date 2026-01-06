<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $category = trim($_POST['category'] ?? '');
    $description = trim($_POST['description'] ?? '');
    
    // Validation
    if (empty($name) || empty($email) || empty($phone) || empty($category) || empty($description)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Generate unique complaint ID
    $complaintId = 'CMP-' . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
    
    try {
        $stmt = $db->prepare("INSERT INTO complaints (complaint_id, name, email, phone, category, description) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$complaintId, $name, $email, $phone, $category, $description]);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Complaint submitted successfully',
            'complaint_id' => $complaintId
        ]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error saving complaint: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
