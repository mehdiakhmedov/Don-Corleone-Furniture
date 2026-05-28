<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit;
}

// Get counts for sidebar
require_once '../config.php';
try {
    $furnitureCount = $conn->query("SELECT COUNT(*) FROM furnitures")->fetchColumn();
    $productCount = $conn->query("SELECT COUNT(*) FROM products")->fetchColumn();
    $contactCount = $conn->query("SELECT COUNT(*) FROM contacts")->fetchColumn();
    $blogCount = $conn->query("SELECT COUNT(*) FROM blog")->fetchColumn();
    $newsCount = $conn->query("SELECT COUNT(*) FROM news")->fetchColumn();
    $vacancyCount = $conn->query("SELECT COUNT(*) FROM vacancies WHERE is_active = 1")->fetchColumn();
} catch (PDOException $e) {
    $furnitureCount = $productCount = $contactCount = $blogCount = $newsCount = $vacancyCount = 0;
}

$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Don Corleone</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f0f2f5; display: flex; }
        .sidebar { width: 260px; background: #1a1a1a; min-height: 100vh; color: #fff; position: fixed; left: 0; top: 0; overflow-y: auto; }
        .sidebar-logo { padding: 24px 20px; border-bottom: 1px solid #333; text-align: center; }
        .sidebar-logo img { width: 60px; margin-bottom: 8px; }
        .sidebar-logo h2 { font-size: 16px; font-weight: 700; }
        .sidebar-logo p { font-size: 11px; color: #999; }
        .sidebar-nav { padding: 16px 0; }
        .sidebar-nav a { display: flex; align-items: center; gap: 12px; padding: 12px 24px; color: #ccc; text-decoration: none; font-size: 14px; transition: all 0.3s; }
        .sidebar-nav a:hover { background: #333; color: #fff; }
        .sidebar-nav a.active { background: #d35400; color: #fff; }
        .sidebar-nav a .badge { margin-left: auto; background: #d35400; color: #fff; font-size: 11px; padding: 2px 8px; border-radius: 10px; }
        .sidebar-nav .section-title { padding: 16px 24px 8px; font-size: 11px; text-transform: uppercase; color: #666; letter-spacing: 1px; }
        .main-content { margin-left: 260px; flex: 1; min-height: 100vh; }
        .topbar { background: #fff; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e5e7eb; }
        .topbar h3 { font-size: 18px; color: #1a1a1a; }
        .topbar .user-info { display: flex; align-items: center; gap: 16px; font-size: 14px; color: #666; }
        .topbar .user-info a { color: #d35400; text-decoration: none; font-weight: 600; }
        .topbar .user-info a:hover { text-decoration: underline; }
        .content { padding: 32px; }
        .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); padding: 24px; margin-bottom: 24px; }
        .card h2 { font-size: 18px; color: #1a1a1a; margin-bottom: 16px; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .stat-card .stat-number { font-size: 32px; font-weight: 700; color: #d35400; }
        .stat-card .stat-label { font-size: 13px; color: #666; margin-top: 4px; }
        .stat-card .stat-icon { font-size: 28px; margin-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; }
        table th { text-align: left; padding: 12px 16px; font-size: 12px; text-transform: uppercase; color: #666; border-bottom: 2px solid #e5e7eb; }
        table td { padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #f0f2f5; color: #333; }
        table tr:hover { background: #f9fafb; }
        .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s; }
        .btn-primary { background: #d35400; color: #fff; }
        .btn-primary:hover { background: #e67e22; }
        .btn-danger { background: #e74c3c; color: #fff; }
        .btn-danger:hover { background: #c0392b; }
        .btn-success { background: #27ae60; color: #fff; }
        .btn-success:hover { background: #2ecc71; }
        .btn-sm { padding: 5px 12px; font-size: 12px; }
        .btn-group { display: flex; gap: 6px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; outline: none; transition: border-color 0.3s; font-family: inherit; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #d35400; }
        .form-group textarea { min-height: 120px; resize: vertical; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .message { padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 20px; }
        .message-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .message-danger { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .empty-state { text-align: center; padding: 48px 20px; color: #999; }
        .empty-state p { font-size: 16px; }
        .img-thumb { width: 60px; height: 60px; object-fit: contain; background: #f8f9fa; border-radius: 8px; }
        .search-box { margin-bottom: 20px; }
        .search-box input { width: 100%; max-width: 400px; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; outline: none; }
        .search-box input:focus { border-color: #d35400; }
        .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .page-header h1 { font-size: 22px; color: #1a1a1a; }
        @media (max-width: 768px) { .sidebar { width: 200px; } .main-content { margin-left: 200px; } .form-row { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-logo">
            <img src="/donlogo.png" alt="Don Corleone">
            <h2>Don Corleone</h2>
            <p>Admin Panel</p>
        </div>
        <div class="sidebar-nav">
            <div class="section-title">Əsas</div>
            <a href="dashboard.php" class="<?= $current_page == 'dashboard.php' ? 'active' : '' ?>">📊 Dashboard</a>
            
            <div class="section-title">Məhsullar</div>
            <a href="products.php" class="<?= $current_page == 'products.php' ? 'active' : '' ?>">🛋️ Məhsullar <span class="badge"><?= $furnitureCount ?></span></a>
            <a href="catalog_products.php" class="<?= $current_page == 'catalog_products.php' ? 'active' : '' ?>">📦 Kateqoriya Məhsulları <span class="badge"><?= $productCount ?></span></a>
            
            <div class="section-title">Məzmun</div>
            <a href="about.php" class="<?= $current_page == 'about.php' ? 'active' : '' ?>">📄 Haqqımızda</a>
            <a href="blog.php" class="<?= $current_page == 'blog.php' ? 'active' : '' ?>">📝 Bloq <span class="badge"><?= $blogCount ?></span></a>
            <a href="news.php" class="<?= $current_page == 'news.php' ? 'active' : '' ?>">📰 Xəbərlər <span class="badge"><?= $newsCount ?></span></a>
            
            <div class="section-title">Digər</div>
            <a href="vacancies.php" class="<?= $current_page == 'vacancies.php' ? 'active' : '' ?>">💼 Vakansiyalar <span class="badge"><?= $vacancyCount ?></span></a>
            <a href="contact_info.php" class="<?= $current_page == 'contact_info.php' ? 'active' : '' ?>">📞 Əlaqə Məlumatları</a>
            <a href="collections.php" class="<?= $current_page == 'collections.php' ? 'active' : '' ?>">🎯 Kolleksiyalar</a>
            <a href="contacts.php" class="<?= $current_page == 'contacts.php' ? 'active' : '' ?>">✉️ Mesajlar <span class="badge"><?= $contactCount ?></span></a>
            
            <div class="section-title">Hesab</div>
            <a href="logout.php">🚪 Çıxış</a>
        </div>
    </div>
    <div class="main-content">
        <div class="topbar">
            <h3><?= $page_title ?? 'Dashboard' ?></h3>
            <div class="user-info">
                <span>👋 <?= htmlspecialchars($_SESSION['admin_name']) ?></span>
                <a href="logout.php">Çıxış</a>
            </div>
        </div>
        <div class="content">