const authBtn = document.getElementById('auth-btn');
const userDisplay = document.getElementById('user-display');
const body = document.body;

// Función segura para abrir el login
function openLogin() {
    if (netlifyIdentity) {
        netlifyIdentity.open('login');
    }
}

// Inicializar widget
netlifyIdentity.on('init', user => {
    if (user) {
        updateUI(user);
    } else {
        // Verificar si venimos redirigidos con intención de login
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('login') === 'true') {
            openLogin();
        }
    }
});

netlifyIdentity.on('login', user => {
    updateUI(user);
    netlifyIdentity.close();
    // Limpiar URL de parámetros
    window.history.replaceState({}, document.title, window.location.pathname);
});

netlifyIdentity.on('logout', () => {
    updateUI(null);
    // Al desloguearse, forzamos que el widget esté listo para el siguiente
    location.reload(); 
});

function updateUI(user) {
    if (user) {
        body.classList.add('authenticated');
        authBtn.innerText = 'Cerrar Sesión';
        authBtn.classList.replace('bg-indigo-600', 'bg-red-500');
        authBtn.onclick = () => netlifyIdentity.logout();
        userDisplay.innerText = user.user_metadata.full_name || user.email;
    } else {
        body.classList.remove('authenticated');
        authBtn.innerText = 'Acceder';
        authBtn.classList.replace('bg-red-500', 'bg-indigo-600');
        authBtn.onclick = openLogin;
    }
}

// Fallback por si el evento init no se dispara correctamente en re-ingresos
window.addEventListener('load', () => {
    const user = netlifyIdentity.currentUser();
    if (user) updateUI(user);
});