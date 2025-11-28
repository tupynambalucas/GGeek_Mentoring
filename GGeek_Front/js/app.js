const App = {
    elements: {
        views: {
            login: document.getElementById('login-view'),
            panel: document.getElementById('panel-view')
        },
        formLogin: document.getElementById('form-login'),
        menuItems: document.querySelectorAll('.menu-item'),
        sections: document.querySelectorAll('.content-section'),
        btnLogout: document.getElementById('btn-logout')
    },

    init() {
        console.log("App Iniciado.");
        this.setupEventListeners();
    },

    setupEventListeners() {
        this.elements.formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        this.elements.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-target');
                
                this.navigateTo(targetId);
                this.updateMenuState(item);
            });
        });

        if (this.elements.btnLogout) {
            this.elements.btnLogout.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    },

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        if(email && pass) {
            this.elements.views.login.classList.add('hidden');
            this.elements.views.panel.classList.remove('hidden');
            this.navigateTo('register-customer');
            this.updateMenuState(this.elements.menuItems[0]);
        } else {
            alert("Por favor, preencha os campos.");
        }
    },

    handleLogout() {
        if(confirm("Deseja realmente sair?")) {
            this.elements.views.panel.classList.add('hidden');
            this.elements.views.login.classList.remove('hidden');
            document.getElementById('login-pass').value = '';
        }
    },

    navigateTo(targetId) {
        this.elements.sections.forEach(section => {
            section.classList.add('hidden');
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        } else {
            console.error(`Erro: Seção com ID "${targetId}" não encontrada.`);
        }
    },

    updateMenuState(activeItem) {
        this.elements.menuItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});