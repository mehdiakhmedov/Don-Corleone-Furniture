<?php
$page_title = 'Xəbərlər';
include 'header.php';
require_once '../config.php';

$message = '';
if (isset($_GET['delete'])) {
    $stmt = $conn->prepare("DELETE FROM news WHERE id = :id");
    $stmt->bindParam(':id', $_GET['delete'], PDO::PARAM_INT);
    $stmt->execute();
    $message = '<div class="message message-success">Silindi!</div>';
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);
    $title = $_POST['title'] ?? '';
    $content = $_POST['content'] ?? '';
    $image = $_POST['image'] ?? '';
    try {
        if ($id > 0) {
            $stmt = $conn->prepare("UPDATE news SET title=:title, content=:content, image=:image WHERE id=:id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare("INSERT INTO news (title, content, image) VALUES (:title, :content, :image)");
        }
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':image', $image);
        $stmt->execute();
        $message = '<div class="message message-success">Qeyd edildi!</div>';
    } catch (PDOException $e) {
        $message = '<div class="message message-danger">Xəta: ' . $e->getMessage() . '</div>';
    }
}

$edit = null;
if (isset($_GET['edit'])) {
    $stmt = $conn->prepare("SELECT * FROM news WHERE id = :id");
    $stmt->bindParam(':id', $_GET['edit'], PDO::PARAM_INT);
    $stmt->execute();
    $edit = $stmt->fetch(PDO::FETCH_ASSOC);
}
$items = $conn->query("SELECT * FROM news ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<?= $message ?>
<div class="page-header"><h1>Xəbərlər</h1></div>
<div class="card" style="max-width: 700px;">
    <h2><?= $edit ? 'Redaktə' : 'Yeni Xəbər' ?></h2>
    <form method="POST">
        <input type="hidden" name="id" value="<?= $edit['id'] ?? 0 ?>">
        <div class="form-group">
            <label>Başlıq</label>
            <input type="text" name="title" value="<?= htmlspecialchars($edit['title'] ?? '') ?>" required>
        </div>
        <div class="form-group">
            <label>Şəkil</label>
            <input type="text" name="image" value="<?= htmlspecialchars($edit['image'] ?? '') ?>" placeholder="Məs: sofa1.webp">
        </div>
        <div class="form-group">
            <label>Məzmun</label>
            <textarea name="content" style="min-height:200px;"><?= htmlspecialchars($edit['content'] ?? '') ?></textarea>
        </div>
        <button type="submit" class="btn btn-success">💾 Yadda saxla</button>
        <?php if ($edit): ?><a href="news.php" class="btn btn-primary">✕ Ləğv et</a><?php endif; ?>
    </form>
</div>
<div class="card">
    <table>
        <thead><tr><th>ID</th><th>Başlıq</th><th>Tarix</th><th></th></tr></thead>
        <tbody>
            <?php foreach ($items as $p): ?>
            <tr>
                <td><?= $p['id'] ?></td>
                <td><?= htmlspecialchars($p['title']) ?></td>
                <td style="white-space:nowrap;"><?= date('d.m.Y', strtotime($p['created_at'])) ?></td>
                <td>
                    <div class="btn-group">
                        <a href="news.php?edit=<?= $p['id'] ?>" class="btn btn-primary btn-sm">✏️</a>
                        <a href="news.php?delete=<?= $p['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Əminsiniz?')">🗑️</a>
                    </div>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
<?php include 'footer.php'; ?>