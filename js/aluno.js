/* Dashboard Aluno.js */

const AREA_COLORS = {
  "Ciências Naturais": "#8ec3cc",
  "Ciências Humanas": "#efa019",
  "Ciências Exatas": "#9D304A",
  "Idiomas e Comunicação": "#7e62a4"
};
const DEFAULT_COLOR = "#f1f5f9";

let turmasAluno = [];
let turmaAtual = null;

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

function escapeHtml(str){ 
  return String(str || '').replace(/[&<>"']/g, 
    m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])
  ); 
}

/* ---------- Render Turmas ---------- */
function renderTurmasAluno() {
  const lista = $('#lista-turmas');
  const sidebar = $('#lista-turmas-sidebar');
  if (!lista || !sidebar) return;

  lista.innerHTML = '';
  sidebar.innerHTML = '';

  turmasAluno.forEach((t, idx) => {
    const cor = AREA_COLORS[t.area] || DEFAULT_COLOR;

    // Card da turma
    const card = document.createElement('div');
    card.className = 'turma-card';
    card.style.background = cor;
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-header">
        <h3>${escapeHtml(t.nome)}</h3>
        <button class="menu-btn">⋮</button>
        <ul class="menu-options">
          <li class="sair">Sair da turma</li>
        </ul>
      </div>
      <div class="card-icon">📘</div>
    `;

    // Abrir turma
    card.addEventListener('click', e => {
      if (e.target.closest('.menu-btn') || e.target.closest('.menu-options')) return;
      openTurmaAluno(idx);
    });

    // Toggle menu
    const menuBtn = card.querySelector('.menu-btn');
    const menuOptions = card.querySelector('.menu-options');
    menuBtn.addEventListener('click', ev => {
      ev.stopPropagation();
      $$('.menu-options').forEach(m => m.classList.remove('show'));
      menuOptions.classList.toggle('show');
    });

    // Sair da turma
    menuOptions.querySelector('.sair').addEventListener('click', ev => {
      ev.stopPropagation();
      if (confirm(`Deseja sair da turma "${t.nome}"?`)) {
        sairDaTurma(t.idTurma);
      }
      menuOptions.classList.remove('show');
    });

    lista.appendChild(card);

    // Sidebar
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = t.nome;
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.style.gap = '6px';
    link.style.marginBottom = '6px';
    const bolinha = document.createElement('span');
    bolinha.style.width = '12px';
    bolinha.style.height = '12px';
    bolinha.style.borderRadius = '50%';
    bolinha.style.background = cor;
    link.prepend(bolinha);
    link.addEventListener('click', ev => {
      ev.preventDefault();
      openTurmaAluno(idx);
    });
    sidebar.appendChild(link);
  });
}

/* ---------- Abrir Turma ---------- */
function openTurmaAluno(idx) {
  const t = turmasAluno[idx];
  if (!t) return;

  turmaAtual = t;
  $('#titulo-turma').innerText = t.nome;
  $('#header-turma')?.style.setProperty('background', AREA_COLORS[t.area] || DEFAULT_COLOR);

  $('#dashboard-view').style.display = 'none';
  $('#turma-view').style.display = 'block';

  carregarTarefasDaTurma(t.idTurma);
}

/* ---------- Render Tarefas ---------- */
function renderAtividades(atividades) {
  const lista = $('#lista-tarefas');
  const semAtividades = $('#sem-atividades');
  lista.innerHTML = '';

  if (!atividades || atividades.length === 0) {
    semAtividades?.classList.remove('hidden');
    lista.classList.add('hidden');
    return;
  }

  semAtividades?.classList.add('hidden');
  lista.classList.remove('hidden');

  atividades.forEach(a => {
  const card = document.createElement('a');
  card.href = `/Lumos-TCC-main/php/tarefa.php?id=${a.idTarefa}`; 
  card.className = 'tarefa-card';
  card.innerHTML = `
    <div class="tarefa-info">
      <h3>${escapeHtml(a.titulo)}</h3>
      <p>${escapeHtml(a.descricao || "Sem descrição")}</p>
      <p class="data">Entrega: ${escapeHtml(a.dataEntrega || "Sem data")}</p>
    </div>
  `;
  lista.appendChild(card);
});

}

/* ---------- Voltar ---------- */
$('#btn-voltar')?.addEventListener('click', () => {
  $('#turma-view').style.display = 'none';
  $('#dashboard-view').style.display = 'block';
  turmaAtual = null;
});

/* ---------- Modal Participar ---------- */
const modal = $('#modal-participar-turma');
$('#abrirModalParticipar')?.addEventListener('click', () => modal.classList.remove('hidden'));
$('#fecharModalParticipar')?.addEventListener('click', () => modal.classList.add('hidden'));
modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

$('#confirmarParticipar')?.addEventListener('click', () => {
  let codigo = $('#codigoTurma').value.replace(/\D/g,'').trim();
  if (!codigo) { alert('Digite o código da turma!'); return; }

  fetch('/Lumos-TCC-main/php/ParticiparTurma.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: "codigoTurma=" + encodeURIComponent(codigo)
  })
  .then(res => res.json())
  .then(data => {
    console.log('Resposta do PHP:', data);
    if (data.erro) alert(data.erro);
    else {
      alert(data.mensagem);
      carregarTurmasAluno();
      modal.classList.add('hidden');
    }
  })
  .catch(err => console.error('Erro ao entrar na turma:', err));
});

/* ---------- Sair da Turma ---------- */
function sairDaTurma(idTurma) {
  if (!idTurma) return;
  fetch('/Lumos-TCC-main/php/SairTurma.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ idTurma })
  })
  .then(res => res.json())
  .then(data => {
    if (data.erro) alert(data.erro);
    else {
      alert(data.mensagem);
      carregarTurmasAluno();
    }
  })
  .catch(err => console.error('Erro ao sair da turma:', err));
}

/* ---------- Carregar Turmas ---------- */
function carregarTurmasAluno() {
  fetch('/Lumos-TCC-main/php/ListarTurmasAluno.php')
    .then(res => res.json())
    .then(turmas => {
      if (Array.isArray(turmas)) {
        turmasAluno = turmas.map(t => ({
          idTurma: t.idTurma,
          nome: t.nome,
          area: t.area
        }));
        renderTurmasAluno();
      }
    })
    .catch(err => console.error('Erro ao buscar turmas:', err));
}

/* ---------- Carregar Tarefas ---------- */
function carregarTarefasDaTurma(idTurma) {
  fetch(`/Lumos-TCC-main/php/ListarTarefas.php?idTurma=${idTurma}`)
    .then(res => res.json())
    .then(data => {
      const listaTarefas = document.getElementById("lista-tarefas");
      const semAtividades = document.querySelector(".sem-atividades");
      const comAtividades = document.querySelector(".com-atividades");
      const btnNovaTarefa = document.getElementById("abrirModalTarefa");

      listaTarefas.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        // Sem tarefas
        semAtividades.style.display = "flex";
        comAtividades.style.display = "none";
        listaTarefas.style.display = "none";
        if (btnNovaTarefa) btnNovaTarefa.style.display = "inline-block";
      } else {
        // Com tarefas
        semAtividades.style.display = "none";
        comAtividades.style.display = "flex";
        listaTarefas.style.display = "flex";
        if (btnNovaTarefa) btnNovaTarefa.style.display = "inline-block";

        renderAtividades(data); // Renderiza as tarefas
      }
    })
    .catch(err => console.error('Erro ao buscar tarefas:', err));
}

/* ---------- Sidebar ---------- */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  carregarTurmasAluno();
});
