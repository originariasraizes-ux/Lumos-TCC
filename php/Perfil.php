
<?php
session_start();
include 'db.php'; // não esqueça de incluir a conexão com o banco

if (!isset($_SESSION['idUsuario'])) {
    header("Location: /Lumos-TCC-main/php/login.php");
    exit();
}

$idUsuario = $_SESSION['idUsuario'];
$nome = $_SESSION['nomeUsuario'] ?? '';

// Buscar jogos favoritos do usuário
$sql = "SELECT j.* FROM tbJogos j
        JOIN tbFavoritos f ON j.idJogos = f.idJogos
        WHERE f.idUsuario = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$result = $stmt->get_result();

// Guardar os jogos favoritos em um array
$jogosFavoritos = [];
while ($row = $result->fetch_assoc()) {
    $jogosFavoritos[] = $row;
}

$stmt->close();
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
      <section class="cards-jogos">
        <?php if (!empty($jogosFavoritos)): ?>
          <?php foreach ($jogosFavoritos as $jogo): ?>
            <div class="card-jogo" data-id-jogo="<?= $jogo['idJogos'] ?>">
              <!-- Estrela de favorito -->
              <img src="/Lumos-TCC-main/images/Perfil/image-removebg-preview.png" alt="Favorito" class="fav-star" style="display:block;">

              <!-- Três pontinhos -->
              <div class="card-menu" onclick="toggleMenu(this)">⋮
               <div class="menu-options">
                <button onclick="desfavoritar(this)">Desfavoritar</button>
                  </div>
              </div>

              <!-- Imagem do jogo -->
              <div class="card-img">
                <img src="<?= htmlspecialchars($jogo['imagemJogo']) ?>" alt="<?= htmlspecialchars($jogo['nomeJogos']) ?>">
              </div>

              <!-- Conteúdo do card -->
              <div class="card-content">
                <h3><?= htmlspecialchars($jogo['nomeJogos']) ?></h3>
                <a href="<?= htmlspecialchars($jogo['paginaJogo']) ?>" class="btn" target="_blank">Ver mais</a>
              </div>
            </div>
          <?php endforeach; ?>
        <?php else: ?>
          <p>Você ainda não favoritou nenhum jogo.</p>
        <?php endif; ?>
      </section>
    </div>
  </div>
</div>

<br>

      </div>
    </div>
  </div>
  </section>


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
      <button type="button" class="btn excluir" onclick="confirmarExclusao()">Excluir Conta</button>
    </div>
  </div>
   </form>
    <!-- MODAL CONFIRMAÇÃO -->
    <div id="modalConfirm" class="hidden modal-overlay">
      <div class="modal-box">
        <p>Tem certeza de que deseja excluir sua conta? Este é um procedimento irreversível.</p>
        <div class="modal-buttons">
          <button onclick="fecharModal()">Voltar</button>
          <button type="submit" onclick="excluirConta()">Excluir Conta</button>
        </div>
      </div>
    </div>
  </div>
    </div>
  <script src="/Lumos-TCC-main/js/Perfil.js"></script>
  <script src="/Lumos-TCC-main/js/favoritos.js"></script>

</body>
</html>
