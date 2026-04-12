// Lógica de Identidad
netlifyIdentity.on('init', user => {
    if (user) {
        document.body.classList.add('authenticated');
        setupPage();
    }
});

netlifyIdentity.on('logout', () => {
    window.location.href = 'index.html';
});

// Personalizar título según el archivo
function setupPage() {
    const path = window.location.pathname;
    const titleElement = document.getElementById('page-title');
    
    if (path.includes('izzi-fija')) titleElement.innerText = 'Dashboard: iZZi Fija';
    else if (path.includes('izzi-mobile')) titleElement.innerText = 'Dashboard: iZZi Mobile';
    else if (path.includes('pendientes')) titleElement.innerText = 'Proyectos Pendientes / No Iniciados';
    else if (path.includes('bestel')) titleElement.innerText = 'Dashboard: Proyectos Bestel';
    else titleElement.innerText = 'Detalle de Vertical';
}

// Si el usuario no está logueado al cargar (y ya se inicializó el widget)
setTimeout(() => {
    const user = netlifyIdentity.currentUser();
    if (!user) {
        document.getElementById('logged-in-view').style.display = 'none';
        document.getElementById('logged-out-view').style.display = 'block';
    } else {
        document.body.classList.add('authenticated');
        setupPage();
    }
}, 1000);