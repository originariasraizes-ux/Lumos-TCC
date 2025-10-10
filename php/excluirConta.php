<?php
session_start();
include 'db.php'; // Conexão com o banco

// Garante que o usuário esteja logado
if (!isset($_SESSION['idUsuario'])) {
    header("Location: /Lumos-TCC-main/php/login.php");
    exit();
}

$idUsuario = $_SESSION['idUsuario'];

//  Exclui o usuário do banco
$stmt = $conn->prepare("DELETE FROM tbUsuario WHERE idUsuario = ?");
$stmt->bind_param("i", $idUsuario);

 if ($stmt->execute()) {
        session_destroy();
        http_response_code(200); // sucesso
    } else {
        http_response_code(500); // erro
    }

    $stmt->close();
    $conn->close();

?>
