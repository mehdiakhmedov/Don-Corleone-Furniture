<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $data = json_decode(file_get_contents("php://input"), true);

    if (!empty($data['fullname']) && !empty($data['phone'])) {
        try {
            $sql = "INSERT INTO contacts (fullname, phone, message) VALUES (:fullname, :phone, :message)";
            $stmt = $conn->prepare($sql);
            
            $stmt->bindParam(':fullname', $data['fullname']);
            $stmt->bindParam(':phone', $data['phone']);
            $stmt->bindParam(':message', $data['message']);
            
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Məlumat qeyd olundu!"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Ad və nömrə mütləqdir!"]);
    }
}
?>