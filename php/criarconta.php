<?php
session_start(); // Inicia ou recupera a sessão

// Verifica se o usuário está logado
if(!isset($_SESSION['idUsuario'])){
    header("Location: /Lumos-TCC-main/php/login.php"); // Redireciona para a página de login
    exit();
}


?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Criar Conta</title>
    <link rel="stylesheet" href="/Lumos-TCC-main/css/login.css">
</head>
<body class="bg-azul">
    <div class="container">
        <h2 class="titulo-rosa">Criar uma conta</h2>
        <form action= "criarcontaBanco.php" method ="post">
             <input type="text" name="nome" placeholder="Nome Completo" required>
             <label for="tipo"></label>

            <select id="tipo" name="tipo" class="input-estilo">
                <option value="">Tipo de conta</option>
                <option value="professor">Professor</option>
                <option value="responsavel">Responsável</option>
                <option value="aluno">Aluno</option>
                </select>

                <input type="text" name="apelido" placeholder="Usuário" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="senha" placeholder="Senha" required>

                <ul class="requisitos">
                <li style="color:  #d24869;">Pelo menos uma letra maiúscula</li>
                <li style="color:  #d24869;">Pelo menos uma letra minúscula</li>
                <li style="color:  #d24869;">Pelo menos um algarismo</li>
                <li style="color:  #d24869;">Mais do que 7 caracteres</li>
                </ul>

                <input type="password" placeholder="Confirme a Senha" required>

                <button type="submit">Criar</button>


        
       <a href="/Lumos-TCC-main/php/login.php" class="link-claro">Já tem uma conta? Entrar</a> 
</div>
    
</body>
</html> 
