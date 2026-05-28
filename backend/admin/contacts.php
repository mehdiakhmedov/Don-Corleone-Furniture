<?php
$page_title = 'Mesajlar';
include 'header.php';
require_once '../config.php';

if (isset($_GET['delete'])) {
    $stmt = $conn->prepare("DELETE FROM contacts WHERE id = :id");
    $stmt->bindParam(':id', $_GET['delete'], PDO::PARAM_INT);
    $stmt->execute();
}

$items = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<div class="page-header"><h1>Mesajlar</h1></div>
<div class="card">
    <?php if (count($items) > 0): ?>
    <table>
        <thead>
            <tr><th>ID</th><th>Ad Soyad</th><th>Telefon</th><th>Mesaj</th><th>Tarix</th><th></th></tr>
        </thead>
        <tbody>
            <?php foreach ($items as $c): ?>
            <tr>
                <td><?= $c['id'] ?></td>
                <td><?= htmlspecialchars($c['fullname']) ?></td>
                <td><?= htmlspecialchars($c['phone']) ?></td>
                <td style="max-width:300px;"><?= nl2br(htmlspecialchars($c['message'])) ?></td>
                <td style="white-space:nowrap;"><?= date('d.m.Y H:i', strtotime($c['created_at'])) ?></td>
                <td><a href="contacts.php?delete=<?= $c['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Silinsin?')">🗑️</a></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php else: ?>
    <div class="empty-state"><p>Hələ mesaj yoxdur.</p></div>
    <?php endif; ?>
</div>
<?php include 'footer.php'; ?>