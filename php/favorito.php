<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Usuário não autenticado.']);
    exit;
}

$idUsuario = $_SESSION['idUsuario'];
$idJogo = $_POST['idJogo'] ?? null;

if (!$idJogo) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'ID do jogo não enviado.']);
    exit;
}

// Verifica se já está favoritado
$sqlCheck = "SELECT * FROM tbfavoritos WHERE idUsuario = ? AND idJogos = ?";
$stmt = $conn->prepare($sqlCheck);
$stmt->bind_param("ii", $idUsuario, $idJogo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Já favoritado → desfavorita
    $sql = "DELETE FROM tbfavoritos WHERE idUsuario = ? AND idJogos = ?";
    $acao = "removido";
} else {
    // Ainda não favoritado → adiciona
    $sql = "INSERT INTO tbfavoritos (idUsuario, idJogos) VALUES (?, ?)";
    $acao = "adicionado";
}
$stmt->close();

$stmt2 = $conn->prepare($sql);
$stmt2->bind_param("ii", $idUsuario, $idJogo);
$sucesso = $stmt2->execute();
$stmt2->close();
$conn->close();

echo json_encode(['sucesso' => $sucesso, 'acao' => $acao]);
?>
