<?php
$page_title = 'Kolleksiyalar';
include 'header.php';
require_once '../config.php';

$message = '';
if (isset($_GET['delete'])) {
    $stmt = $conn->prepare("DELETE FROM collections WHERE id = :id");
    $stmt->bindParam(':id', $_GET['delete'], PDO::PARAM_INT);
    $stmt->execute();
    $message = '<div class="message message-success">Silindi!</div>';
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);
    $title = $_POST['title'] ?? '';
    $subtitle = $_POST['subtitle'] ?? '';
    $img = $_POST['img'] ?? '';
    $btn_text = $_POST['btn_text'] ?? '';
    $btn_link = $_POST['btn_link'] ?? '';
    $order_index = intval($_POST['order_index'] ?? 0);
    try {
        if ($id > 0) {
            $stmt = $conn->prepare("UPDATE collections SET title=:title, subtitle=:subtitle, img=:img, btn_text=:btn_text, btn_link=:btn_link, order_index=:order_index WHERE id=:id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare("INSERT INTO collections (title, subtitle, img, btn_text, btn_link, order_index) VALUES (:title, :subtitle, :img, :btn_text, :btn_link, :order_index)");
        }
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':subtitle', $subtitle);
        $stmt->bindParam(':img', $img);
        $stmt->bindParam(':btn_text', $btn_text);
        $stmt->bindParam(':btn_link', $btn_link);
        $stmt->bindParam(':order_index', $order_index, PDO::PARAM_INT);
        $stmt->execute();
        $message = '<div class="message message-success">Qeyd edildi!</div>';
    } catch (PDOException $e) {
        $message = '<div class="message message-danger">Xəta: ' . $e->getMessage() . '</div>';
    }
}

$edit = null;
if (isset($_GET['edit'])) {
    $stmt = $conn->prepare("SELECT * FROM collections WHERE id = :id");
    $stmt->bindParam(':id', $_GET['edit'], PDO::PARAM_INT);
    $stmt->execute();
    $edit = $stmt->fetch(PDO::FETCH_ASSOC);
}
$items = $conn->query("SELECT * FROM collections ORDER BY order_index ASC")->fetchAll(PDO::FETCH_ASSOC);
?>
<?= $message ?>
<div class="page-header"><h1>Kolleksiyalar</h1></div>
<div class="card" style="max-width: 700px;">
    <h2><?= $edit ? 'Redaktə' : 'Yeni Kolleksiya' ?></h2>
    <form method="POST">
        <input type="hidden" name="id" value="<?= $edit['id'] ?? 0 ?>">
        <div class="form-group">
            <label>Başlıq</label>
            <input type="text" name="title" value="<?= htmlspecialchars($edit['title'] ?? '') ?>" required>
        </div>
        <div class="form-group">
            <label>Alt Mətn</label>
            <textarea name="subtitle" style="min-height:80px;"><?= htmlspecialchars($edit['subtitle'] ?? '') ?></textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Şəkil</label>
                <input type="text" name="img" value="<?= htmlspecialchars($edit['img'] ?? '') ?>" placeholder="Məs: harmony1.jpg">
            </div>
            <div class="form-group">
                <label>Sıra</label>
                <input type="number" name="order_index" value="<?= htmlspecialchars($edit['order_index'] ?? '0') ?>">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Düymə Mətni</label>
                <input type="text" name="btn_text" value="<?= htmlspecialchars($edit['btn_text'] ?? '') ?>">
            </div>
            <div class="form-group">
                <label>Düymə Linki</label>
                <input type="text" name="btn_link" value="<?= htmlspecialchars($edit['btn_link'] ?? '') ?>">
            </div>
        </div>
        <button type="submit" class="btn btn-success">💾 Yadda saxla</button>
        <?php if ($edit): ?><a href="collections.php" class="btn btn-primary">✕ Ləğv et</a><?php endif; ?>
    </form>
</div>
<div class="card">
    <table>
        <thead><tr><th>ID</th><th>Başlıq</th><th>Sıra</th><th></th></tr></thead>
        <tbody>
            <?php foreach ($items as $p): ?>
            <tr>
                <td><?= $p['id'] ?></td>
                <td><?= htmlspecialchars($p['title']) ?></td>
                <td><?= $p['order_index'] ?></td>
                <td>
                    <div class="btn-group">
                        <a href="collections.php?edit=<?= $p['id'] ?>" class="btn btn-primary btn-sm">✏️</a>
                        <a href="collections.php?delete=<?= $p['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Əminsiniz?')">🗑️</a>
                    </div>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
<?php include 'footer.php'; ?>