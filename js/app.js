// Inicializar Identity y verificar sesión
netlifyIdentity.on('init', user => {
    if (user) {
        document.body.classList.add('authenticated');
        setupPageContent();
    } else {
        showLoggedOut();
    }
});

netlifyIdentity.on('logout', () => {
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

// Verificación fallback por si el init tarda
setTimeout(() => {
    if (!netlifyIdentity.currentUser()) showLoggedOut();
}, 1500);