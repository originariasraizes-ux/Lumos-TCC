/* =======================
   CONSTANTES E CORES
======================= */
const KEY_TURMAS   = "lumos_turmas_v2";
const KEY_TAREFAS  = "lumos_tarefas_v2";
const KEY_PROG     = "lumos_progresso_v2";

const AREA_TO_COLOR = {
  "Linguagens": {slug:"roxo",   hex:"#7e62a4"},
  "Matemática": {slug:"vinho",  hex:"#9D304A"},
  "Ciências Humanas": {slug:"laranja",hex:"#efa019"},
  "Ciências da Natureza":{slug:"azul",hex:"#8ec3cc"},
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* =======================
   ESTADO / STORAGE
======================= */
let turmas   = JSON.parse(localStorage.getItem(KEY_TURMAS))  || [];
let tarefas  = JSON.parse(localStorage.getItem(KEY_TAREFAS)) || {}; // { turmaId: [tarefas] }
let progresso= JSON.parse(localStorage.getItem(KEY_PROG))    || {}; // { turmaId: pct }

function saveAll(){
  localStorage.setItem(KEY_TURMAS,   JSON.stringify(turmas));
  localStorage.setItem(KEY_TAREFAS,  JSON.stringify(tarefas));
  localStorage.setItem(KEY_PROG,     JSON.stringify(progresso));
}

/* =======================
   INÍCIO
======================= */
document.addEventListener("DOMContentLoaded", () => {
  // nome do usuário (ex: preenchido no login)
  const nome = localStorage.getItem("nomeUsuario") || "Professor";
  $("#nomeUsuarioSidebar").textContent = nome;

  // sidebar / hambúrguer
  $("#btnHamburguer").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
  });

  // tabs
  $$(".tab-btn").forEach(btn=>{
    btn.addEventListener("click", () => {
      $$(".tab-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      $$(".tab-panel").forEach(p=>p.classList.remove("show"));
      $("#"+tab).classList.add("show");
    });
  });

  // links do sidebar (navegação interna + calendário externo)
  $$(".nav-link[data-goto]").forEach(a=>{
    a.addEventListener("click", () => {
      const id = a.dataset.goto;
      document.querySelector(`[data-tab='${id}']`)?.click();
      $$(".nav-link").forEach(n=>n.classList.remove("active"));
      a.classList.add("active");
      $("#sidebar").classList.remove("open");
    });
  });

  // render inicial
  renderTurmas();
  feedSelectors();
  renderTarefas();
  renderProgresso();
  renderRanking();

  // Modal Turma
  $("#btnNovaTurma").addEventListener("click", openModalTurma);
  $("#cancelTurma").addEventListener("click", ()=>closeModal("#modalTurma"));
  $("#saveTurma").addEventListener("click", saveTurma);

  // Modal Tarefa
  $("#btnNovaTarefa").addEventListener("click", openModalTarefa);
  $("#cancelTarefa").addEventListener("click", ()=>closeModal("#modalTarefa"));
  $("#saveTarefa").addEventListener("click", saveTarefa);

  // selects
  $("#selectTurmaTarefa").addEventListener("change", renderTarefas);
  $("#selectTurmaRanking").addEventListener("change", renderRanking);
});

/* =======================
   TURMAS
======================= */
function renderTurmas(){
  const wrap = $("#cardsTurmas");
  wrap.innerHTML = "";
  if(turmas.length===0){
    wrap.innerHTML = `<div class="item">Nenhuma turma criada ainda.</div>`;
    return;
  }

  turmas.forEach(t=>{
    const cor = AREA_TO_COLOR[t.area]?.slug || "vinho";
    const hex = AREA_TO_COLOR[t.area]?.hex  || "#9D304A";
    const code = t.codigo || "-----";

    const card = document.createElement("div");
    card.className = `card ${cor}`;
    card.innerHTML = `
      <div class="menu" title="Editar/Excluir" data-id="${t.id}">⋮</div>
      <div class="title">${t.nome}</div>
      <div class="code">Código: ${code}</div>
    `;

    // pequeno menu (editar/excluir)
    card.querySelector(".menu").addEventListener("click",(e)=>{
      e.stopPropagation();
      const id = t.id;
      const acao = prompt("Digite: 1-Editar  2-Excluir", "1");
      if(acao==="2"){
        if(confirm("Excluir turma e suas tarefas?")){
          turmas = turmas.filter(x=>x.id!==id);
          delete tarefas[id];
          delete progresso[id];
          saveAll(); renderTurmas(); feedSelectors(); renderTarefas(); renderProgresso(); renderRanking();
        }
      }else if(acao==="1"){
        openModalTurma(t);
      }
    });

    // clique para ir à página de turma (se você tiver)
    card.addEventListener("click", ()=>{
      // ex.: location.href = `Turma.html?id=${t.id}`
      alert(`Abrir página da turma: ${t.nome}`);
    });

    wrap.appendChild(card);

    // set cores nos componentes de progresso por turma (se existirem)
    setTimeout(()=>{
      document.querySelectorAll(`.fill[data-turma='${t.id}']`)
        .forEach(el=>{ el.style.background = hex;});
    },0);
  });
}

function openModalTurma(turma=null){
  $("#modalTurmaTitulo").textContent = turma ? "Editar turma" : "Criar turma";
  $("#turmaNome").value = turma?.nome || "";
  $("#turmaArea").value = turma?.area || "";
  $("#modalTurma").classList.add("show");
  $("#modalTurma").dataset.editId = turma?.id || "";
}
function saveTurma(){
  const nome = $("#turmaNome").value.trim();
  const area = $("#turmaArea").value;
  if(!nome || !area){ alert("Preencha o nome e a área."); return; }

  const editId = $("#modalTurma").dataset.editId;
  if(editId){
    const t = turmas.find(x=>x.id===editId);
    if(t){ t.nome=nome; t.area=area; }
  }else{
    const id = crypto.randomUUID();
    const codigo = Math.random().toString(36).slice(2,8);
    turmas.push({id,nome,area,codigo});
  }
  closeModal("#modalTurma"); saveAll();
  renderTurmas(); feedSelectors(); renderProgresso(); renderRanking();
}
function closeModal(sel){ document.querySelector(sel).classList.remove("show"); }

/* =======================
   TAREFAS
======================= */
function feedSelectors(){
  const selectT = $("#selectTurmaTarefa");
  const selectR = $("#selectTurmaRanking");
  const tarefaTurma = $("#tarefaTurma");

  [selectT,selectR,tarefaTurma].forEach(el=>{ if(!el) return; el.innerHTML=""; });

  turmas.forEach(t=>{
    const opt = new Option(t.nome,t.id);
    const opt2= new Option(t.nome,t.id);
    const opt3= new Option(t.nome,t.id);
    selectT?.add(opt);
    selectR?.add(opt2);
    tarefaTurma?.add(opt3);
  });
}

function renderTarefas(){
  const list = $("#listaTarefas");
  const turmaId = $("#selectTurmaTarefa").value || turmas[0]?.id;
  if(!turmaId){ list.innerHTML = `<div class="item">Crie uma turma para adicionar tarefas.</div>`; return; }

  const arr = tarefas[turmaId] || [];
  list.innerHTML = "";
  if(arr.length===0){
    list.innerHTML = `<div class="item">Sem tarefas nesta turma.</div>`;
    return;
  }

  arr.forEach(task=>{
    const cor = AREA_TO_COLOR[turmas.find(t=>t.id===turmaId)?.area]?.hex || "#9D304A";
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <div class="row">
        <div>
          <div style="font-weight:800">${task.titulo}</div>
          <small class="muted">${task.data || "Sem data"} • ${task.xp||0} XP</small>
        </div>
        <div>
          <span class="badge" style="background:${cor}">Turma</span>
          <button class="btn ghost" data-ed="${task.id}">Editar</button>
          <button class="btn" style="background:#ef4444;color:#fff" data-del="${task.id}">Excluir</button>
        </div>
      </div>
      <div style="margin-top:8px">${task.descricao||""}</div>
    `;
    item.querySelector(`[data-del="${task.id}"]`).addEventListener("click", ()=>{
      if(confirm("Excluir tarefa?")){
        tarefas[turmaId] = (tarefas[turmaId]||[]).filter(x=>x.id!==task.id);
        saveAll(); renderTarefas();
      }
    });
    item.querySelector(`[data-ed="${task.id}"]`).addEventListener("click", ()=>openModalTarefa(task,turmaId));
    list.appendChild(item);
  });
}

function openModalTarefa(task=null, turmaFor=null){
  $("#modalTarefaTitulo").textContent = task ? "Editar tarefa" : "Nova tarefa";
  $("#tarefaTurma").value   = turmaFor || $("#selectTurmaTarefa").value || turmas[0]?.id || "";
  $("#tarefaTitulo").value  = task?.titulo || "";
  $("#tarefaDescricao").value=task?.descricao || "";
  $("#tarefaData").value    = task?.data || "";
  $("#tarefaXP").value      = task?.xp || 10;

  $("#modalTarefa").classList.add("show");
  $("#modalTarefa").dataset.editId = task?.id || "";
}
function saveTarefa(){
  const turmaId = $("#tarefaTurma").value;
  const titulo  = $("#tarefaTitulo").value.trim();
  if(!turmaId || !titulo){ alert("Selecione a turma e informe o título."); return; }

  const obj = {
    id: $("#modalTarefa").dataset.editId || crypto.randomUUID(),
    titulo,
    descricao: $("#tarefaDescricao").value.trim(),
    data: $("#tarefaData").value,
    xp: +$("#tarefaXP").value||0
  };
  tarefas[turmaId] = tarefas[turmaId] || [];
  const idx = tarefas[turmaId].findIndex(x=>x.id===obj.id);
  if(idx>=0) tarefas[turmaId][idx] = obj; else tarefas[turmaId].push(obj);

  closeModal("#modalTarefa"); saveAll(); renderTarefas(); renderRanking(); renderProgresso();
}

/* =======================
   PROGRESSO
======================= */
function renderProgresso(){
  const wrap = $("#listaProgresso");
  wrap.innerHTML = "";
  if(turmas.length===0){ wrap.innerHTML = `<div class="item">Sem turmas.</div>`; return; }

  turmas.forEach(t=>{
    const hex = AREA_TO_COLOR[t.area]?.hex || "#9D304A";
    const pct = +progresso[t.id] || calcPctByTasks(t.id);
    const row = document.createElement("div");
    row.className = "progress";
    row.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <strong>${t.nome}</strong><span>${pct}%</span>
      </div>
      <div class="bar"><div class="fill" data-turma="${t.id}"></div></div>
    `;
    wrap.appendChild(row);
    requestAnimationFrame(()=>{ row.querySelector(".fill").style.width = pct+"%"; row.querySelector(".fill").style.background = hex; });
  });
}
function calcPctByTasks(turmaId){
  const arr = tarefas[turmaId] || [];
  if(arr.length===0) return 0;
  // exemplo simples: 40% se existir tarefa, 100% se 5+ tarefas
  const pct = Math.min(100, arr.length * 20);
  progresso[turmaId] = pct; saveAll();
  return pct;
}

/* =======================
   RANKING
======================= */
function renderRanking(){
  const sel = $("#selectTurmaRanking");
  const turmaId = sel.value || turmas[0]?.id;
  const wrap = $("#rankingContainer");
  wrap.innerHTML = "";

  if(!turmaId){ wrap.innerHTML = `<div class="item">Crie uma turma.</div>`; return; }

  // mock simples: cria ranking a partir das tarefas (XP somado por 4 alunos fixos)
  const alunos = ["Ana","Bruno","Carla","Diego"].map(n=>({nome:n,xp:0}));
  (tarefas[turmaId]||[]).forEach(t=>{
    // distribui um pouco de XP
    alunos.forEach(a=> a.xp += Math.floor((t.xp||10)/4));
  });

  alunos.sort((a,b)=>b.xp-a.xp);
  const top = Math.max(1, alunos[0]?.xp || 1);

  alunos.forEach(a=>{
    const hex = AREA_TO_COLOR[turmas.find(t=>t.id===turmaId)?.area]?.hex || "#9D304A";
    const pct = Math.round((a.xp/top)*100);
    const row = document.createElement("div");
    row.className = "rank";
    row.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <strong>${a.nome}</strong><span>${a.xp} XP</span>
      </div>
      <div class="bar"><div class="fill"></div></div>
    `;
    const fill = row.querySelector(".fill");
    wrap.appendChild(row);
    requestAnimationFrame(()=>{ fill.style.width = pct+"%"; fill.style.background = hex; });
  });
}
