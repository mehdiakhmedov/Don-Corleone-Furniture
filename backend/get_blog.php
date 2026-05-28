<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

try {
    $query = "SELECT * FROM blog ORDER BY created_at DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $blog = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($blog);
} catch (PDOException $exception) {
    echo json_encode(array("status" => "error", "message" => $exception->getMessage()));
}
?>