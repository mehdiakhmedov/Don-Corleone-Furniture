<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

try {
    $query = "SELECT * FROM about ORDER BY id DESC LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $about = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($about ?: array("status" => "error", "message" => "Məlumat tapılmadı"));
} catch (PDOException $exception) {
    echo json_encode(array("status" => "error", "message" => $exception->getMessage()));
}
?>