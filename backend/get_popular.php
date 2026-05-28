<?php


header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db = "don_corleone";
$user = "root";
$pass = "";

try {
    
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT p.* FROM products p INNER JOIN popular_products pp ON p.id = pp.product_id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);

} catch (PDOException $e) {
    
    echo json_encode(["error" => $e->getMessage()]);
}

?>