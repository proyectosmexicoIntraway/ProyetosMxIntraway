// DOM Elements
const authBtn = document.getElementById('auth-btn');
const userNameSpan = document.getElementById('user-name');
const body = document.body;
// Initialize Identity
netlifyIdentity.on('init', user => {
    if (user) {
        updateUI(user);
    }
});
// Handle Login
netlifyIdentity.on('login', user => {
    updateUI(user);
    netlifyIdentity.close();
});
// Handle Logout
netlifyIdentity.on('logout', () => {
    updateUI(null);
});
function updateUI(user) {
    if (user) {
        body.classList.add('authenticated');
        authBtn.innerText = 'Cerrar Sesión';
        authBtn.classList.replace('bg-indigo-600', 'bg-red-500');
        authBtn.onclick = () => netlifyIdentity.logout();
        userNameSpan.innerText = user.user_metadata.full_name || user.email;
    } else {
        body.classList.remove('authenticated');
        authBtn.innerText = 'Acceder';
        authBtn.classList.replace('bg-red-500', 'bg-indigo-600');
        authBtn.onclick = () => netlifyIdentity.open();
    }
}
function addProject() {
    // Placeholder function for PM action
    const title = prompt("Nombre del Proyecto:");
    if(title) {
        console.log("PM está creando:", title);
        // Aquí iría la lógica para guardar en base de datos
    }
}        
// Final script for redirect after sign up
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/";
      });
    }
  });
}