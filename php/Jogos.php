<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogo</title>

  <link rel="stylesheet" href="/Lumos-TCC-main/css/Jogos.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/css/lightgallery.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=League+Spartan&display=swap" rel="stylesheet">
</head>

<body>

  <!-- HEADER -->

<div class="onda">
  <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path fill="#91d5e1" fill-opacity="" 
      d="M0,64L60,90.7C120,117,240,171,360,181.3C480,192,600,160,720,138.7C840,117,960,107,1080,128C1200,149,1320,203,1380,229.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
    </path>
  </svg>
</div>
 <header class="header">
    <a href="/Lumos-TCC-main/php/Homepage.php" class="logo">
    <img src="/Lumos-TCC-main/images/Logos/LumosCienciaNatural.png" width="180px">
    </a>

   <nav class="navbar">
      <div class="dropdown">
          <a href="" class="dropbtn">Área de Conhecimento ▾</a>
          <div class="dropdown-content">
          <<a href="/Lumos-TCC-main/php/CienciasNaturais.php">Ciências Naturais</a>
              <a href="/Lumos-TCC-main/php/CienciasHumanas.php">Linguagens e Ciências Humanas</a>
              <a href="/Lumos-TCC-main/php/CienciasExatas.php">Raciocínio Lógico - Ensino Médio</a>
              <a href="/Lumos-TCC-main/php/IdiomasComunicacao.php">Raciocínio Lógico - Ensino Fundamental</a>
          </div>
        </div>
    <a href="dashboard/Aluno.html">Dashboard</a>
   </nav>

   <div class="icons">
      <?php
      if(isset($_SESSION['idUsuario'])){
        echo '<a href="/Lumos-TCC-main/php/Perfil.php"><div class="fas fa-user"></div></a>';
      } else{
        echo '<a href="/Lumos-TCC-main/php/login.php"><div class="fas fa-user"></div></a>';
      }
      
      ?>
   </div>
</header>

 <section class="advinhePersonalidade">
    <h1 style="color: #2c646e;" class="league-spartan">Descobrindo os Planetas do Sistema Solar</h1>
    

   <div class="container">
       <img src="/Lumos-TCC-main/images/jogos/planetas.PNG" class="img">
<p style="color: #1e4d55;"> O jogo “Descobrindo os Planetas do Sistema Solar” é um quiz educativo que convida os alunos a explorarem de forma lúdica as principais características dos oito planetas que orbitam o Sol. Por meio de perguntas de múltipla escolha acompanhadas de explicações, os estudantes podem aprender sobre diferenças entre planetas rochosos e gasosos, curiosidades como a “Grande Mancha Vermelha” de Júpiter, os anéis de Saturno, a inclinação de Urano e até os ventos intensos de Netuno. Voltado para o 6º ano do Ensino Fundamental, o jogo busca despertar a curiosidade pela Astronomia, reforçar conteúdos previstos na BNCC e transformar o aprendizado em uma experiência divertida, interativa e significativa.</p>


   </div>
   
 <button type="button" onclick="window.open('https://view.genially.com/68a4dacccfda948d06054ef3/interactive-content-planetas-do-sistema-solar', '_blank')">
  Jogar
</button>
</section>
   
 <!-- Footer -->
  <footer>
    <div class="footer-container">
      <div class="footer-col">
        <img src="/Lumos-TCC-main/images/Logos/logoLumos.png" class="logo-footer">
        <p style="color:#fff;"></pstyle>O aprendizado é a chave para o futuro. Continue explorando, descobrindo e se superando</p>
      </div>

      <div class="footer-col">
        <h3 style="color: #fff;">Sobre nós</h3>
        <ul>
          <li><a href="/Lumos-TCC-main/php/Homepage.php">Home</a></li>
          
          <li><a href="https://www.instagram.com/lumos.ensino/?igsh=cG04bzFmdjkyNWI%3D# " target="_blank" >Instagram</a></li>
          <li><a href="/Lumos-TCC-main/Suporte.html">Contatos</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 style="color:#fff;">Entre em Contato</h3>
        <p style="color:#fff;">📍 Etec de Carapicuíba</p>
        <p style="color:#fff;">✉️suporte.projetolumos@gmail.com</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p style="color:#fff; text-align: center;">Copyright © 2025 Lumos</p>
    </div>
  </footer>

  <!-- JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/js/lightgallery.min.js"></script>
  <script src="/Lumos-TCC-main/js/Conhecimento.js"></script>
</body>
</html>
