/* ---------- Config ---------- */
const STORAGE_KEY = 'lumos_turmas_v1';
const AREA_COLORS = {
  "Linguagens": "#7e62a4",
  "Matemática": "#9D304A",
  "Ciências Humanas": "#efa019",
  "Ciências da Natureza": "#8ec3cc"
};
const DEFAULT_COLOR = "#f1f5f9";

/* ---------- Estado ---------- */
let turmas = [];

/* ---------- Helpers ---------- */
function generateInviteCode() {
  return Math.random().toString(36).slice(2, 9);
}
function saveTurmas() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turmas));
}
function loadTurmas() {
  const raw = localStorage.getItem(STORAGE_KEY);
  turmas = raw ? JSON.parse(raw) : [];
}

/* ---------- Render ---------- */
const listaTurmas = document.getElementById('lista-turmas');
const listaTurmasSidebar = document.getElementById('lista-turmas-sidebar');

function renderTurmas() {
  listaTurmas.innerHTML = '';
  listaTurmasSidebar.innerHTML = '';
  turmas.forEach((t, idx) => {
    const cor = AREA_COLORS[t.area] || t.cor || DEFAULT_COLOR;

    // card principal
    const card = document.createElement('div');
    card.className = `turma-card`;
    card.style.background = cor;
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-header">
        <h3>${t.nome}</h3>
        <button class="menu-btn">⋮</button>
        <ul class="menu-options">
          <li class="convidar">Convidar</li>
          <li class="editar">Editar</li>
          <li class="copiar">Copiar</li>
          <li class="excluir">Excluir</li>
        </ul>
      </div>
      <div class="card-icon">📘</div>
    `;
    card.addEventListener('click', (e) => {
      if (e.target.closest(".menu-btn") || e.target.closest(".menu-options")) return;
      openTurma(idx);
    });

    // menu toggle
    const menuBtn = card.querySelector(".menu-btn");
    const menuOptions = card.querySelector(".menu-options");
    menuBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      document.querySelectorAll(".menu-options").forEach(m => m.classList.remove("show"));
      menuOptions.classList.toggle("show");
    });

    // convidar
    menuOptions.querySelector(".convidar").addEventListener("click", (ev) => {
      ev.stopPropagation();
      alert(`Link de convite gerado: https://lumos.com/turma/${t.code}`);
      menuOptions.classList.remove("show");
    });

    // editar
    menuOptions.querySelector(".editar").addEventListener("click", (ev) => {
      ev.stopPropagation();
      const novoNome = prompt("Novo nome:", t.nome);
      if (novoNome) {
        t.nome = novoNome;
        saveTurmas();
        renderTurmas();
      }
    });

    // copiar
    menuOptions.querySelector(".copiar").addEventListener("click", (ev) => {
      ev.stopPropagation();
      navigator.clipboard.writeText(t.code);
      alert(`Código copiado: ${t.code}`);
      menuOptions.classList.remove("show");
    });

    // excluir
    menuOptions.querySelector(".excluir").addEventListener("click", (ev) => {
      ev.stopPropagation();
      if (confirm(`Excluir turma "${t.nome}"?`)) {
        turmas.splice(idx, 1);
        saveTurmas();
        renderTurmas();
      }
    });

    listaTurmas.appendChild(card);

    // link sidebar
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = t.nome;
    link.style.display = "flex";
    link.style.alignItems = "center";
    link.style.gap = "6px";
    link.style.marginBottom = "6px";
    link.style.color = "#333";
    const bolinha = document.createElement("span");
    bolinha.style.width = "12px";
    bolinha.style.height = "12px";
    bolinha.style.borderRadius = "50%";
    bolinha.style.background = cor;
    link.prepend(bolinha);
    listaTurmasSidebar.appendChild(link);
  });

  // fecha menus ao clicar fora
  document.body.addEventListener("click", () => {
    document.querySelectorAll(".menu-options").forEach(m => m.classList.remove("show"));
  });
}

/* ---------- Views ---------- */
const dashboard = document.getElementById('dashboard-view');
const turmaView = document.getElementById('turma-view');
const tituloTurma = document.getElementById('titulo-turma');
const codigoConviteSpan = document.getElementById('codigo-convite');
const btnVoltar = document.getElementById('btn-voltar');

function openTurma(idx) {
  const t = turmas[idx];
  tituloTurma.innerText = t.nome;
  codigoConviteSpan.innerText = t.code;
  dashboard.style.display = "none";
  turmaView.style.display = "block";
}
btnVoltar.addEventListener('click', () => {
  turmaView.style.display = "none";
  dashboard.style.display = "block";
});

/* ---------- Modal Criar Turma ---------- */
const modal = document.getElementById('modal-nova-turma');
document.getElementById('abrirModal').addEventListener('click', () => modal.classList.remove('hidden'));
document.getElementById('fecharModal').addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('criarTurma').addEventListener('click', () => {
  const nome = document.getElementById('nomeTurma').value.trim();
  const area = document.getElementById('areaTurma').value;
  if (!nome || area === "Selecione uma área") {
    alert("Preencha todos os campos!");
    return;
  }
  const cor = AREA_COLORS[area] || DEFAULT_COLOR;
  const nova = { nome, area, cor, code: generateInviteCode() };
  turmas.push(nova);
  saveTurmas();
  renderTurmas();
  document.getElementById('nomeTurma').value = "";
  document.getElementById('areaTurma').selectedIndex = 0;
  modal.classList.add('hidden');
});

/* ---------- Sidebar toggle ---------- */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadTurmas();
  renderTurmas();
});
