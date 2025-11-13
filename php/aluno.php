<?php
include 'db.php';
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="/Lumos-TCC-main/css/Dashboard.css">
  <title>Dashboard Aluno</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <a href="/Lumos-TCC-main/php/aluno.php" class="nav-item">
        <img src="/Lumos-TCC-main/images/Dashboard/casa.png" alt="Início" class="nav-icon">
        <span>Início</span>
      </a>

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
      <h1 class="page-title">Olá Aluno!</h1>
      <div class="topbar-buttons">
        <button class="btn-criar-turma" id="abrirModalParticipar">+ Participar da turma</button>
        <a href="/Lumos-TCC-main/php/Perfil.php" class="btn-perfil" title="Ir para o perfil">👤</a>
      </div>
    </header>

    <!-- DASHBOARD -->
    <section id="dashboard-view">
      <div class="turmas" id="lista-turmas"></div>
    </section>

    <!-- TELA DE UMA TURMA -->
    <section id="turma-view" style="display:none;">
      <button id="btn-voltar" class="btn-voltar">← Voltar</button>

      <div class="turma-card preview" id="header-turma">
        <div class="turma-top">
          <h2 id="titulo-turma">Nome da Turma</h2>
          <div class="card-icon">📘</div>
        </div>
      </div>
      <!-- SEM ATIVIDADES -->
      <div class="sem-atividades">
        <div class="mensagem">
          <p><strong id="mensagem-turma">Nenhuma atividade foi programada ainda.</strong></p>
          <img src="/Lumos-TCC-main/images/Dashboard/SemTarefas.gif" alt="Sem atividades" />
        </div>
      </div>

      <!-- COM ATIVIDADES -->
      <div class="com-atividades" style="display:none;">
        <div class="mensagem-comtarefa">
          <p><strong>Sua turma já tem atividades programadas!</strong></p>
          <img src="/Lumos-TCC-main/images/Dashboard/ComTarefas.gif" alt="Com atividades" />
        </div>
     
        <div class="lista-tarefas" id="lista-tarefas"></div>
        
      </div>
    </section>
  </main>

  <!-- MODAL PARTICIPAR TURMA -->
  <div id="modal-participar-turma" class="modal hidden">
    <div class="modal-content">
      <h2>Participar da turma</h2>
      <label for="codigoTurma">Insira o código da turma</label>
      <input type="text" id="codigoTurma" placeholder="Ex.: 12(id da Turma)" />
      <div class="modal-buttons">
        <button id="fecharModalParticipar" class="btn-cancelar">Cancelar</button>
        <button id="confirmarParticipar" class="btn-confirmar">Participar</button>
      </div>
    </div>
  </div>

  <script src="/Lumos-TCC-main/js/aluno.js"></script>
</body>
</html>
