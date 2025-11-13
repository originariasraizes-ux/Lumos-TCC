<?php
session_start();
include __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}

$idUsuario = $_SESSION['idUsuario'];
$titulo = trim($_POST['titulo'] ?? '');
$descricao = trim($_POST['descricao'] ?? '');
$dataEntrega = $_POST['dataEntrega'] ?? null;
$idMateria = intval($_POST['idmateria'] ?? 0);
$idTurma = intval($_POST['idturma'] ?? 0);
$idJogos = isset($_POST['idJogo']) && $_POST['idJogo'] !== '' ? intval($_POST['idJogo']) : null; // <-- mantém o name do form, mas armazena em $idJogos

if ($titulo === '' || $idMateria <= 0 || $idTurma <= 0) {
    echo json_encode(['erro' => 'Preencha todos os campos obrigatórios.']);
    exit;
}

// Inserir tarefa
$stmt = $conn->prepare("
    INSERT INTO tbTarefa (titulo, descricao, dataEntrega, idMateria, idTurma, idUsuario, idJogos)
    VALUES (?, ?, ?, ?, ?, ?, ?)
");
$stmt->bind_param('sssiiii', $titulo, $descricao, $dataEntrega, $idMateria, $idTurma, $idUsuario, $idJogos);

if ($stmt->execute()) {
    echo json_encode(['ok' => true, 'mensagem' => 'Tarefa criada com sucesso!']);
} else {
    echo json_encode(['erro' => 'Erro ao criar tarefa: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
