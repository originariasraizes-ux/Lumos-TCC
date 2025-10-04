<?php
session_start(); 

if (isset($_SESSION['idUsuario'])) {
    header("Location: /Lumos-TCC-main/php/Perfil.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="/Lumos-TCC-main/css/login.css">
</head>
<body class="bg-rosa">
    <div class="container">
        <h2 class="titulo-azul">Entre em sua conta</h2>
        <form action="loginBanco.php" method="post">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="senha"  placeholder="Senha" required>
            
         <button type="submit">Entrar</button>
        </form>
        <div>
            <a href="/Lumos-TCC-main/php/criarconta.php" class="link-claro">Criar conta</a> |
            <a href="esquecisenha.html" class="link-claro">Esqueceu sua senha?</a>
        </div>
    </div>
</body>
</html>
