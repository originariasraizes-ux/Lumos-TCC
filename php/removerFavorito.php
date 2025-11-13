<?php
session_start();
include 'db.php';

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Usuário não autenticado.']);
    exit();
}

$idUsuario = $_SESSION['idUsuario'];
$idJogo = $_POST['idJogo'] ?? null;

if (!$idJogo) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID do jogo não recebido.']);
    exit();
}

$stmt = $conn->prepare("DELETE FROM tbfavoritos WHERE idUsuario = ? AND idJogos = ?");
$stmt->bind_param("ii", $idUsuario, $idJogo);

if ($stmt->execute()) {
    echo json_encode(['status' => 'sucesso']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Falha ao desfavoritar.']);
}

$stmt->close();
$conn->close();
?>
