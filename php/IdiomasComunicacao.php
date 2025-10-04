<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> Idiomas e Comunicação</title>

  <link rel="stylesheet" href="/Lumos-TCC-main/css/IdiomasComunicacao.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/css/lightgallery.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=League+Spartan&display=swap" rel="stylesheet">
</head>

<body>

  <!-- HEADER -->

<div class="onda">
  <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path fill="#7e62a4" fill-opacity="" 
      d="M0,64L60,90.7C120,117,240,171,360,181.3C480,192,600,160,720,138.7C840,117,960,107,1080,128C1200,149,1320,203,1380,229.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
    </path>
  </svg>
</div>
 <header class="header">
    <a href="/Lumos-TCC-main/php/Homepage.php" class="logo">
    <img src="/Lumos-TCC-main/images/Logos/Lumos Idiomas.png" width="180px">
    </a>

   <nav class="navbar">
      <div class="dropdown">
          <a href="" class="dropbtn">Área de Conhecimento ▾</a>
          <div class="dropdown-content">
              <a href="/Lumos-TCC-main/php/CienciasNaturais.php">Ciências Naturais</a>
              <a href="/Lumos-TCC-main/php/CienciasHumanas.php">Ciências Humanas</a>
              <a href="/Lumos-TCC-main/php/CienciasExatas.php">Ciências Exatas </a>
              <a href="/Lumos-TCC-main/php/IdiomasComunicacao.php">Idioma e Comunicação</a>
          </div>
        </div>
     <?php
     $dashboardLink = '/Lumos-TCC-main/dashboard/Aluno.html'; 
    if (isset($_SESSION['tipo'])) {
    switch ($_SESSION['tipo']) {
        case 'aluno':
            $dashboardLink = '/Lumos-TCC-main/dashboard/Aluno.html';
            break;
        case 'professor':
            $dashboardLink = '/Lumos-TCC-main/dashboard/Professor.html';
            break;
    }
}      
      ?>
      
  <a href="<?php echo $dashboardLink; ?>">Dashboard</a>
   </nav>

   <div class="icons">
       <?php
      if(isset($_SESSION['idUsuario'])){
        echo '<a href="/Lumos-TCC-main/php/Perfil.php"><div class="fas fa-user"></div></a>';
      } else{
        echo '<a href="/Lumos-TCC-main/php/login.php"><div class="fas fa-user"></div></a>';
      }
      
      ?>
      <div class="fas fa-bars" id="menu-btn"></div>
   </div>
</header>


  <!-- SECTION EXPLORANDO -->
  <section class="Explorando">

    <div class="lado-esquerdo">
      <div class="texto-explorando">
        <h1 class="league-spartan">Explorando o Mundo de Idiomas e Comunicação</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
      </div>

      <!-- BARRA DE PESQUISA -->
      <div class="search-container">
        <input type="text" placeholder="Buscar conteúdo..." class="search-input">
        <button class="search-icon" title="Buscar">&#128269;</button>
        <button class="filter-icon" onclick="toggleFilters()" title="Filtros">&#9881;</button>
      </div>

      <!-- FILTROS -->
      <div id="filters" class="filters hidden">
        <h3>Filtros</h3>
        <div class="filter-list">
          <div class="filter-option" onclick="toggleOption(this)">Ciências Naturais</div>
          <div class="filter-option" onclick="toggleOption(this)">Saúde</div>
          <div class="filter-option" onclick="toggleOption(this)">Meio Ambiente</div>
          <div class="filter-option" onclick="toggleOption(this)">Ciências Humanas</div>
          <div class="filter-option" onclick="toggleOption(this)">Letras</div>
          <div class="filter-option" onclick="toggleOption(this)">Ciências Exatas</div>
          <div class="filter-option" onclick="toggleOption(this)">Idiomas</div>
          <div class="filter-option" onclick="toggleOption(this)">Comunicação</div>
        </div>
      </div>
    </div>

    <div class="img-explorando">
      <img src="/Lumos-TCC-main/images/jogos/comunicacao.gif" alt="Imagem Explorando">
    </div>

  </section>

  <!-- IMAGEM CAPA DE JOGO -->
 
 <!-- Footer -->
  <footer>
    <div class="footer-container">
      <div class="footer-col">
        <img src="/Lumos-TCC-main/images/Logos/logoLumos.png" class="logo-footer">
        <p style="color:#fff;">O aprendizado é a chave para o futuro. Continue explorando, descobrindo e se superando</p>
      </div>

      <div class="footer-col">
        <h3 style="color: #fff;">Sobre nós</h3>
        <ul>
          <li><a href="/Lumos-TCC-main/php/Homepage.php">Home</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="/Lumos-TCC-main/Suporte.html">Contatos</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 style="color:#fff;">Entre em Contato</h3>
        <p style="color:#fff;">📍 Etec de Carapicuíba</p>
        <p style="color:#fff;">✉️ Lumos@gmail.com</p>
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
