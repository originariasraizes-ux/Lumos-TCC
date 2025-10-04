<?php
session_start();
include 'db.php'; 

$email = $_POST['email'];
$senha = $_POST['senha'];

$stmt = $conn->prepare("SELECT idUsuario, nomeUsuario, apelidoUsuario, emailUsuario, senhaUsuario, tipo 
                        FROM tbUsuario WHERE emailUsuario = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if($row = $result->fetch_assoc()){
    if($senha === $row['senhaUsuario']){
        $_SESSION['idUsuario'] = $row['idUsuario'];
        $_SESSION['nomeUsuario'] = $row['nomeUsuario'];
        $_SESSION['apelidoUsuario'] = $row['apelidoUsuario'];
        $_SESSION['emailUsuario'] = $row['emailUsuario'];
        $_SESSION['tipo'] = $row['tipo'];

        header("Location: /Lumos-TCC-main/php/Perfil.php");
        exit();
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}


$stmt->close();
$conn->close();
?>
