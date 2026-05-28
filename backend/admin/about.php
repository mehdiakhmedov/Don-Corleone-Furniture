<?php
$page_title = 'Haqqımızda';
include 'header.php';
require_once '../config.php';

$message = '';
$about = $conn->query("SELECT * FROM about ORDER BY id DESC LIMIT 1")->fetch(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $content = $_POST['content'] ?? '';
    $image = $_POST['image'] ?? '';
    try {
        if ($about) {
            $stmt = $conn->prepare("UPDATE about SET title=:title, content=:content, image=:image WHERE id=:id");
            $stmt->bindParam(':id', $about['id'], PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare("INSERT INTO about (title, content, image) VALUES (:title, :content, :image)");
        }
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':image', $image);
        $stmt->execute();
        $message = '<div class="message message-success">Yadda saxlanıldı!</div>';
        $about = $conn->query("SELECT * FROM about ORDER BY id DESC LIMIT 1")->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $message = '<div class="message message-danger">Xəta: ' . $e->getMessage() . '</div>';
    }
}
?>
<?= $message ?>
<div class="page-header"><h1>Haqqımızda</h1></div>
<div class="card" style="max-width: 800px;">
    <form method="POST">
        <div class="form-group">
            <label>Başlıq</label>
            <input type="text" name="title" value="<?= htmlspecialchars($about['title'] ?? '') ?>" required>
        </div>
        <div class="form-group">
            <label>Şəkil</label>
            <input type="text" name="image" value="<?= htmlspecialchars($about['image'] ?? '') ?>">
            <?php if ($about && $about['image']): ?>
            <div style="margin-top:8px;"><img src="/<?= $about['image'] ?>" class="img-thumb" alt=""></div>
            <?php endif; ?>
        </div>
        <div class="form-group">
            <label>Məzmun</label>
            <textarea name="content" style="min-height:300px;"><?= htmlspecialchars($about['content'] ?? '') ?></textarea>
        </div>
        <button type="submit" class="btn btn-success">💾 Yadda saxla</button>
    </form>
</div>
<?php include 'footer.php'; ?>