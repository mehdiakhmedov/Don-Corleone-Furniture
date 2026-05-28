<?php
$page_title = 'Dashboard';
include 'header.php';

try {
    $furnitureCount = $conn->query("SELECT COUNT(*) FROM furnitures")->fetchColumn();
    $productCount = $conn->query("SELECT COUNT(*) FROM products")->fetchColumn();
    $contactCount = $conn->query("SELECT COUNT(*) FROM contacts")->fetchColumn();
    $blogCount = $conn->query("SELECT COUNT(*) FROM blog")->fetchColumn();
    $newsCount = $conn->query("SELECT COUNT(*) FROM news")->fetchColumn();
    $vacancyCount = $conn->query("SELECT COUNT(*) FROM vacancies")->fetchColumn();
    $lastContacts = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $furnitureCount = $productCount = $contactCount = $blogCount = $newsCount = $vacancyCount = 0;
    $lastContacts = [];
}
?>
<div class="grid-4">
    <div class="stat-card">
        <div class="stat-icon">🛋️</div>
        <div class="stat-number"><?= $furnitureCount ?></div>
        <div class="stat-label">Məhsullar</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-number"><?= $productCount ?></div>
        <div class="stat-label">Kateqoriya Məhsulları</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">✉️</div>
        <div class="stat-number"><?= $contactCount ?></div>
        <div class="stat-label">Mesajlar</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-number"><?= $blogCount + $newsCount ?></div>
        <div class="stat-label">Bloq + Xəbər</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">💼</div>
        <div class="stat-number"><?= $vacancyCount ?></div>
        <div class="stat-label">Vakansiyalar</div>
    </div>
</div>

<div class="card">
    <h2>Son Mesajlar</h2>
    <?php if (count($lastContacts) > 0): ?>
    <table>
        <thead>
            <tr>
                <th>Ad Soyad</th>
                <th>Telefon</th>
                <th>Mesaj</th>
                <th>Tarix</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($lastContacts as $c): ?>
            <tr>
                <td><?= htmlspecialchars($c['fullname']) ?></td>
                <td><?= htmlspecialchars($c['phone']) ?></td>
                <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><?= htmlspecialchars($c['message']) ?></td>
                <td style="white-space: nowrap;"><?= date('d.m.Y H:i', strtotime($c['created_at'])) ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php else: ?>
    <div class="empty-state"><p>Hələ mesaj yoxdur.</p></div>
    <?php endif; ?>
</div>
<?php include 'footer.php'; ?>