/* ================== CALENDÁRIO ================== */

/* --- Constantes e estado --- */
const diasContainer = document.getElementById("dias-container");
const mesAnoSpan   = document.getElementById("mes-ano");
const prevBtn      = document.getElementById("prev");
const nextBtn      = document.getElementById("next");

const modalTurma   = document.getElementById("modal-turma");
const turmaSelect  = document.getElementById("turmaSelect");
const btnCancelar  = document.getElementById("cancelar");
const btnSalvar    = document.getElementById("salvar");
const btnExcluir   = document.getElementById("excluir-dia");

let selectedDay   = null;
let selectedMonth = new Date().getMonth();
let selectedYear  = new Date().getFullYear();

const STORAGE_KEY = "lumos_turmas_v1";
let turmas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

/* Mesmas 4 cores do Dashboard */
const AREA_COLORS = {
  "Linguagens": "#7e62a4",
  "Matemática": "#9D304A",
  "Ciências Humanas": "#efa019",
  "Ciências da Natureza": "#8ec3cc"
};
const DEFAULT_COLOR = "#ef7b9c";

function getTurmaColor(t) {
  return t?.cor || AREA_COLORS[t?.area] || DEFAULT_COLOR;
}

/* Eventos no localStorage */
let eventos = {};
try { eventos = JSON.parse(localStorage.getItem("eventos")) || {}; }
catch { eventos = {}; }

/* ---------- Sidebar de turmas ---------- */
const listaTurmasSidebar = document.getElementById("lista-turmas-sidebar");
function renderSidebarTurmas() {
  listaTurmasSidebar.innerHTML = "";
  if (turmas.length === 0) {
    listaTurmasSidebar.innerHTML = `<p style="font-size:0.9rem; color:#888;">Nenhuma turma criada</p>`;
    return;
  }
  turmas.forEach((t) => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = t.nome;
    link.style.display = "flex";
    link.style.alignItems = "center";
    link.style.gap = "6px";
    link.style.marginBottom = "8px";
    link.style.fontWeight = "600";
    link.style.color = "#333";

    const cor = document.createElement("span");
    cor.style.display = "inline-block";
    cor.style.width = "14px";
    cor.style.height = "14px";
    cor.style.borderRadius = "50%";
    cor.style.background = getTurmaColor(t);

    link.prepend(cor);
    listaTurmasSidebar.appendChild(link);
  });
}

/* ---------- Select do modal ---------- */
function preencherSelect() {
  turmaSelect.innerHTML = `<option value="" disabled selected>Escolha uma turma</option>`;
  if (turmas.length === 0) {
    turmaSelect.innerHTML += `<option disabled>(Nenhuma turma criada)</option>`;
  } else {
    turmas.forEach((t, idx) => {
      turmaSelect.innerHTML += `<option value="${idx}">${t.nome}</option>`;
    });
  }
}

/* ---------- Geração do calendário ---------- */
function gerarCalendario(mes, ano) {
  diasContainer.innerHTML = "";
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  mesAnoSpan.textContent = new Date(ano, mes).toLocaleString("pt-BR", { month: "long", year: "numeric" });

  let dia = 1;
  for (let i = 0; i < 6; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const td = document.createElement("td");

      if ((i === 0 && j < primeiroDiaSemana) || dia > ultimoDia) {
        tr.appendChild(td);
        continue;
      }

      td.innerHTML = `<span class="dia">${dia}</span>`;
      const chave = `${ano}-${mes + 1}-${dia}`;

      // Exibe turma salva no dia (com a cor correta)
      if (eventos[chave]) {
        const turmaSpan = document.createElement("span");
        turmaSpan.className = "turma-label";
        turmaSpan.textContent = eventos[chave].nome;
        turmaSpan.style.background = eventos[chave].cor || DEFAULT_COLOR;
        td.appendChild(turmaSpan);
      }

      // Abertura do modal ao clicar
      td.addEventListener("click", () => {
        selectedDay = parseInt(td.querySelector(".dia").textContent);
        const key = `${selectedYear}-${selectedMonth + 1}-${selectedDay}`;

        preencherSelect();
        // Se já houver turma nesse dia, mostra "Excluir" e pré-seleciona
        if (eventos[key]) {
          btnExcluir.style.display = "inline-block";
          const idx = turmas.findIndex(t => t.nome === eventos[key].nome);
          if (idx >= 0) turmaSelect.value = String(idx);
        } else {
          btnExcluir.style.display = "none";
        }
        modalTurma.classList.remove("hidden");
      });

      tr.appendChild(td);
      dia++;
    }
    diasContainer.appendChild(tr);
  }
}

/* ---------- Navegação meses ---------- */
prevBtn?.addEventListener("click", () => {
  selectedMonth--;
  if (selectedMonth < 0) { selectedMonth = 11; selectedYear--; }
  gerarCalendario(selectedMonth, selectedYear);
});
nextBtn?.addEventListener("click", () => {
  selectedMonth++;
  if (selectedMonth > 11) { selectedMonth = 0; selectedYear++; }
  gerarCalendario(selectedMonth, selectedYear);
});

/* ---------- Modal ações ---------- */
btnCancelar?.addEventListener("click", () => modalTurma.classList.add("hidden"));

btnSalvar?.addEventListener("click", () => {
  if (!selectedDay || turmaSelect.value === "") return;
  const idx = parseInt(turmaSelect.value);
  const turmaEscolhida = turmas[idx];
  if (!turmaEscolhida) return;

  const chave = `${selectedYear}-${selectedMonth + 1}-${selectedDay}`;
  eventos[chave] = {
    nome: turmaEscolhida.nome,
    cor: getTurmaColor(turmaEscolhida)
  };
  localStorage.setItem("eventos", JSON.stringify(eventos));
  modalTurma.classList.add("hidden");
  gerarCalendario(selectedMonth, selectedYear);
});

btnExcluir?.addEventListener("click", () => {
  if (!selectedDay) return;
  const chave = `${selectedYear}-${selectedMonth + 1}-${selectedDay}`;
  if (eventos[chave]) {
    delete eventos[chave];
    localStorage.setItem("eventos", JSON.stringify(eventos));
  }
  modalTurma.classList.add("hidden");
  gerarCalendario(selectedMonth, selectedYear);
});

/* ---------- Sidebar toggle ---------- */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  gerarCalendario(selectedMonth, selectedYear);
  renderSidebarTurmas();
});
