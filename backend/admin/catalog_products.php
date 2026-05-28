<?php
$page_title = 'Kateqoriya Məhsulları';
include 'header.php';
require_once '../config.php';

$message = '';
if (isset($_GET['delete'])) {
    try {
        $stmt = $conn->prepare("DELETE FROM products WHERE id = :id");
        $stmt->bindParam(':id', $_GET['delete'], PDO::PARAM_INT);
        $stmt->execute();
        $message = '<div class="message message-success">Silindi!</div>';
    } catch (PDOException $e) {
        $message = '<div class="message message-danger">Xəta: ' . $e->getMessage() . '</div>';
    }
}
$products = $conn->query("SELECT * FROM products ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<?= $message ?>
<div class="page-header">
    <h1>Kateqoriya Məhsulları (Ana Səhifə)</h1>
    <a href="catalog_product_edit.php" class="btn btn-primary">+ Yeni</a>
</div>
<div class="card">
    <?php if (count($products) > 0): ?>
    <table>
        <thead>
            <tr><th>ID</th><th>Şəkil</th><th>Ad</th><th>Kateqoriya</th><th>Qiymət</th><th></th></tr>
        </thead>
        <tbody>
            <?php foreach ($products as $p): ?>
            <tr>
                <td><?= $p['id'] ?></td>
                <td><img src="<?= $p['img'] ?>" class="img-thumb" alt=""></td>
                <td><?= htmlspecialchars($p['name']) ?></td>
                <td><?= htmlspecialchars($p['category']) ?></td>
                <td><?= $p['price'] ?></td>
                <td>
                    <div class="btn-group">
                        <a href="catalog_product_edit.php?id=<?= $p['id'] ?>" class="btn btn-primary btn-sm">✏️</a>
                        <a href="catalog_products.php?delete=<?= $p['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Əminsiniz?')">🗑️</a>
                    </div>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php else: ?>
    <div class="empty-state"><p>Məhsul yoxdur.</p></div>
    <?php endif; ?>
</div>
<?php include 'footer.php'; ?>