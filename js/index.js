document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality - Simple Version
    const themeToggle = document.getElementById('themeToggle');
    const icon = document.getElementById('icon');
    
    // Only handle the theme toggle click for simple light/dark switching
    let isLightTheme = false;

    themeToggle.addEventListener('click', () => {
        if (!isLightTheme) {
            // Switch to light theme
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#2c405e';
            
            // Update navigation color
            document.querySelector('nav').style.backgroundColor = '#ffffff';
            document.querySelector('nav').style.color = '#2c405e';
            
            // Update card backgrounds
            const cards = document.querySelectorAll('.experience .exp, .education .edu, .projects .project-section .content .footer');
            cards.forEach(card => {
                card.style.backgroundColor = '#ffffff';
                card.style.color = '#2c405e';
            });
            
            // Update headings
            const headings = document.querySelectorAll('h2, h3, .role, .course');
            headings.forEach(heading => {
                heading.style.color = '#2c405e';
            });
            
            // Change icon
            icon.classList.replace('fa-moon', 'fa-sun');
            
            isLightTheme = true;
        } else {
            // Switch back to dark theme (reset inline styles)
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            
            // Reset navigation color
            document.querySelector('nav').style.backgroundColor = '';
            document.querySelector('nav').style.color = '';
            
            // Reset card backgrounds
            const cards = document.querySelectorAll('.experience .exp, .education .edu, .projects .project-section .content .footer');
            cards.forEach(card => {
                card.style.backgroundColor = '';
                card.style.color = '';
            });
            
            // Reset headings
            const headings = document.querySelectorAll('h2, h3, .role, .course');
            headings.forEach(heading => {
                heading.style.color = '';
            });
            
            // Change icon back
            icon.classList.replace('fa-sun', 'fa-moon');
            
            isLightTheme = false;
        }
    });

    // Mobile Navigation Toggle
    const burger = document.getElementById('burger');
    const navMenu = document.querySelector('nav ul');
    const burgerIcon = burger.querySelector('i');

    burger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        
        // Toggle burger icon between bars and times
        if (navMenu.classList.contains('show')) {
            burgerIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            burgerIcon.classList.replace('fa-times', 'fa-bars');
        }
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

                // Close mobile menu after clicking a link
                navMenu.classList.remove('show');
                if (burgerIcon.classList.contains('fa-times')) {
                    burgerIcon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            e.target !== burger && 
            !burger.contains(e.target)) {
            navMenu.classList.remove('show');
            burgerIcon.classList.replace('fa-times', 'fa-bars');
        }
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