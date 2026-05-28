<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

$type = isset($_GET['type']) ? $_GET['type'] : '';

try {
    if ($type) {
        $query = "SELECT * FROM contact_info WHERE type = :type ORDER BY sort_order ASC";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':type', $type);
    } else {
        $query = "SELECT * FROM contact_info ORDER BY sort_order ASC";
        $stmt = $conn->prepare($query);
    }
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch (PDOException $exception) {
    echo json_encode(array("status" => "error", "message" => $exception->getMessage()));
}
?>