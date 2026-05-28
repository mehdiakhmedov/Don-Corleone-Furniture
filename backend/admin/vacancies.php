<?php
$page_title = 'Vakansiyalar';
include 'header.php';
require_once '../config.php';

$message = '';
if (isset($_GET['delete'])) {
    $stmt = $conn->prepare("DELETE FROM vacancies WHERE id = :id");
    $stmt->bindParam(':id', $_GET['delete'], PDO::PARAM_INT);
    $stmt->execute();
    $message = '<div class="message message-success">Silindi!</div>';
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $requirements = $_POST['requirements'] ?? '';
    $salary = $_POST['salary'] ?? '';
    $is_active = isset($_POST['is_active']) ? 1 : 0;
    try {
        if ($id > 0) {
            $stmt = $conn->prepare("UPDATE vacancies SET title=:title, description=:description, requirements=:requirements, salary=:salary, is_active=:is_active WHERE id=:id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare("INSERT INTO vacancies (title, description, requirements, salary, is_active) VALUES (:title, :description, :requirements, :salary, :is_active)");
        }
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':requirements', $requirements);
        $stmt->bindParam(':salary', $salary);
        $stmt->bindParam(':is_active', $is_active, PDO::PARAM_INT);
        $stmt->execute();
        $message = '<div class="message message-success">Qeyd edildi!</div>';
    } catch (PDOException $e) {
        $message = '<div class="message message-danger">Xəta: ' . $e->getMessage() . '</div>';
    }
}

$edit = null;
if (isset($_GET['edit'])) {
    $stmt = $conn->prepare("SELECT * FROM vacancies WHERE id = :id");
    $stmt->bindParam(':id', $_GET['edit'], PDO::PARAM_INT);
    $stmt->execute();
    $edit = $stmt->fetch(PDO::FETCH_ASSOC);
}
$items = $conn->query("SELECT * FROM vacancies ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<?= $message ?>
<div class="page-header"><h1>Vakansiyalar</h1></div>
<div class="card" style="max-width: 700px;">
    <h2><?= $edit ? 'Redaktə' : 'Yeni Vakansiya' ?></h2>
    <form method="POST">
        <input type="hidden" name="id" value="<?= $edit['id'] ?? 0 ?>">
        <div class="form-group">
            <label>Vəzifə Adı</label>
            <input type="text" name="title" value="<?= htmlspecialchars($edit['title'] ?? '') ?>" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Maaş</label>
                <input type="text" name="salary" value="<?= htmlspecialchars($edit['salary'] ?? '') ?>" placeholder="Məs: 800-1200 AZN">
            </div>
            <div class="form-group">
                <label><input type="checkbox" name="is_active" value="1" <?= (!isset($edit) || $edit['is_active']) ? 'checked' : '' ?>> Aktiv</label>
            </div>
        </div>
        <div class="form-group">
            <label>Təsvir</label>
            <textarea name="description" style="min-height:100px;" required><?= htmlspecialchars($edit['description'] ?? '') ?></textarea>
        </div>
        <div class="form-group">
            <label>Tələblər</label>
            <textarea name="requirements" style="min-height:150px;" placeholder="Hər sətirə bir tələb yazın"><?= htmlspecialchars($edit['requirements'] ?? '') ?></textarea>
        </div>
        <button type="submit" class="btn btn-success">💾 Yadda saxla</button>
        <?php if ($edit): ?><a href="vacancies.php" class="btn btn-primary">✕ Ləğv et</a><?php endif; ?>
    </form>
</div>
<div class="card">
    <table>
        <thead><tr><th>ID</th><th>Vəzifə</th><th>Maaş</th><th>Status</th><th></th></tr></thead>
        <tbody>
            <?php foreach ($items as $p): ?>
            <tr>
                <td><?= $p['id'] ?></td>
                <td><?= htmlspecialchars($p['title']) ?></td>
                <td><?= $p['salary'] ?: '-' ?></td>
                <td><?= $p['is_active'] ? '✅ Aktiv' : '❌ Deaktiv' ?></td>
                <td>
                    <div class="btn-group">
                        <a href="vacancies.php?edit=<?= $p['id'] ?>" class="btn btn-primary btn-sm">✏️</a>
                        <a href="vacancies.php?delete=<?= $p['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Əminsiniz?')">🗑️</a>
                    </div>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
<?php include 'footer.php'; ?>