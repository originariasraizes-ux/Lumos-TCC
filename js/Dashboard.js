/* ---------- Config ---------- */
const AREA_COLORS = {
   4: "#7e62a4",
   3: "#9D304A",
   2: "#efa019",
   1: "#8ec3cc"
};
const DEFAULT_COLOR = "#f1f5f9";

/* ---------- Estado ---------- */
let turmas = [];
let turmaAtual = null;

/* ---------- Helpers ---------- */
function generateInviteCode() {
  return Math.random().toString(36).slice(2, 9);
}

/* ---------- Render Turmas ---------- */
const listaTurmas = document.getElementById('lista-turmas');
const listaTurmasSidebar = document.getElementById('lista-turmas-sidebar');

function renderTurmas() {
  listaTurmas.innerHTML = '';
  listaTurmasSidebar.innerHTML = '';

  turmas.forEach((t, idx) => {
    const cor = AREA_COLORS[t.idMateria] || DEFAULT_COLOR;

    const card = document.createElement('div');
    card.className = `turma-card`;
    card.style.background = cor;
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-header">
        <h3>${t.nomeTurma}</h3>
        <button class="menu-btn">⋮</button>
        <ul class="menu-options">
          <li class="convidar">Convidar</li>
          <li class="excluir">Excluir</li>
        </ul>
      </div>
      <div class="card-icon">📘</div>
    `;

    // abrir turma
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
      alert(`Código da turma: ${t.idTurma}`);
      menuOptions.classList.remove("show");
    });

    // excluir
    menuOptions.querySelector(".excluir").addEventListener("click", async (ev) => {
      ev.stopPropagation();
      if (confirm(`Excluir turma "${t.nomeTurma}"?`)) {
        await excluirTurma(t.idTurma);
        await loadTurmasDoBanco();
      }
    });

    listaTurmas.appendChild(card);

    // link na sidebar
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = t.nomeTurma;
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
}

/* ---------- Views ---------- */
const dashboard = document.getElementById('dashboard-view');
const turmaView = document.getElementById('turma-view');
const tituloTurma = document.getElementById('titulo-turma');
const codigoConviteSpan = document.getElementById('codigo-convite');
const btnVoltar = document.getElementById('btn-voltar');

function openTurma(idx) {
  const t = turmas[idx];
  turmaAtual = t;
  tituloTurma.innerText = t.nomeTurma;
  codigoConviteSpan.innerText = t.idTurma;
  dashboard.style.display = "none";
  turmaView.style.display = "block";
  loadTarefasDaTurma(t.idTurma);
  loadJogosDaMateria(t.idMateria);
}

btnVoltar.addEventListener('click', () => {
  turmaView.style.display = "none";
  dashboard.style.display = "block";
  turmaAtual = null;
});

/* ---------- Modal Criar Turma ---------- */
const modal = document.getElementById('modal-nova-turma');
document.getElementById('abrirModal').addEventListener('click', () => modal.classList.remove('hidden'));
document.getElementById('fecharModal').addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('criarTurma').addEventListener('click', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nomeTurma').value.trim();
  const area = document.getElementById('areaTurma').value;
  if (!nome || !area || area === "Selecione uma área") {
    alert("Preencha todos os campos!");
    return;
  }
  const formData = new FormData();
  formData.append('nomeTurma', nome);
  formData.append('idMateria', area);

  try {
    const response = await fetch('/Lumos-TCC-main/php/CriarTurmas.php', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    if (result.ok) {
      alert(result.mensagem || "Turma criada com sucesso!");
      modal.classList.add('hidden');
      document.getElementById('nomeTurma').value = "";
      document.getElementById('areaTurma').selectedIndex = 0;
      await loadTurmasDoBanco();
    } else {
      alert(result.erro || "Erro desconhecido ao criar turma.");
    }
  } catch (error) {
    alert('Erro ao criar turma: ' + error);
  }
});

/* ---------- Modal Criar Tarefa ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const abrirModalTarefa = document.getElementById("abrirModalTarefa");
  const modalTarefa = document.getElementById("modal-nova-tarefa");
  const fecharModalTarefa = document.getElementById("fecharModalTarefa");
  const formTarefa = document.getElementById("formTarefa");

  if (abrirModalTarefa && modalTarefa) {
    abrirModalTarefa.addEventListener("click", () => {
      if (!turmaAtual) {
        alert("Selecione uma turma antes de criar uma tarefa!");
        return;
      }
      modalTarefa.classList.remove("hidden");
    });
  }

  if (fecharModalTarefa && modalTarefa) {
    fecharModalTarefa.addEventListener("click", () => modalTarefa.classList.add("hidden"));
  }

  if (modalTarefa) {
    modalTarefa.addEventListener("click", (e) => {
      if (e.target === modalTarefa) modalTarefa.classList.add("hidden");
    });
  }

  if (formTarefa) {
    formTarefa.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!turmaAtual) {
        alert("Nenhuma turma selecionada!");
        return;
      }

      const formData = new FormData(formTarefa);
      formData.append("idturma", turmaAtual.idTurma);
      formData.append("idmateria", turmaAtual.idMateria); // ✅ correção adicionada!

      if (!formData.get("idJogo")) {
        alert("Selecione um jogo!");
        return;
      }

      try {
        const response = await fetch(formTarefa.action, {
          method: "POST",
          body: formData
        });
        const result = await response.json();
        if (result.ok) {
          alert(result.mensagem || "Tarefa criada com sucesso!");
          modalTarefa.classList.add("hidden");
          formTarefa.reset();
          loadTarefasDaTurma(turmaAtual.idTurma);
        } else {
          alert(result.erro || "Erro ao criar tarefa.");
        }
      } catch (err) {
        alert("Erro ao criar tarefa: " + err);
      }
    });
  }
});

/* ---------- Listar Jogos ---------- */
async function loadJogosDaMateria(idMateria) {
  const selectJogo = document.getElementById("jogo");
  if (!selectJogo) return;

  selectJogo.innerHTML = `<option value="">Carregando jogos...</option>`;

  try {
    const response = await fetch(`/Lumos-TCC-main/php/ListarJogosPorMateria.php?idMateria=${idMateria}`);
    const jogos = await response.json();

    if (Array.isArray(jogos) && jogos.length > 0) {
      selectJogo.innerHTML = `<option value="">Selecione um jogo</option>`;
      jogos.forEach(jogo => {
        const opt = document.createElement("option");
        opt.value = jogo.idJogos;
        opt.textContent = jogo.nomeJogos;
        selectJogo.appendChild(opt);
      });
    } else {
      selectJogo.innerHTML = `<option value="">Nenhum jogo disponível</option>`;
    }
  } catch (err) {
    console.error("Erro ao carregar jogos:", err);
    selectJogo.innerHTML = `<option value="">Erro ao carregar jogos</option>`;
  }
}

/* ---------- Listar Tarefas ---------- */
async function loadTarefasDaTurma(idTurma) {
  try {
    const response = await fetch(`/Lumos-TCC-main/php/ListarTarefas.php?idTurma=${idTurma}`);
    const data = await response.json();

    const listaTarefas = document.getElementById("lista-tarefas");
    const semAtividades = document.querySelector(".sem-atividades");
    const comAtividades = document.querySelector(".com-atividades");
    const btnNovaTarefa = document.getElementById("abrirModalTarefa");

    listaTarefas.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      semAtividades.style.display = "flex";
      comAtividades.style.display = "none";
      listaTarefas.style.display = "none";
      btnNovaTarefa.style.display = "inline-block";
      return;
    }

    semAtividades.style.display = "none";
    comAtividades.style.display = "flex";
    listaTarefas.style.display = "flex";
    btnNovaTarefa.style.display = "inline-block";

    data.forEach(tarefa => {
      const card = document.createElement("a");
      card.href = `/Lumos-TCC-main/php/tarefa.php?id=${tarefa.idTarefa}`;
      card.className = "tarefa-card";
      card.innerHTML = `
        <div class="tarefa-info">
          <h3>${tarefa.titulo}</h3>
          <p>${tarefa.descricao || "Sem descrição"}</p>
          <small class="data">Entrega: ${tarefa.dataEntrega || "Sem data"}</small>
        </div>
      `;
      listaTarefas.appendChild(card);
    });

  } catch (e) {
    console.error("Erro ao carregar tarefas:", e);
  }
}

/* ---------- Banco de Dados ---------- */
async function loadTurmasDoBanco() {
  try {
    const response = await fetch('/Lumos-TCC-main/php/ListarTurmas.php');
    const data = await response.json();
    turmas = data;
    renderTurmas();
  } catch (e) {
    console.error('Erro ao carregar turmas:', e);
  }
}

async function excluirTurma(idTurma) {
  try {
    const response = await fetch('/Lumos-TCC-main/php/ExcluirTurmas.php', {
      method: 'POST',
      body: new URLSearchParams({ idTurma })
    });
    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Erro ao excluir turma:', error);
    alert('Erro ao excluir turma.');
  }
}

/* ---------- Sidebar toggle ---------- */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadTurmasDoBanco();
});
