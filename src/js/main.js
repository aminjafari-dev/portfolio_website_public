document.addEventListener('DOMContentLoaded', () => {
    // Load components
    function loadComponent(id, file, callback) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => {
                console.error(error);
            });
    }

    loadComponent('header', 'src/components/header.html', () => {
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
        });

        // Mobile Menu
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    });

    loadComponent('home', 'src/components/home.html', () => {
        // Typing Effect
        const text = "Full Stack Developer & Technical Writer";
        const typingElement = document.querySelector('.typing');
        let index = 0;

        function type() {
            if (index < text.length) {
                typingElement.textContent = text.slice(0, index + 1);
                index++;
                setTimeout(type, 100);
            }
        }

        type();
    });

    loadComponent('projects', 'src/components/projects.html');
    loadComponent('articles', 'src/components/articles.html');
    loadComponent('experience', 'src/components/experience.html');
    loadComponent('contact', 'src/components/contact.html');
    loadComponent('footer', 'src/components/footer.html');
});