
<?php
session_start();

if(!isset($_SESSION['idUsuario'])){
    header("Location: /Lumos-TCC-main/php/login.php"); 
    exit();
}
$nome = $_SESSION['nomeUsuario'] ?? '';
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfil</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="/Lumos-TCC-main/css/Perfil.css">
</head>
<body>


  <!-- SIDEBAR -->
  <div class="sidebar">
    <a href="/Lumos-TCC-main/php/Homepage.php" class="logo">
      <img src="/Lumos-TCC-main/images/Logos/logoLumos.png" alt="Logo Lumos">
    </a>
    <nav class="navbar">
      <a href="/Lumos-TCC-main/php/CienciasNaturais.php">Ciências Naturais, Saúde e Meio Ambiente</a>
      <a href="/Lumos-TCC-main/php/CienciasHumanas.php">Ciências Humanas e Letras</a>
      <a href="/Lumos-TCC-main/php/CienciasExatas.php">Ciências Exatas</a>
      <a href="/Lumos-TCC-main/php/IdiomasComunicacao.php">Idiomas e Comunicação</a>
      <a href="Dashboard.html">Dashboard</a>
    </nav>
  </div>

  
  <!-- PERFIL CARD -->
  <div class="card" id="perfilCard">
    <div class="card-inner">
      <div class="profile-card">
        <h2 class="perfil-title">Seu Perfil</h2>
       <div class="banner">
<div class="avatar perfil-avatar">
  <img src="/Lumos-TCC-main/images/Perfil/usuario-removebg-preview.png" alt="Foto de Perfil" class="profile-img">
</div>
<button class="edit-btn" onclick="abrirConfiguracoes()">Editar Perfil</button>
</div>
        <div class="info">
          <br>
            <div class="bio" id="profileName"><?php echo $nome; ?></div>  
          <div class="bio" id="profileBio">Bibliografia</div>
        </div>
        
        <h2>Jogos Favoritos</h2>
        <!-- BARRA DE PESQUISA -->
      <h1> Pesquise seus jogos favoritos por área!</h1>  
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
      <section class="cards-container">
  
  <div class="card">
    <div class="card-img">
      <img src="/Lumos-TCC-main/images/jogos/planetas.PNG" alt="Jogo 1">
    </div>
    <div class="card-content">
      <h3>Descobrindo os Planetas do Sistema Solar</h3>
      <p>Ensino fundamental II - Sexta série</p>
      <a href="Jogos.html" class="btn">Ver mais</a>
    </div>
  </div>

  <div class="card">
    <div class="card-img">
      <img src="/Lumos-TCC-main/images/jogos/Em desenvolvimento.png" alt="Jogo 2">
    </div>
    <div class="card-content">
      <h3>Jogo 2</h3>
      <p>Descrição do jogo aqui</p>
      <a href="Jogo.html" class="btn">Ver mais</a>
    </div>
  </div>
  
  <div class="card">
    <div class="card-img">
      <img src="/Lumos-TCC-main/images/jogos/Em desenvolvimento.png" alt="Jogo 2">
    </div>
    <div class="card-content">
      <h3>Jogo 3</h3>
      <p>Descrição do jogo aqui</p>
      <a href="Jogo.html" class="btn">Ver mais</a>
    </div>
  </div>
  
  <div class="card">
    <div class="card-img">
      <img src="/Lumos-TCC-main/images/jogos/Em desenvolvimento.png" alt="Jogo 2">
    </div>
    <div class="card-content">
      <h3>Jogo 4</h3>
      <p>Descrição do jogo aqui</p>
      <a href="Jogo.html" class="btn">Ver mais</a>
    </div>
  </div>

      </div>
    </div>
  </div>


  <!-- CONFIGURAÇÕES CARD -->
  <div class="card hidden" id="configCard">
    <div class="card-inner">
      <div class="profile-card">
        <h2 class="perfil-title">Configurações</h2>
<div class="banner" id="bannerPreview">
          <button class="edit-btn banner-btn" onclick="document.getElementById('bannerUpload').click()">Editar capa</button>
          <input type="file" id="bannerUpload" accept="image/*" class="hidden">
        </div>
<!--formulario editar perfil -->
  <form action="/Lumos-TCC-main/php/editarPerfil.php" method="POST" enctype="multipart/form-data">
  <div class="perfil-container">

    <!-- Coluna esquerda -->
    <div class="perfil-info">
            <div class="avatar config-avatar">
              <img src="/Lumos-TCC-main/images/Perfil/usuario-removebg-preview.png" alt="Foto de Perfil" id="photoPreview">
            </div>
            <button class="edit-btn" onclick="document.getElementById('photoUpload').click()">Editar foto</button>
            <input type="file" id="photoUpload" accept="image/*" class="hidden">
            
            <textarea id="bioInput" placeholder="Escreva aqui sua bibliografia..."></textarea>
          </div>

    <!-- Coluna direita -->
    <div class="forms-container">
      <label>Nome</label>
      <input type="text" id="nomeInput" name="nome">
      <label>Email</label>
      <input type="email" id="emailInput" name="email">
      <label>Senha</label>
      <input type="password" id="senhaInput" name="senha">

      <div class="form-buttons">
        <button type="button" class="btn descartar" onclick="cancelarEdicao()">Descartar</button>
        <button type="submit" class="btn salvar">Salvar</button>
      </div>
                  <button class="btn excluir" onclick="confirmarExclusao()">Excluir Conta</button>
    </div>
  </div>
</form>


    <!-- MODAL CONFIRMAÇÃO -->
    <div id="modalConfirm" class="hidden modal-overlay">
      <div class="modal-box">
        <p>Tem certeza de que deseja excluir sua conta? Este é um procedimento irreversível.</p>
        <div class="modal-buttons">
          <button onclick="fecharModal()">Voltar</button>
          <button onclick="excluirConta()">Excluir Conta</button>
        </div>
      </div>
    </div>
  </div>
    </div>
  <script src="/Lumos-TCC-main/js/Perfil.js"></script>
</body>
</html>
