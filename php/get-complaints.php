<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $db->query("SELECT complaint_id, name, email, phone, category, description, status, created_at FROM complaints ORDER BY created_at DESC");
        $complaints = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $complaints
        ]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error retrieving complaints']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
