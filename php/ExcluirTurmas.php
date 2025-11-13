<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { echo 'Método inválido'; exit; }
if (!isset($_SESSION['idUsuario'])) { echo 'Usuário não autenticado.'; exit; }

$idTurma = intval($_POST['idTurma'] ?? 0);
if ($idTurma <= 0) { echo 'idTurma inválido'; exit; }

$stmt = $conn->prepare("DELETE FROM tbTurmas WHERE idTurma = ? AND idUsuario = ?");
$stmt->bind_param('ii', $idTurma, $_SESSION['idUsuario']);
if ($stmt->execute()) echo "Turma excluída";
else echo "Erro: " . $stmt->error;

$stmt->close();
$conn->close();
?>