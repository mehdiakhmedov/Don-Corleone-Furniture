<?php
$page_title = 'Məhsul Redaktə';
include 'header.php';
require_once '../config.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$product = ['id' => '', 'name' => '', 'category' => '', 'price' => '', 'img' => ''];
$message = '';
$categories = ['sofa', 'table', 'chair', 'bed', 'lightning', 'decore'];

if ($id > 0) {
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC) ?: $product;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $category = $_POST['category'] ?? '';
    $price = $_POST['price'] ?? '';
    $img = $_POST['img'] ?? '';
    try {
        if ($id > 0) {
            $stmt = $conn->prepare("UPDATE products SET name=:name, category=:category, price=:price, img=:img WHERE id=:id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare("INSERT INTO products (name, category, price, img) VALUES (:name, :category, :price, :img)");
        }
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':img', $img);
        $stmt->execute();
        if ($id == 0) $id = $conn->lastInsertId();
        $message = '<div class="message message-success">Qeyd edildi!</div>';
        $stmt = $conn->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $message = '<div class="message message-danger">Xəta: ' . $e->getMessage() . '</div>';
    }
}
?>
<?= $message ?>
<div class="page-header">
    <h1><?= $id > 0 ? 'Redaktə' : 'Yeni Məhsul' ?></h1>
    <a href="catalog_products.php" class="btn btn-primary">← Geri</a>
</div>
<div class="card" style="max-width: 600px;">
    <form method="POST">
        <div class="form-group">
            <label>Məhsul Adı</label>
            <input type="text" name="name" value="<?= htmlspecialchars($product['name']) ?>" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Kateqoriya</label>
                <select name="category">
                    <?php foreach ($categories as $cat): ?>
                    <option value="<?= $cat ?>" <?= $product['category'] == $cat ? 'selected' : '' ?>><?= ucfirst($cat) ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="form-group">
                <label>Qiymət</label>
                <input type="text" name="price" value="<?= htmlspecialchars($product['price']) ?>" placeholder="Məs: 450 AZN" required>
            </div>
        </div>
        <div class="form-group">
            <label>Şəkil Yolu</label>
            <input type="text" name="img" value="<?= htmlspecialchars($product['img']) ?>" placeholder="Məs: /table1.jpg" required>
            <?php if ($product['img']): ?>
            <div style="margin-top:8px;"><img src="<?= $product['img'] ?>" class="img-thumb" alt=""></div>
            <?php endif; ?>
        </div>
        <button type="submit" class="btn btn-success">💾 Yadda saxla</button>
    </form>
</div>
<?php include 'footer.php'; ?>