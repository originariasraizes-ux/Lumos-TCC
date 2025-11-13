<?php
session_start();
include 'db.php';
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode(["erro" => "Usuário não autenticado"]);
    exit;
}

$idUsuario = intval($_SESSION['idUsuario']);

$materias = [
    1 => "Ciências Naturais",
    2 => "Ciências Humanas",
    3 => "Ciências Exatas",
    4 => "Idiomas e Comunicação"
];

$sql = "
    SELECT t.idTurma, t.nomeTurma, t.idMateria
    FROM tbturmas t
    INNER JOIN tbalunoturma a ON a.idTurma = t.idTurma
    WHERE a.idUsuario = ?
    ORDER BY t.nomeTurma ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$result = $stmt->get_result();

$turmas = [];
while ($row = $result->fetch_assoc()) {
    $turmas[] = [
        "idTurma" => $row['idTurma'],
        "nome" => $row['nomeTurma'],
        "area" => $materias[$row['idMateria']] ?? "Sem Área"
    ];
}

echo json_encode($turmas, JSON_UNESCAPED_UNICODE);

$stmt->close();
$conn->close();
?>