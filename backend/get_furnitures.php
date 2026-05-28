<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php'; 

try {
   
    $query = "SELECT * FROM furnitures ORDER BY id DESC";
    $stmt = $conn->prepare($query); 
    $stmt->execute();
    
    $furnitures = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($furnitures);
    
} catch (PDOException $exception) {
    echo json_encode(array("message" => "Xəta baş verdi: " . $exception->getMessage()));
}
?>