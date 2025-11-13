<?php 
include 'db.php';
session_start();

// ID da tarefa recebido por GET
$idTarefa = isset($_GET['id']) ? intval($_GET['id']) : 0;

$tarefa = null;

if ($idTarefa > 0) {
    $sql = "SELECT t.*, 
                   m.nomeMateria AS materiaTarefa, 
                   j.nomeJogos, j.paginaJogo, j.imagemJogo, 
                   jm.nomeMateria AS materiaJogo
            FROM tbtarefa t
            JOIN tbMateria m ON t.idMateria = m.idMateria
            LEFT JOIN tbJogos j ON t.idJogos = j.idJogos
            LEFT JOIN tbMateria jm ON j.idMateria = jm.idMateria
            WHERE t.idTarefa = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idTarefa);
    $stmt->execute();
    $result = $stmt->get_result();
    $tarefa = $result->fetch_assoc();
    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tarefa</title>
  <link rel="stylesheet" href="/Lumos-TCC-main/css/Dashboard.css">
  <link rel="stylesheet" href="/Lumos-TCC-main/css/tarefa.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
</head>
<body>

  <button class="hamburger" onclick="toggleSidebar()">☰</button>

  <!-- SIDEBAR -->
  <aside class="sidebar" id="sidebar">
    <a href="/Lumos-TCC-main/php/Homepage.php" class="logo">
      <img src="/Lumos-TCC-main/images/Dashboard/logoLumos.png" alt="Logo Lumos">
    </a>
    <nav class="navbar">
      <?php
        $dashboardLink = '/Lumos-TCC-main/php/aluno.php'; 
        if (isset($_SESSION['tipo'])) {
            switch ($_SESSION['tipo']) {
                case 'aluno':
                    $dashboardLink = '/Lumos-TCC-main/php/aluno.php';
                    break;
                case 'professor':
                    $dashboardLink = '/Lumos-TCC-main/php/Dashboard.php';
                    break;
            }
        }
      ?>
      <a href="<?php echo $dashboardLink; ?>">Dashboard</a>
     
      <a href="/Lumos-TCC-main/php/Calendário.php" class="nav-item">
        <img src="/Lumos-TCC-main/images/Dashboard/calendario.png" alt="Calendário" class="nav-icon">
        <span>Calendário</span>
      </a>
      <div class="submenu">
        <div class="nav-item">
          <img src="/Lumos-TCC-main/images/Dashboard/grupo-de-usuarios.png" alt="Turmas" class="nav-icon">
          <span>Turmas</span>
        </div>
        <div id="lista-turmas-sidebar" class="lista-turmas-sidebar"></div>
      </div>
    </nav>
  </aside>

  <!-- MAIN -->
  <main class="main">
    <header class="topbar">
      <h1 class="page-title">Tarefa</h1>
      <a href="/Lumos-TCC-main/php/Perfil.php" class="btn-perfil" title="Ir para o perfil">👤</a>
    </header>

    <section class="tarefa-container">
      <?php if ($tarefa): ?>
        <div class="tarefa-info">
          <h2 id="titulo-tarefa">
              <?= !empty($tarefa['nomeJogos']) ? htmlspecialchars($tarefa['nomeJogos']) : htmlspecialchars($tarefa['titulo']) ?>
          </h2>
          <p>
              <strong>Área:</strong> 
              <span id="area-tarefa">
                  <?= !empty($tarefa['materiaJogo']) ? htmlspecialchars($tarefa['materiaJogo']) : htmlspecialchars($tarefa['materiaTarefa']) ?>
              </span>
          </p>
          <p>
              <strong>Data de Conclusão:</strong> 
              <span id="data-tarefa"><?= !empty($tarefa['dataEntrega']) ? date('d/m/Y', strtotime($tarefa['dataEntrega'])) : '-' ?></span>
          </p>
        </div>

        <?php if (!empty($tarefa['nomeJogos'])): ?>
        <div class="cards-container">
          <div class="card pequeno">
            <div class="card-img">
              <?php if (!empty($tarefa['imagemJogo'])): ?>
                <img src="<?= htmlspecialchars($tarefa['imagemJogo']) ?>" alt="<?= htmlspecialchars($tarefa['nomeJogos']) ?>">
              <?php else: ?>
                <img src="/Lumos-TCC-main/images/Dashboard/imagem-padrao.png" alt="Imagem padrão">
              <?php endif; ?>
            </div>
            <div class="card-content">
              <h3><?= htmlspecialchars($tarefa['nomeJogos']) ?></h3>
              <p><?= htmlspecialchars($tarefa['materiaJogo']) ?></p>
              <?php if (!empty($tarefa['paginaJogo'])): ?>
                <a href="<?= htmlspecialchars($tarefa['paginaJogo']) ?>" class="btn">Ver mais</a>
              <?php endif; ?>
            </div>
          </div>
        </div>
        <?php endif; ?>
      <?php else: ?>
        <p>Tarefa não encontrada.</p>
      <?php endif; ?>
    </section>
  </main>

  <script src="/Lumos-TCC-main/js/Dashboard.js"></script>
  <script src="/Lumos-TCC-main/js/tarefa.js"></script>
</body>
</html>
