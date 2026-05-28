<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php'; 


$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    try {
    
        $query = "SELECT * FROM furnitures WHERE id = :id LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $furniture = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($furniture) {
            echo json_encode($furniture);
        } else {
            $query2 = "SELECT * FROM products WHERE id = :id LIMIT 1";
            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt2->execute();
            $product = $stmt2->fetch(PDO::FETCH_ASSOC);
            
            if ($product) {
                echo json_encode(array(
                    "id" => $product['id'],
                    "name" => $product['name'],
                    "category" => $product['category'],
                    "price" => str_replace(' AZN', '', $product['price']),
                    "old_price" => null,
                    "image" => ltrim($product['img'], '/'),
                    "description" => $product['name'] . " - Don Corleone keyfiyyəti ilə hazırlanmış premium mebel məhsulu."
                ));
            } else {
                echo json_encode(array(
                    "status" => "error",
                    "message" => "Məhsul tapılmadı."
                ));
            }
        }
        
    } catch (PDOException $exception) {
     
        echo json_encode(array(
            "status" => "error",
            "message" => "Verilənlər bazası xətası: " . $exception->getMessage()
        ));
    }
} else {
  
    echo json_encode(array(
        "status" => "error",
        "message" => "Yanlış və ya boş ID göndərilib! Linkin sonuna ?id=1 yazdığınızdan əmin olun."
    ));
}
?>