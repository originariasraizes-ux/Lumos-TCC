<?php
session_start();
include 'db.php';


if (!isset($_SESSION['idUsuario'])) {
    header("Location: /Lumos-TCC-main/php/login.php");
    exit();
}

 // Pega dados do formulário
$id = $_SESSION['idUsuario'];
$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$bio = $_POST['bio'];

// Atualiza no banco
$sql = "UPDATE tbusuario SET nomeUsuario = ?, emailUsuario = ?, senhaUsuario = ? WHERE idUsuario = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nome, $email, $senha, $id);

if ($stmt->execute()) {
    // Atualiza sessão
    $_SESSION['nomeUsuario'] = $nome;

    // Redireciona de volta ao perfil
    header("Location: /Lumos-TCC-main/php/Perfil.php");
    exit();
} else {
    echo "Erro ao atualizar perfil.";
}

$stmt->close();
$conn->close();
?>