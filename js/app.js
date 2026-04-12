// Función para cerrar sesión y limpiar estado
function handleLogout() {
    netlifyIdentity.logout();
}
// Función para volver al index y asegurar que se pida el login
function goToLogin() {
    window.location.href = 'index.html?login=true';
}
// Inicializar Identity y verificar sesión
netlifyIdentity.on('init', user => {
    if (user) {
        document.body.classList.add('authenticated');
        setupPageContent();
    } else {
        showLoggedOut();
    }
});
// Eventos de sesión
netlifyIdentity.on('login', user => {
    document.body.classList.add('authenticated');
    setupPageContent();
});
netlifyIdentity.on('logout', () => {
    document.body.classList.remove('authenticated');
    window.location.href = 'index.html';
});
function showLoggedOut() {
    document.getElementById('logged-in-view').style.display = 'none';
    document.getElementById('logged-out-view').style.display = 'block';
}
function setupPageContent() {
    const path = window.location.pathname;
    const titleElement = document.getElementById('dynamic-title');
    document.getElementById('logged-in-view').style.display = 'block'
    // Detectar automáticamente el nombre del archivo para cambiar el título
    if (path.includes('izzi-fija')) titleElement.innerText = 'iZZi Fija';
    else if (path.includes('izzi-mobile')) titleElement.innerText = 'iZZi Mobile';
    else if (path.includes('pendientes')) titleElement.innerText = 'Pendientes / No Iniciados';
    else if (path.includes('bestel')) titleElement.innerText = 'Bestel';
    else titleElement.innerText = 'Detalle de Proyectos';
}
// Verificación inicial de usuario actual
window.addEventListener('load', () => {
    const user = netlifyIdentity.currentUser();
    if (user) {
        document.body.classList.add('authenticated');
        setupPageContent();
    } else {
        showLoggedOut();
    }
});