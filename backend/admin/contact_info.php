<?php
$page_title = 'Əlaqə Məlumatları';
include 'header.php';
require_once '../config.php';

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    foreach ($_POST['info'] as $id => $data) {
        $stmt = $conn->prepare("UPDATE contact_info SET label=:label, value=:value WHERE id=:id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $label = $data['label'] ?? '';
        $value = $data['value'] ?? '';
        $stmt->bindParam(':label', $label);
        $stmt->bindParam(':value', $value);
        $stmt->execute();
    }
    $message = '<div class="message message-success">Yadda saxlanıldı!</div>';
}

$items = $conn->query("SELECT * FROM contact_info ORDER BY sort_order ASC")->fetchAll(PDO::FETCH_ASSOC);
?>
<?= $message ?>
<div class="page-header"><h1>Əlaqə Məlumatları</h1></div>
<div class="card" style="max-width: 700px;">
    <form method="POST">
        <table>
            <thead><tr><th>Tip</th><th>Etiket</th><th>Dəyər</th></tr></thead>
            <tbody>
                <?php foreach ($items as $item): ?>
                <tr>
                    <td style="text-transform:capitalize;font-weight:600;"><?= htmlspecialchars($item['type']) ?></td>
                    <td><input type="text" name="info[<?= $item['id'] ?>][label]" value="<?= htmlspecialchars($item['label']) ?>" style="width:100%;padding:6px;border:1px solid #ddd;border-radius:6px;"></td>
                    <td><input type="text" name="info[<?= $item['id'] ?>][value]" value="<?= htmlspecialchars($item['value']) ?>" style="width:100%;padding:6px;border:1px solid #ddd;border-radius:6px;"></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <br>
        <button type="submit" class="btn btn-success">💾 Yadda saxla</button>
    </form>
</div>
<?php include 'footer.php'; ?>