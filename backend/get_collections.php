<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php'; 

try {
    $query = "SELECT * FROM collections ORDER BY order_index ASC";
    $stmt = $conn->prepare($query); 
    $stmt->execute();
    
    $collections = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($collections);
    
} catch (PDOException $exception) {
    echo json_encode(array("message" => "Xəta baş verdi: " . $exception->getMessage()));
}
?>