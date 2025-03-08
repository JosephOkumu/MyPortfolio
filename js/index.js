document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const icon = document.getElementById('icon');
    const body = document.body;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Initial theme setup - default to dark unless explicitly set to light
    if (savedTheme === 'light') {
        setTheme('light');
    } else {
        setTheme('dark');
    }

    // Toggle theme when button is clicked
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
        navMenu.classList.toggle('show');
    });

    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu after click
                navMenu.classList.remove('show');
            }
        });
    });

    // Add animation class when sections come into view
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