document.addEventListener('DOMContentLoaded', function () {
    // Get all project navigation items and categories
    const projectNavItems = document.querySelectorAll('.project-nav-item');
    const projectCategories = document.querySelectorAll('.project-category');

    // Add click event to project navigation
    projectNavItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');

            projectNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');

            projectCategories.forEach(category => category.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Fade-in animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => observer.observe(card));

    // Project links placeholder alert
    const projectLinks = document.querySelectorAll('.project-links a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Project link coming soon!');
            }
        });
    });

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Active nav state based on scroll position
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const headerHeight = document.querySelector('header').offsetHeight;
        if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});
