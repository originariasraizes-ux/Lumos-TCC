// === Perfil.js Corrigido ===

// 🔹 Abre tela de configurações
function abrirConfiguracoes() {
  const perfilCard = document.getElementById("perfilCard");
  const configCard = document.getElementById("configCard");
  if (perfilCard && configCard) {
    perfilCard.classList.add("hidden");
    configCard.classList.remove("hidden");
  }
}

// 🔹 Cancela edição
function cancelarEdicao() {
  const perfilCard = document.getElementById("perfilCard");
  const configCard = document.getElementById("configCard");
  if (perfilCard && configCard) {
    configCard.classList.add("hidden");
    perfilCard.classList.remove("hidden");
  }
}

// 🔹 Salva edição (atualiza nome e bio visualmente)
function salvarEdicao() {
  const nomeInput = document.getElementById("nomeInput");
  const bioInput = document.getElementById("bioInput");
  if (!nomeInput || !bioInput) return;

  const nome = nomeInput.value.trim();
  const bio = bioInput.value.trim();

  const nameEl = document.querySelector("#perfilCard .name");
  const bioEl = document.querySelector("#perfilCard .bio");

  if (nameEl) nameEl.textContent = nome;
  if (bioEl) bioEl.textContent = bio;

  cancelarEdicao();
}

// 🔹 Função confirmadora para exclusão de conta
function confirmarExclusao() {
  if (confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita!")) {
    excluirConta();
  }
}

// 🔹 Função que faz o fetch e exclui a conta
function excluirConta() {
  fetch("/Lumos-TCC-main/php/excluirConta.php", { method: "POST" })
    .then(response => response.text())
    .then(text => {
      const res = text.trim();

      if (res === "OK") {
        alert("Conta excluída com sucesso!");
        window.location.href = "/Lumos-TCC-main/php/login.php";
      } else {
        alert("Erro ao excluir conta: " + res);
        console.error("Detalhe do erro:", res);
      }
    })
    .catch(err => {
      alert("Erro de rede: " + err.message);
      console.error(err);
    });
}

// 🔹 Upload de banner
const bannerUpload = document.getElementById("bannerUpload");
if (bannerUpload) {
  bannerUpload.addEventListener("change", e => {
    const f = e.target.files[0];
    if (f) {
      const r = new FileReader();
      r.onload = () => {
        const banner = document.getElementById("bannerPreview");
        if (banner) banner.style.backgroundImage = `url('${r.result}')`;
      };
      r.readAsDataURL(f);
    }
  });
}

// 🔹 Upload de foto de perfil
const photoUpload = document.getElementById("photoUpload");
if (photoUpload) {
  photoUpload.addEventListener("change", e => {
    const f = e.target.files[0];
    if (f) {
      const r = new FileReader();
      r.onload = () => {
        const preview = document.getElementById("photoPreview");
        if (preview) preview.src = r.result;
      };
      r.readAsDataURL(f);
    }
  });
}

// 🔹 Filtros (se existirem)
const filterBtn = document.querySelector('.filter-icon');
const filters = document.getElementById('filters');
if (filterBtn && filters) {
  filterBtn.onclick = () => {
    filters.classList.toggle('hidden');
  };
}

function toggleOption(element) {
  element.classList.toggle('active');
}

// 🔹 Menu lateral (se existir)
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  // Aqui você pode adicionar funcionalidade se quiser abrir/fechar a sidebar
});

// 🔹 Menu de opções em cards
function toggleMenu(el) {
  const menu = el.querySelector('.menu-options');
  if (menu) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}

// 🔹 Remover favorito
function desfavoritar(btn) {
  const card = btn.closest('.card-jogo');
  if (!card) return;
  const star = card.querySelector('.fav-star');
  if (star) star.style.display = 'none';
  btn.parentElement.style.display = 'none';
}

// 🔹 Dropdown genérico
function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) dropdown.classList.toggle('show');
}

window.addEventListener('click', function (e) {
  if (!e.target.matches('.dropdown-btn')) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
});
