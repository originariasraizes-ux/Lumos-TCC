document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idTarefa = params.get("id");

 document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const titulo = params.get("titulo") || "Título padrão";
  const area = params.get("area") || "Área padrão";

  // Preenche apenas título e área
  document.getElementById("titulo-tarefa").innerText = titulo;
  document.getElementById("area-tarefa").innerText = area;
});


  // Preenche infos
  document.getElementById("titulo-tarefa").innerText = dadosTarefa.titulo;
  document.getElementById("area-tarefa").innerText = dadosTarefa.area;
  document.getElementById("descricao-tarefa").innerText = dadosTarefa.descricao;
  document.getElementById("data-tarefa").innerText = dadosTarefa.data.split("-").reverse().join("/");

  // Modal
  const modal = document.getElementById("modal-editar-tarefa");
  const editarBtn = document.getElementById("editarTarefa");
  const cancelarBtn = document.getElementById("cancelarEdicao");
  const salvarBtn = document.getElementById("salvarEdicao");

  editarBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");

    // Preenche modal com dados atuais
    document.getElementById("editArea").value = dadosTarefa.area;
    document.getElementById("editTitulo").value = dadosTarefa.titulo;
    document.getElementById("editDescricao").value = dadosTarefa.descricao;
    document.getElementById("editData").value = dadosTarefa.data;
  });

  cancelarBtn.addEventListener("click", () => modal.classList.add("hidden"));

  salvarBtn.addEventListener("click", () => {
    const area = document.getElementById("editArea").value.trim();
    const titulo = document.getElementById("editTitulo").value.trim();
    const descricao = document.getElementById("editDescricao").value.trim();
    const data = document.getElementById("editData").value;

    if (!area || !titulo || !descricao || !data) {
      alert("Preencha todos os campos!");
      return;
    }

    // Atualiza dados (futuro backend)
    document.getElementById("area-tarefa").innerText = area;
    document.getElementById("titulo-tarefa").innerText = titulo;
    document.getElementById("descricao-tarefa").innerText = descricao;
    document.getElementById("data-tarefa").innerText = data.split("-").reverse().join("/");

    modal.classList.add("hidden");
    alert("Tarefa atualizada com sucesso!");
  });

 document.addEventListener("DOMContentLoaded", () => {
  const excluirBtn = document.getElementById("excluirTarefa");

  if (!excluirBtn) {
    console.error("Botão de exclusão não encontrado!");
    return;
  }

  excluirBtn.addEventListener("click", () => {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return;

    // Pega o ID da tarefa da URL
    const params = new URLSearchParams(window.location.search);
    const idTarefa = params.get("id");

    if (!idTarefa) {
      alert("ID da tarefa não encontrado.");
      return;
    }

    // Faz a requisição para excluir
    fetch(`/Lumos-TCC-main/php/ExcluirTarefas.php?id=${idTarefa}`)
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.success) {
          window.location.href = "/Lumos-TCC-main/php/dashboard.php";
        }
      })
      .catch(err => alert("Erro ao excluir a tarefa: " + err));
  });
});

});
