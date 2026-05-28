<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php'; 


$category = isset($_GET['cat']) ? $_GET['cat'] : 'all';

try {
    if ($category === 'all' || $category === '') {
        $sql = "SELECT * FROM products";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
    } else {
        $sql = "SELECT * FROM products WHERE category = :cat";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':cat', $category);
        $stmt->execute();
    }

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
    echo json_encode($products);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

?>