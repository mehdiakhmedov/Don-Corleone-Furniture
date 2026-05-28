<?php
session_start();
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_name'] = $user['fullname'];
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Email və ya şifrə yanlışdır!';
    }
}
?>
<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Don Corleone</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f0f2f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .login-box { background: #fff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        .login-box h1 { text-align: center; font-size: 24px; color: #1a1a1a; margin-bottom: 8px; }
        .login-box p { text-align: center; color: #666; font-size: 14px; margin-bottom: 30px; }
        .login-box label { display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px; }
        .login-box input { width: 100%; padding: 12px 16px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; margin-bottom: 20px; outline: none; transition: border-color 0.3s; }
        .login-box input:focus { border-color: #d35400; }
        .login-box button { width: 100%; padding: 13px; background: #d35400; color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.3s; }
        .login-box button:hover { background: #e67e22; }
        .error { background: #fde8e8; color: #c0392b; padding: 12px; border-radius: 8px; font-size: 13px; text-align: center; margin-bottom: 20px; }
        .logo { text-align: center; margin-bottom: 10px; }
        .logo img { width: 80px; }
    </style>
</head>
<body>
    <div class="login-box">
        <div class="logo"><img src="/donlogo.png" alt="Don Corleone"></div>
        <h1>Admin Panel</h1>
        <p>Don Corleone idarəetmə panellərinə xoş gəlmisiniz</p>
        <?php if (isset($error)): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="POST">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email ünvanınız" required>
            <label>Şifrə</label>
            <input type="password" name="password" placeholder="Şifrəniz" required>
            <button type="submit">Giriş</button>
        </form>
    </div>
</body>
</html>