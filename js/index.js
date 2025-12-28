document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const icon = document.getElementById('icon');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Mobile Navigation
    const burger = document.getElementById('burger');
    const navMenu = document.querySelector('nav ul');
    const burgerIcon = burger.querySelector('i');

    burger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        
        if (navMenu.classList.contains('show')) {
            burgerIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            burgerIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            !burger.contains(e.target)) {
            navMenu.classList.remove('show');
            burgerIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('show');
                burgerIcon.classList.replace('fa-times', 'fa-bars');

                // Scroll with offset for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.profile, .tech-stack, .projects, .experience, .education');
    sections.forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });
});