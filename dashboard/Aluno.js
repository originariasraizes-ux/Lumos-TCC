const KEY_TURMAS   = "lumos_turmas_v2";
const KEY_TAREFAS  = "lumos_tarefas_v2";
const KEY_XP_ALUNO = "lumos_xp_aluno_v2"; // total do aluno

const AREA_TO_COLOR = {
  "Linguagens": {slug:"roxo",   hex:"#7e62a4"},
  "Matemática": {slug:"vinho",  hex:"#9D304A"},
  "Ciências Humanas": {slug:"laranja",hex:"#efa019"},
  "Ciências da Natureza":{slug:"azul",hex:"#8ec3cc"},
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

let turmas  = JSON.parse(localStorage.getItem(KEY_TURMAS))  || [];
let tarefas = JSON.parse(localStorage.getItem(KEY_TAREFAS)) || {};
let xpTotal = +localStorage.getItem(KEY_XP_ALUNO) || 0;

document.addEventListener("DOMContentLoaded", () => {
  $("#nomeAlunoSidebar").textContent = localStorage.getItem("nomeUsuario") || "Aluno";
  $("#xpTotal").textContent = xpTotal;

  $("#btnHamburguerAluno").addEventListener("click", ()=>$("#sidebarAluno").classList.toggle("open"));

  // tabs
  $$(".tab-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      $$(".tab-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      $$(".tab-panel").forEach(p=>p.classList.remove("show"));
      $("#"+tab).classList.add("show");
    });
  });

  // sidebar navegação interna
  $$(".nav-link[data-goto]").forEach(a=>{
    a.addEventListener("click", ()=>{
      const id = a.dataset.goto;
      document.querySelector(`[data-tab='${id}']`)?.click();
      $$(".nav-link").forEach(n=>n.classList.remove("active"));
      a.classList.add("active");
      $("#sidebarAluno").classList.remove("open");
    });
  });

  renderMinhasTurmas();
  renderMinhasTarefas();
  renderMeuProgresso();

  $("#btnEntrarTurma").addEventListener("click", entrarTurmaPorCodigo);
});

function renderMinhasTurmas(){
  const wrap = $("#cardsMinhasTurmas");
  wrap.innerHTML = "";
  if(turmas.length===0){ wrap.innerHTML = `<div class="item">Nenhuma turma disponível.</div>`; return; }

  turmas.forEach(t=>{
    const cor = AREA_TO_COLOR[t.area]?.slug || "vinho";
    const el = document.createElement("div");
    el.className = `card ${cor}`;
    el.innerHTML = `
      <div class="title">${t.nome}</div>
      <div class="code">Código: ${t.codigo}</div>
    `;
    wrap.appendChild(el);
  });
}

function renderMinhasTarefas(){
  const list = $("#listaMinhasTarefas"); list.innerHTML = "";
  let todas = [];
  Object.entries(tarefas).forEach(([turmaId, arr])=>{
    const t = turmas.find(x=>x.id===turmaId);
    arr.forEach(task=>todas.push({tarefa:task,turma:t}));
  });
  if(todas.length===0){ list.innerHTML = `<div class="item">Sem tarefas ainda.</div>`; return; }

  todas.forEach(({tarefa,turma})=>{
    const cor = AREA_TO_COLOR[turma?.area]?.hex || "#9D304A";
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <strong>${tarefa.titulo}</strong>
          <div style="font-size:12px;color:#666">${turma?.nome||"Turma"} • ${tarefa.data||"Sem data"}</div>
        </div>
        <div>
          <button class="btn primary" data-xp="${tarefa.xp||0}">Concluir (+${tarefa.xp||0} XP)</button>
        </div>
      </div>
      <div style="margin-top:8px">${tarefa.descricao||""}</div>
    `;
    item.querySelector("button").addEventListener("click", (ev)=>{
      const ganho = +(ev.currentTarget.dataset.xp||0);
      xpTotal += ganho; localStorage.setItem(KEY_XP_ALUNO,xpTotal);
      $("#xpTotal").textContent = xpTotal;
      ev.currentTarget.disabled = true;
      ev.currentTarget.textContent = "Concluída ✓";
    });
    list.appendChild(item);
  });
}

function renderMeuProgresso(){
  const wrap = $("#listaMeuProgresso"); wrap.innerHTML="";
  turmas.forEach(t=>{
    const hex = AREA_TO_COLOR[t.area]?.hex || "#9D304A";
    // progressinho simples baseado em quantidade de tarefas da turma
    const qtd = (tarefas[t.id]||[]).length;
    const pct = Math.min(100, qtd*20);
    const row = document.createElement("div");
    row.className = "progress";
    row.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <strong>${t.nome}</strong><span>${pct}%</span>
      </div>
      <div class="bar"><div class="fill"></div></div>
    `;
    wrap.appendChild(row);
    requestAnimationFrame(()=>{ row.querySelector(".fill").style.width=pct+"%"; row.querySelector(".fill").style.background=hex; });
  });
}

function entrarTurmaPorCodigo(){
  const code = $("#codigoTurma").value.trim().toLowerCase();
  if(!code) return;
  const turma = turmas.find(t=>t.codigo?.toLowerCase()===code);
  if(!turma){ alert("Código inválido."); return; }
  alert(`Você está na turma: ${turma.nome}`);
}
