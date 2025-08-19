/* ---------- Constantes ---------- */
const STORAGE_KEY = "lumos_turmas_v1";
let turmas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const card = document.getElementById("turma-card");
const listaSidebar = document.getElementById("lista-turmas-sidebar");

const AREA_COLORS = {
  "Linguagens": "#7e62a4",
  "Matemática": "#9D304A",
  "Ciências Humanas": "#efa019",
  "Ciências da Natureza": "#8ec3cc"
};
const DEFAULT_COLOR = "#ccc";

/* ---------- Sidebar ---------- */
function renderSidebar() {
  listaSidebar.innerHTML = "";
  turmas.forEach((t, idx) => {
    const link = document.createElement("a");
    link.href = `Turma.html?idx=${idx}`;
    link.textContent = t.nome;
    link.style.display = "flex";
    link.style.alignItems = "center";
    link.style.gap = "6px";
    const bolinha = document.createElement("span");
    bolinha.style.width = "12px"; bolinha.style.height = "12px"; bolinha.style.borderRadius = "50%";
    bolinha.style.background = t.cor || AREA_COLORS[t.area] || DEFAULT_COLOR;
    link.prepend(bolinha);
    listaSidebar.appendChild(link);
  });
}

/* ---------- Render Turma ---------- */
function renderTurma() {
  const params = new URLSearchParams(window.location.search);
  const idx = parseInt(params.get("idx"));
  const turma = turmas[idx];
  if (!turma) {
    card.innerHTML = "<p>Turma não encontrada.</p>";
    return;
  }

  const color = turma.cor || AREA_COLORS[turma.area] || DEFAULT_COLOR;
  card.style.background = color;

  const left = document.createElement("div");
  left.className = "turma-left";
  left.innerHTML = `<h1>${turma.nome}</h1>`;

  if (!turma.atividades || turma.atividades.length === 0) {
    // Layout 1
    left.innerHTML += `
      <p>Nenhuma atividade foi programada ainda.</p>
      <button class="btn-criar" onclick="criarAtividade(${idx})">+ Criar</button>
    `;
  } else {
    // Layout 2
    left.innerHTML += `<p>Sua turma já tem atividades programadas!</p>
                       <button class="btn-criar" onclick="criarAtividade(${idx})">+ Criar</button>`;
    const lista = document.createElement("div");
    lista.className = "atividades";
    turma.atividades.forEach((a,i) => {
      const div = document.createElement("div");
      div.className = "atividade";
      div.innerHTML = `
        <span>${a}</span>
        <span>
          <button onclick="editarAtividade(${idx},${i})">✏️</button>
          <button onclick="excluirAtividade(${idx},${i})">❌</button>
        </span>
      `;
      lista.appendChild(div);
    });
    left.appendChild(lista);
  }

  // Bloco de convite
  left.innerHTML += `
    <div class="convite">
      Código da turma:
      <div class="codigo">
        <span id="codigo">${turma.code}</span>
        <button onclick="copiarCodigo('${turma.code}')">📋</button>
      </div>
    </div>
  `;

  const right = document.createElement("div");
  right.className = "turma-right";
  right.innerHTML = `<img src="imagens/placeholder.png" alt="Imagem decorativa">`;

  card.innerHTML = "";
  card.appendChild(left);
  card.appendChild(right);
}

/* ---------- Atividades ---------- */
function criarAtividade(idx) {
  const nova = prompt("Descrição da atividade:");
  if (nova) {
    turmas[idx].atividades = turmas[idx].atividades || [];
    turmas[idx].atividades.push(nova);
    salvarTurmas();
    renderTurma();
  }
}
function editarAtividade(idxTurma, idxAtiv) {
  const novo = prompt("Editar atividade:", turmas[idxTurma].atividades[idxAtiv]);
  if (novo) {
    turmas[idxTurma].atividades[idxAtiv] = novo;
    salvarTurmas();
    renderTurma();
  }
}
function excluirAtividade(idxTurma, idxAtiv) {
  if (confirm("Excluir atividade?")) {
    turmas[idxTurma].atividades.splice(idxAtiv,1);
    salvarTurmas();
    renderTurma();
  }
}
function copiarCodigo(code) {
  navigator.clipboard.writeText(code);
  alert("Código copiado!");
}

/* ---------- Utils ---------- */
function salvarTurmas() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turmas));
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  renderTurma();
});
