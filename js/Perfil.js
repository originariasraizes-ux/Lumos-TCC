 function abrirConfiguracoes() {
      document.getElementById("perfilCard").classList.add("hidden");
      document.getElementById("configCard").classList.remove("hidden");
    }
    function cancelarEdicao() {
      document.getElementById("configCard").classList.add("hidden");
      document.getElementById("perfilCard").classList.remove("hidden");
    }
  function salvarEdicao() {
  const nome = document.getElementById("nomeInput").value;
  const bio = document.getElementById("bioInput").value; // aqui estava vazio
  document.querySelector("#perfilCard .name").textContent = nome;
  document.querySelector("#perfilCard .bio").textContent = bio;
  cancelarEdicao();
}

  function confirmarExclusao() {
  document.getElementById("modalConfirm").classList.remove("hidden");
}
    function fecharModal() {
  document.getElementById("modalConfirm").classList.add("hidden");
}
function excluirConta() {
  fetch("/Lumos-TCC-main/php/excluirConta.php", {
    method: "POST"
  })
  .then(response => {
    if (response.ok) {
      alert("Conta excluída com sucesso!");
      window.location.href = "/Lumos-TCC-main/php/login.php";
    } else {
      alert("Erro ao excluir a conta!");
    }
  })
  .catch(() => {
    alert("Erro ao excluir a conta!");
  });
}
    document.getElementById("bannerUpload").addEventListener("change",(e)=>{
      const f=e.target.files[0];
      if(f){const r=new FileReader();r.onload=()=>{document.getElementById("bannerPreview").style.backgroundImage=`url('${r.result}')`;};r.readAsDataURL(f);}
    });
    document.getElementById("photoUpload").addEventListener("change",(e)=>{
      const f=e.target.files[0];
      if(f){const r=new FileReader();r.onload=()=>{document.getElementById("photoPreview").src=r.result;};r.readAsDataURL(f);}
    });

    let filterBtn = document.querySelector('.filter-icon');
let filters = document.getElementById('filters');

filterBtn.onclick = () => {
  filters.classList.toggle('hidden');
};

function toggleOption(element) {
  element.classList.toggle('active');
}

 
