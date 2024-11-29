document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.toggle-bar button');
    const icon = document.getElementById('icon');
    const body = document.body;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            icon.classList.replace('fa-moon-o', 'fa-sun-o');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            icon.classList.replace('fa-sun-o', 'fa-moon-o');
            localStorage.removeItem('theme');
        }
    }

    // Initial theme setup
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        setTheme('dark');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // Mobile Navigation Toggle
    const burger = document.getElementById('burger');
    const navMenu = document.querySelector('nav ul');

    burger.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });

    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu after click
                navMenu.classList.remove('show-menu');
            }
        });
    });

    // Section Reveal on Scroll
    const sections = document.querySelectorAll('.profile, .tech-stack, .projects, .experience, .education');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-section');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});