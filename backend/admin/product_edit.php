<?php
$page_title = 'Məhsul Redaktə';
include 'header.php';
require_once '../config.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$product = ['id' => '', 'name' => '', 'category' => '', 'price' => '', 'old_price' => '', 'image' => '', 'description' => '', 'is_popular' => 0];
$message = '';

if ($id > 0) {
    $stmt = $conn->prepare("SELECT * FROM furnitures WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$product) { $product = ['id' => '', 'name' => '', 'category' => '', 'price' => '', 'old_price' => '', 'image' => '', 'description' => '', 'is_popular' => 0]; }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $category = $_POST['category'] ?? '';
    $price = $_POST['price'] ?? 0;
    $old_price = $_POST['old_price'] ?: null;
    $image = $_POST['image'] ?? '';
    $description = $_POST['description'] ?? '';
    $is_popular = isset($_POST['is_popular']) ? 1 : 0;
    
    try {
        if ($id > 0) {
            $stmt = $conn->prepare("UPDATE furnitures SET name=:name, category=:category, price=:price, old_price=:old_price, image=:image, description=:description, is_popular=:is_popular WHERE id=:id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare("INSERT INTO furnitures (name, category, price, old_price, image, description, is_popular) VALUES (:name, :category, :price, :old_price, :image, :description, :is_popular)");
        }
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':old_price', $old_price);
        $stmt->bindParam(':image', $image);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':is_popular', $is_popular, PDO::PARAM_INT);
        $stmt->execute();
        
        if ($id == 0) $id = $conn->lastInsertId();
        $message = '<div class="message message-success">Məlumat qeyd edildi!</div>';
        
        // Refresh
        $stmt = $conn->prepare("SELECT * FROM furnitures WHERE id = :id");
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
    <h1><?= $id > 0 ? 'Məhsul Redaktə' : 'Yeni Məhsul' ?></h1>
    <a href="products.php" class="btn btn-primary">← Geri</a>
</div>

<div class="card" style="max-width: 700px;">
    <form method="POST">
        <div class="form-group">
            <label>Məhsul Adı</label>
            <input type="text" name="name" value="<?= htmlspecialchars($product['name']) ?>" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Kateqoriya</label>
                <input type="text" name="category" value="<?= htmlspecialchars($product['category']) ?>" placeholder="Məs: Qonaq Otağı" required>
            </div>
            <div class="form-group">
                <label>Qiymət (AZN)</label>
                <input type="number" step="0.01" name="price" value="<?= $product['price'] ?>" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Endirimli Qiymət (varsa)</label>
                <input type="number" step="0.01" name="old_price" value="<?= $product['old_price'] ?>" placeholder="Boş buraxın">
            </div>
            <div class="form-group">
                <label>Populyar məhsul?</label>
                <label style="font-weight:400; margin-top:8px; display:block;"><input type="checkbox" name="is_popular" value="1" <?= $product['is_popular'] ? 'checked' : '' ?>> Bəli</label>
            </div>
        </div>
        <div class="form-group">
            <label>Şəkil Faylı</label>
            <input type="text" name="image" value="<?= htmlspecialchars($product['image']) ?>" placeholder="Məs: sofa1.webp">
            <?php if ($product['image']): ?>
            <div style="margin-top:8px;"><img src="/<?= $product['image'] ?>" class="img-thumb" alt=""></div>
            <?php endif; ?>
        </div>
        <div class="form-group">
            <label>Açıqlama</label>
            <textarea name="description"><?= htmlspecialchars($product['description']) ?></textarea>
        </div>
        <button type="submit" class="btn btn-success">💾 Yadda saxla</button>
    </form>
</div>
<?php include 'footer.php'; ?>