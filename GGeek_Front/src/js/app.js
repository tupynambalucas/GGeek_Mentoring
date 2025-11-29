import gsap from 'gsap';

const App = {
    elements: {
        views: {
            login: document.getElementById('login-view'),
            panel: document.getElementById('panel-view')
        },
        sidebar: document.querySelector('.panel-sidebar'),
        panelMain: document.querySelector('#panel-view > main'),
        
        formLogin: document.getElementById('form-login'),
        menuItems: document.querySelectorAll('.menu-item'),
        sections: document.querySelectorAll('.content-section'),
        btnLogout: document.getElementById('btn-logout')
    },

    init() {
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
                
                if (!item.classList.contains('active')) {
                    this.navigateTo(targetId);
                    this.updateMenuState(item);
                }
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
            const tl = gsap.timeline();
            tl.to(this.elements.views.login, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    this.elements.views.login.classList.add('hidden');
                    this.elements.views.panel.classList.remove('hidden');
                }
            });
            tl.set(this.elements.sidebar, { width: 0, overflow: 'hidden', whiteSpace: 'nowrap' });
            tl.set(this.elements.panelMain, { opacity: 0 });

            tl.to(this.elements.sidebar, {
                width: "22.5vw", 
                duration: 0.8,
                ease: "power2.out"
            });

            tl.to(this.elements.panelMain, {
                opacity: 1,
                duration: 0.6,
                onStart: () => {
                    this.navigateTo('register-customer');
                    this.updateMenuState(this.elements.menuItems[0]);
                },
                onComplete: () => {
                    gsap.set(this.elements.sidebar, { clearProps: "overflow,whiteSpace" });
                }
            });

        } else {
            alert("Por favor, preencha os campos.");
        }
    },

    handleLogout() {
        if(confirm("Deseja realmente sair?")) {
            gsap.to(this.elements.views.panel, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    this.elements.views.panel.classList.add('hidden');
                    this.elements.views.login.classList.remove('hidden');
                    this.elements.views.login.style.opacity = 1;
                    gsap.set(this.elements.sidebar, { clearProps: "all" });
                    gsap.set(this.elements.panelMain, { clearProps: "all" });
                    
                    document.getElementById('login-pass').value = '';
                }
            });
        }
    },

    navigateTo(targetId) {
        this.elements.sections.forEach(section => {
            section.classList.add('hidden');
            gsap.set(section, { clearProps: "all" });
        });

        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.classList.remove('hidden');
            gsap.fromTo(targetSection, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );
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