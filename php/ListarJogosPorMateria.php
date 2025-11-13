<?php
include 'db.php';
header('Content-Type: application/json; charset=utf-8');

$idMateria = isset($_GET['idMateria']) ? intval($_GET['idMateria']) : 0;

if ($idMateria === 0) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("SELECT idJogos, nomeJogos FROM tbJogos WHERE idMateria = ?");
$stmt->bind_param("i", $idMateria);
$stmt->execute();
$result = $stmt->get_result();

$games = [];
while ($row = $result->fetch_assoc()) {
    $games[] = $row;
}

echo json_encode($games);

$stmt->close();
$conn->close();
?>
