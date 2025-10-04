<?php
session_start(); 
include 'db.php';

$nome = $_POST['nome'];
$email = $_POST['email'];
$apelido = $_POST['apelido'];
$senha = $_POST['senha']; 
$tipo = $_POST['tipo'];

$stmt = $conn->prepare("INSERT INTO tbUsuario (nomeUsuario, emailUsuario, apelidoUsuario, senhaUsuario, tipo) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nome, $email, $apelido, $senha, $tipo);

if($stmt->execute()){
    $idUsuario = $stmt->insert_id; 

    
    $_SESSION['idUsuario'] = $idUsuario;
    $_SESSION['nomeUsuario'] = $nome;
    $_SESSION['apelidoUsuario'] = $apelido;
    $_SESSION['emailUsuario'] = $email;
    $_SESSION['tipo'] = $tipo;

    header("Location: /Lumos-TCC-main/php/Homepage.php");
    exit();
} else {
    echo "Erro: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
