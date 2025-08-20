const profile = document.getElementById("profile");
const settings = document.getElementById("settings");

const profileName = document.getElementById("profileName");
const profileUsername = document.getElementById("profileUsername");
const profileEmail = document.getElementById("profileEmail");
const profileImage = document.getElementById("profileImage");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const previewImage = document.getElementById("previewImage");
const imageUpload = document.getElementById("imageUpload");

// Sidebar toggle
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}
// Cancelar edição
function cancelEdit() {
  settings.style.display = "none";
  profile.style.display = "block";
}



// Upload imagem
imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// Salvar dados
document.getElementById("saveBtn").addEventListener("click", () => {
  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("email", emailInput.value);
  localStorage.setItem("profileImage", previewImage.src);

  profileName.textContent = nameInput.value;
  profileEmail.textContent = emailInput.value;
  profileUsername.textContent = "@" + nameInput.value.toLowerCase().replace(/\s+/g, "");
  profileImage.src = previewImage.src;

  cancelEdit();
});

// Deletar conta
document.getElementById("deleteAccount").addEventListener("click", deleteAccount);

function deleteAccount() {
  if (confirm("Tem certeza que deseja excluir sua conta? Todos os seus dados serão perdidos.")) {
    localStorage.clear();
    const notification = document.getElementById("notification");
    notification.style.display = "block";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }
}
const defaultAvatar = "images/Perfil/perfil-de-usuario.png";

function showSettings() {
  profile.style.display = "none";
  settings.style.display = "block";
  nameInput.value = localStorage.getItem("name") || "";
  emailInput.value = localStorage.getItem("email") || "";
  previewImage.src = localStorage.getItem("profileImage") || defaultAvatar;
}

window.onload = () => {
  profileName.textContent = localStorage.getItem("name") || "Seu Nome";
  profileEmail.textContent = localStorage.getItem("email") || "seuemail@email.com";
  profileImage.src = localStorage.getItem("profileImage") || defaultAvatar;
  previewImage.src = localStorage.getItem("profileImage") || defaultAvatar;
  profileUsername.textContent = "@" + (localStorage.getItem("name") || "seudousuario").toLowerCase().replace(/\s+/g, "");
};