<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <title>Calendário - Lumos</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/Lumos-TCC-main/css/Calendário.css" />
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
      <img src="/Lumos-TCC-main/images/Dashboard/casa.png" alt="Início" class="nav-icon">
      <span>Início</span>
    </a>

    <a href="Calendário.html" class="nav-item">
      <img src="/Lumos-TCC-main/images/Dashboard/calendario.png" alt="Calendário" class="nav-icon">
      <span>Calendário</span>
    </a>

    <div class="submenu">
      <div class="nav-item">
        <img src="/Lumos-TCC-main/images/Dashboard/grupo-de-usuarios.png" alt="Turmas" class="nav-icon">
        <span>Turmas</span>
      </div>
      <!-- Aqui as turmas criadas serão inseridas -->
      <div id="lista-turmas-sidebar" class="lista-turmas-sidebar"></div>
    </div>
  </nav>
</aside>

  <!-- MAIN -->
  <main class="main">
    <header class="header">
      <h2>Calendário</h2>
    </header>

    <section id="calendario-view">
      <div class="navegacao">
        <button id="prev">&lt;</button>
        <span id="mes-ano"></span>
        <button id="next">&gt;</button>
      </div>
      <table class="calendario">
        <thead>
          <tr>
            <th>DOM</th><th>SEG</th><th>TER</th><th>QUA</th><th>QUI</th><th>SEX</th><th>SAB</th>
          </tr>
        </thead>
        <tbody id="dias-container"></tbody>
      </table>
    </section>
  </main>

  <!-- MODAL SELEÇÃO TURMA -->
  <div id="modal-turma" class="modal hidden">
    <div class="modal-content">
      <h3>Selecionar turma</h3>
      <select id="turmaSelect"></select>
      <div class="modal-buttons">
        <button id="cancelar" class="btn-cancelar">Cancelar</button>
        <button id="salvar" class="btn-confirmar">Salvar</button>
        <button id="excluir-dia" class="btn-excluir" style="display:none">Excluir do dia</button>
      </div>
    </div>
  </div>

  <script src="/Lumos-TCC-main/js/Calendário.js"></script>
</body>
</html>
