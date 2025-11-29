import gsap from 'https://cdn.skypack.dev/gsap';

const App = {
    elements: {
        views: {
            login: document.getElementById('login-view'),
            panel: document.getElementById('panel-view')
        },
        // Novos elementos para a animação específica
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
            // Cria uma Timeline para sequenciar as animações
            const tl = gsap.timeline();

            // PASSO 1: Fade Out do Login
            tl.to(this.elements.views.login, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    // Troca as classes CSS para esconder login e mostrar painel
                    this.elements.views.login.classList.add('hidden');
                    this.elements.views.panel.classList.remove('hidden');
                }
            });

            // PASSO 2: Preparar o terreno (Estado Inicial invisível)
            // Define a sidebar com largura 0 e esconde o conteúdo excedente para não quebrar o layout
            tl.set(this.elements.sidebar, { width: 0, overflow: 'hidden', whiteSpace: 'nowrap' });
            // Define o conteúdo principal como invisível
            tl.set(this.elements.panelMain, { opacity: 0 });

            // PASSO 3: Animação da Sidebar Crescendo
            tl.to(this.elements.sidebar, {
                width: "22.5vw", // O tamanho original definido no seu CSS
                duration: 0.8,   // Tempo da animação
                ease: "power2.out"
            });

            // PASSO 4: Fade In do Conteúdo Principal (Main)
            tl.to(this.elements.panelMain, {
                opacity: 1,
                duration: 0.6,
                onStart: () => {
                    // Carrega a primeira tela assim que o main começar a aparecer
                    this.navigateTo('register-customer');
                    this.updateMenuState(this.elements.menuItems[0]);
                },
                onComplete: () => {
                    // Limpa estilos inline que o GSAP colocou na sidebar para o CSS voltar a mandar
                    // Isso é importante para o responsivo ou hovers funcionarem bem depois
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
                    
                    // Reseta estilos caso o usuário logue de novo sem recarregar
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