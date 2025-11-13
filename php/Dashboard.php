<?php 
include 'db.php';
session_start();
$materias = $conn->query("SELECT idMateria, nomeMateria FROM tbMateria");
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="/Lumos-TCC-main/css/Dashboard.css">
  <title>Dashboard Professor</title>
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
    <a href="/Lumos-TCC-main/Dashboard.php" class="nav-item">
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
      <h1 class="page-title"> Olá Professor!</h1>
      <div class="topbar-buttons">
        <button class="btn-criar-turma" id="abrirModal">+ Criar turma</button>
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
  <div class="turma-card preview">
    <div class="turma-top">
      <h2 id="titulo-turma">Nome da Turma</h2>
      <div class="card-icon">🌐</div>
    </div>
  </div>
  <div class="convite">
    <p>Código de convite:</p>
    <div class="codigo">
      <span id="codigo-convite">—</span>
      <button class="copiar" id="btn-copiar">📋</button>
    </div>
  </div>
  <div class="sem-atividades">
    <div class="mensagem">
      <p><strong id="mensagem-turma">Nenhuma atividade foi programada ainda.</strong></p>
      <img src="/Lumos-TCC-main/images/Dashboard/SemTarefas.gif" alt="Sem atividades" />
    </div>
  </div>
<div class="com-atividades" style="display:none;">
  <div class="mensagem-comtarefa">
    <p><strong>Sua turma já tem atividades programadas!</strong></p>
    <img src="/Lumos-TCC-main/images/Dashboard/ComTarefas.gif" alt="Com atividades" />
  </div>

  <div class="lista-tarefas" id="lista-tarefas"></div>

</div>

  
  <button id="abrirModalTarefa" class="btn-criar-tarefa">+ Nova tarefa</button>
</section>
</main>
  <!-- MODAL CRIAR TURMA -->
   <form id="formTurma" action="/Lumos-TCC-main/php/CriarTurmas.php" method="POST">
  <div id="modal-nova-turma" class="modal hidden">
    <div class="modal-content">
      <h2>Criar turma</h2>
      <label for="nomeTurma">Nome da turma</label>
      <input name="nomeTurma" type="text" id="nomeTurma" placeholder="Nome da turma" />
      <label for="areaTurma">Área de conhecimento</label>
      <select name="idMateria" id="areaTurma">
        <option value="" selected>Selecione uma área</option>
        <?php
        $materias = $conn->query("SELECT idMateria, nomeMateria FROM tbMateria");
        while ($row = $materias->fetch_assoc()) {
            echo "<option value='{$row['idMateria']}'>{$row['nomeMateria']}</option>";
        }
        ?>
      </select>
      <div class="modal-buttons">
        <button type="button"  id="fecharModal" class="btn-cancelar">Cancelar</button>
        <button type="submit" id="criarTurma" class="btn-confirmar">Criar</button>
      </div>
    </div>
  </div>
</form>
  <!-- MODAL CRIAR TAREFA -->
   <form id="formTarefa" action="/Lumos-TCC-main/php/CriarTarefas.php" method="POST">
<div id="modal-nova-tarefa" class="modal hidden">
  <div class="modal-content">
    <h2>Criar tarefa</h2>
   <div class="form-group">
  <label for="jogo">Selecione o jogo:</label>
  <select id="jogo" name="idJogo">
    <option value="">Selecione um jogo</option>
  </select>
</div>
    <label for="tarefaTitulo">Título</label>
    <input name="titulo" type="text" id="tarefaTitulo" placeholder="Ex.: Lista 01" />
    <label for="tarefaDescricao">Descrição</label>
    <textarea name="descricao" id="tarefaDescricao" rows="3" placeholder="Detalhes da tarefa"></textarea>
    <label for="tarefaData">Data</label>
    <input name="dataEntrega" type="date" id="tarefaData" />
    <div class="modal-buttons">
      <button type="button" id="fecharModalTarefa" class="btn-cancelar">Cancelar</button>
      <button type="submit" id="criarTarefa" class="btn-confirmar">Criar</button>
    </div>
  </div>
</div>
</form>
  <!-- JS externo -->
  <script src="/Lumos-TCC-main/js/Dashboard.js"></script>
  <?php $conn->close(); ?>
</body>
</html>