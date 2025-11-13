<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode(["erro" => "Usuário não autenticado"]);
    exit;
}

$idUsuario = intval($_SESSION['idUsuario']);
$codigoTurma = trim($_POST['codigoTurma'] ?? '');




if (!ctype_digit($codigoTurma)) {
    echo json_encode(["erro" => "Código inválido!"]);
    exit;
}
$codigoTurma = intval($codigoTurma);

$stmt = $conn->prepare("SELECT idTurma, nomeTurma, idMateria FROM tbturmas WHERE idTurma = ?");
$stmt->bind_param("i", $codigoTurma);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["erro" => "Nenhuma turma encontrada com este código"]);
    $stmt->close();
    $conn->close();
    exit;
}

$turma = $result->fetch_assoc();
$stmt->close();

$stmt = $conn->prepare("SELECT 1 FROM tbalunoturma WHERE idUsuario = ? AND idTurma = ?");
$stmt->bind_param("ii", $idUsuario, $codigoTurma);
$stmt->execute();
$check = $stmt->get_result();

if ($check->num_rows > 0) {
    echo json_encode(["erro" => "Você já participa dessa turma"]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

$stmt = $conn->prepare("INSERT INTO tbalunoturma (idUsuario, idTurma) VALUES (?, ?)");
$stmt->bind_param("ii", $idUsuario, $codigoTurma);

if ($stmt->execute()) {
    $materias = [
        1 => "Ciências Naturais",
        2 => "Ciências Humanas",
        3 => "Ciências Exatas",
        4 => "Idiomas e Comunicação"
    ];
    $area = $materias[$turma['idMateria']] ?? "Sem Área";

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Você entrou na turma com sucesso!",
        "turma" => [
            "idTurma" => $turma['idTurma'],
            "nome" => $turma['nomeTurma'],
            "area" => $area
        ]
    ]);
} else {
    echo json_encode(["erro" => "Erro ao entrar na turma: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>