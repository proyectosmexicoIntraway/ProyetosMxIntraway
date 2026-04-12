/**
 * authentication.js
 * Lógica centralizada para la gestión de sesiones con Netlify Identity
 */

// Función para actualizar la interfaz de usuario según el estado de autenticación
function updateAuthUI(user) {
    const body = document.body;
    const loggedInView = document.getElementById('logged-in-view');
    const loggedOutView = document.getElementById('logged-out-view');
    const userDisplay = document.getElementById('user-display');
    const authBtn = document.getElementById('auth-btn');

    if (user) {
        body.classList.add('authenticated');
        if (loggedInView) loggedInView.style.display = 'block';
        if (loggedOutView) loggedOutView.style.display = 'none';
        
        // Si existe un elemento para mostrar el nombre del usuario
        if (userDisplay) {
            userDisplay.innerText = user.user_metadata.full_name || user.email;
        }

        // Configurar botón de cerrar sesión si existe en la nav
        if (authBtn) {
            authBtn.innerText = 'Cerrar Sesión';
            authBtn.classList.replace('bg-indigo-600', 'bg-red-500');
            authBtn.onclick = () => netlifyIdentity.logout();
        }
    } else {
        body.classList.remove('authenticated');
        if (loggedInView) loggedInView.style.display = 'none';
        if (loggedOutView) loggedOutView.style.display = 'block';

        if (authBtn) {
            authBtn.innerText = 'Acceder';
            authBtn.classList.replace('bg-red-500', 'bg-indigo-600');
            authBtn.onclick = () => netlifyIdentity.open('login');
        }
    }
}

// Inicialización del Widget
netlifyIdentity.on('init', user => {
    updateAuthUI(user);
    
    // Lógica especial para redirección de login desde subpáginas
    const urlParams = new URLSearchParams(window.location.search);
    if (!user && urlParams.get('login') === 'true') {
        netlifyIdentity.open('login');
    }
});

netlifyIdentity.on('login', user => {
    updateAuthUI(user);
    netlifyIdentity.close();
    // Limpiar parámetros de URL si existen
    if (window.location.search.includes('login=true')) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

netlifyIdentity.on('logout', () => {
    updateAuthUI(null);
    // Redirigir al index si no estamos ya ahí
    if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        window.location.href = 'index.html';
    }
});

// Ejecutar verificación al cargar la ventana
window.addEventListener('load', () => {
    const user = netlifyIdentity.currentUser();
    updateAuthUI(user);
});