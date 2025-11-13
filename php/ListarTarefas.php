<?php
include 'db.php';
header('Content-Type: application/json');

$idTurma = isset($_GET['idTurma']) ? intval($_GET['idTurma']) : 0;

if ($idTurma === 0) {
    echo json_encode([]);
    exit;
}

$result = $conn->query("SELECT * FROM tbTarefa WHERE idTurma = $idTurma");

$tarefas = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
        $tarefas[] = $row;
    }
}

echo json_encode($tarefas);
$conn->close();
?>
