document.addEventListener("DOMContentLoaded", () => {
  const favBtn = document.getElementById("fav-btn");
  if (!favBtn) return;

  const idJogo = favBtn.dataset.idJogo;
  const favIcon = favBtn.querySelector("i");

  favBtn.addEventListener("click", () => {
    fetch("/Lumos-TCC-main/php/favorito.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `idJogo=${encodeURIComponent(idJogo)}`
    })
      .then(res => res.json())
      .then(data => {
        if (data.sucesso) {
          if (data.acao === "adicionado") {
            favIcon.classList.remove("far"); // ícone vazio
            favIcon.classList.add("fas"); // ícone cheio
            favBtn.innerHTML = '<i class="fas fa-star"></i> Favorito';
          } else {
            favIcon.classList.remove("fas");
            favIcon.classList.add("far");
            favBtn.innerHTML = '<i class="far fa-star"></i> Favoritar';
          }
        } else {
          alert("Erro: " + (data.mensagem || "Tente novamente."));
        }
      })
      .catch(err => {
        console.error("Erro:", err);
        alert("Erro ao se comunicar com o servidor.");
      });
  });
});
function desfavoritar(botao) {
  const card = botao.closest('.card-jogo');
  const idJogo = card.getAttribute('data-id-jogo');

  if (!idJogo) {
    alert("Erro: ID do jogo não encontrado.");
    return;
  }

  if (!confirm("Tem certeza que deseja remover este jogo dos favoritos?")) return;

  fetch('/Lumos-TCC-main/php/removerFavorito.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `idJogo=${encodeURIComponent(idJogo)}`
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'sucesso') {
      card.remove(); // Remove o card visualmente
    } else {
      alert("Erro ao desfavoritar: " + data.mensagem);
    }
  })
  .catch(err => console.error('Erro:', err));
}

