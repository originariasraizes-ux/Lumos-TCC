<?php
session_start();
include __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode([
        "erro" => "Usuário não autenticado",
        "sessao" => $_SESSION
    ]);
    exit;
}


$idUsuario = intval($_SESSION['idUsuario']);

$stmt = $conn->prepare("SELECT t.idTurma, t.nomeTurma, m.idMateria, m.nomeMateria AS areaTurma
                        FROM tbTurmas t
                        LEFT JOIN tbMateria m ON m.idMateria = t.idMateria
                        WHERE t.idUsuario = ?");
$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$res = $stmt->get_result();

$rows = [];
while ($r = $res->fetch_assoc()) {
    $rows[] = $r;
}

echo json_encode($rows, JSON_UNESCAPED_UNICODE);

$stmt->close();
$conn->close();
?>
