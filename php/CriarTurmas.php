<?php
session_start();
include __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['erro' => 'Método inválido']);
    exit;
}

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}

$nomeTurma = trim($_POST['nomeTurma'] ?? '');
$idMateria = intval($_POST['idMateria'] ?? 0);

if ($nomeTurma === '' || $idMateria <= 0) {
    echo json_encode(['erro' => 'Dados incompletos.']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO tbTurmas (nomeTurma, idMateria, idUsuario) VALUES (?, ?, ?)");
$stmt->bind_param('sii', $nomeTurma, $idMateria, $_SESSION['idUsuario']);

if ($stmt->execute()) {
    echo json_encode(['ok' => true, 'mensagem' => 'Turma criada com sucesso!']);
} else {
    echo json_encode(['erro' => 'Erro ao criar turma: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>