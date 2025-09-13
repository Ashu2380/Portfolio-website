// ========================================
// Global Variables and Constants
// ========================================
let lastScrollTop = 0;
let isScrolling = false;
let animatedElements = new Set();

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const loadingScreen = document.getElementById('loading-screen');
const contactForm = document.getElementById('contact-form');
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// ========================================
// Page Loading and Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeApp();
});

window.addEventListener('load', function() {
    // Hide loading screen after page loads
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

function initializeApp() {
    initializeNavigation();
    initializeTheme();
    initializeScrollEffects();
    initializeTypingAnimation();
    initializeCounters();
    initializeSkillBars();
    initializeProjectFilters();
    initializeContactForm();
    initializeScrollAnimations();
    initializeModal();
    
    // Initialize scroll-based animations on page load
    handleScrollAnimations();
}

// ========================================
// Navigation Functionality
// ========================================
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileMenu();
            handleSmoothScroll(e);
        });
    });

    // Handle active navigation states
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Handle navbar scroll effects
    window.addEventListener('scroll', handleNavbarScroll);
}

function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ========================================
// Theme Management
// ========================================
function initializeTheme() {
    // Check for saved theme or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ========================================
// Scroll Effects
// ========================================
function initializeScrollEffects() {
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Handle scroll events with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(() => {
            handleScrollEffects();
            handleScrollAnimations();
        });
    });
}

function handleScrollEffects() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide back to top button
    if (backToTop) {
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && scrollTop < hero.offsetHeight) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
    }
}

// ========================================
// Typing Animation
// ========================================
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;

    const texts = ['Asharam Saini', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 50;
                setTimeout(typeText, 2000); // Pause before deleting
                return;
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex);
            charIndex--;
            
            if (charIndex < 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 100;
                setTimeout(typeText, 500); // Pause before typing new text
                return;
            }
        }
        
        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation after page load
    setTimeout(typeText, 2000);
}

// ========================================
// Counter Animations
// ========================================
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        if (animatedElements.has(counter)) return;
        
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        animatedElements.add(counter);
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    };

    // Animate counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// Skill Bar Animations
// ========================================
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress[data-width]');
    
    const animateSkillBar = (skillBar) => {
        if (animatedElements.has(skillBar)) return;
        
        const width = skillBar.getAttribute('data-width');
        animatedElements.add(skillBar);
        
        // Delay animation slightly for stagger effect
        setTimeout(() => {
            skillBar.style.width = width;
        }, Math.random() * 500);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
            }
        });
    });

    skillBars.forEach(skillBar => observer.observe(skillBar));
}

// ========================================
// Project Filtering
// ========================================
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show card with staggered animation
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                } else {
                    // Hide card
                    card.classList.add('hidden');
                    card.style.animation = '';
                }
            });
        });
    });
}

// ========================================
// Project Modal
// ========================================
function initializeModal() {
    // Project data for modal content
    const projectData = {
        ecommerce: {
            title: 'E-Commerce Website - MERN Stack',
            description: 'A comprehensive full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates modern web development practices and includes advanced features for both customers and administrators.',
            features: [
                'User Authentication & Authorization',
                'Product Catalog with Search & Filtering',
                'Shopping Cart & Wishlist Functionality',
                'Secure Payment Gateway Integration',
                'Order Management System',
                'Admin Dashboard for Inventory Management',
                'Responsive Design for All Devices',
                'Real-time Notifications'
            ],
            technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Stripe API', 'Material-UI'],
            challenges: 'Implementing secure payment processing, managing state across multiple components, and optimizing database queries for performance.',
            github: 'https://github.com/Ashu2380',
            demo: '#'
        },
        simon: {
            title: 'Simon Says Memory Game',
            description: 'An interactive memory game that challenges players to remember and repeat increasingly complex sequences of colors and sounds. Built with vanilla JavaScript to demonstrate DOM manipulation and game logic implementation.',
            features: [
                'Progressive Difficulty Levels',
                'Visual & Audio Feedback',
                'Score Tracking System',
                'Responsive Game Interface',
                'Touch & Click Support',
                'Game State Management',
                'Smooth Animations',
                'Local Storage for High Scores'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Web Audio API', 'Local Storage'],
            challenges: 'Creating smooth animations, managing game state effectively, and implementing audio feedback across different browsers.',
            github: 'https://github.com/Ashu2380',
            demo: '#'
        },
        event: {
            title: 'Event Management System - Salesforce',
            description: 'A comprehensive Salesforce-based application designed to streamline event management processes. This system helps organizations manage events from planning to execution with automated workflows and real-time tracking.',
            features: [
                'Event Planning & Scheduling',
                'Participant Registration Management',
                'Automated Email Communications',
                'Resource & Venue Management',
                'Real-time Event Analytics',
                'Mobile-Responsive Interface',
                'Integration with Calendar Systems',
                'Automated Reporting'
            ],
            technologies: ['Salesforce', 'Apex', 'Lightning Components', 'SOQL', 'Process Builder', 'Flow'],
            challenges: 'Designing complex data relationships, implementing automated workflows, and ensuring optimal performance with large datasets.',
            github: 'https://github.com/Ashu2380',
            demo: '#'
        },
        hospital: {
            title: 'Hospital Management System - Salesforce',
            description: 'A comprehensive hospital management solution built on the Salesforce platform. This system digitizes and automates various hospital operations, improving efficiency and patient care quality.',
            features: [
                'Patient Record Management',
                'Appointment Scheduling System',
                'Doctor & Staff Management',
                'Medical History Tracking',
                'Billing & Insurance Processing',
                'Inventory Management',
                'Report Generation',
                'Multi-location Support'
            ],
            technologies: ['Salesforce', 'Apex', 'Lightning Web Components', 'SOQL', 'Einstein Analytics'],
            challenges: 'Managing complex healthcare data relationships, ensuring HIPAA compliance, and creating intuitive interfaces for diverse user roles.',
            github: 'https://github.com/Ashu2380',
            demo: '#'
        }
    };

    // Open modal functionality
    const projectLinks = document.querySelectorAll('.project-link[data-project]');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.getAttribute('data-project');
            openModal(projectData[projectId]);
        });
    });

    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalHandler();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });
}

function openModal(projectData) {
    if (!projectData || !modal || !modalBody) return;

    const modalContent = `
        <div class="project-modal-header">
            <h2>${projectData.title}</h2>
        </div>
        <div class="project-modal-content">
            <div class="project-description">
                <h3>Project Overview</h3>
                <p>${projectData.description}</p>
            </div>
            
            <div class="project-features">
                <h3>Key Features</h3>
                <ul>
                    ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-technologies">
                <h3>Technologies Used</h3>
                <div class="tech-tags">
                    ${projectData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-challenges">
                <h3>Challenges & Solutions</h3>
                <p>${projectData.challenges}</p>
            </div>
            
            <div class="project-links">
                <a href="${projectData.github}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
                <a href="${projectData.demo}" class="btn btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;

    modalBody.innerHTML = modalContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// Contact Form
// ========================================
function initializeContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add input validation and styling
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual implementation)
    setTimeout(() => {
        showFormSuccess();
        contactForm.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function validateForm(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showValidationError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showValidationError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!data.subject || data.subject.trim().length < 3) {
        showValidationError('subject', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showValidationError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    switch (input.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showValidationError(input.name, 'Please enter a valid email address');
            }
            break;
        case 'text':
            if (input.name === 'name' && value && value.length < 2) {
                showValidationError(input.name, 'Name must be at least 2 characters long');
            } else if (input.name === 'subject' && value && value.length < 3) {
                showValidationError(input.name, 'Subject must be at least 3 characters long');
            }
            break;
    }
    
    if (input.tagName === 'TEXTAREA' && value && value.length < 10) {
        showValidationError(input.name, 'Message must be at least 10 characters long');
    }
}

function showValidationError(fieldName, message) {
    const field = contactForm.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    // Remove existing error
    clearValidationError({ target: field });
    
    // Add error styling
    field.style.borderColor = '#e74c3c';
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearValidationError(e) {
    const field = e.target;
    field.style.borderColor = '';
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showFormSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;
    successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
    
    contactForm.parentNode.insertBefore(successDiv, contactForm);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ========================================
// Scroll Animations
// ========================================
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .training-card, .achievement-card, .about-text, .about-stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                animatedElements.add(entry.target);
                
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        observer.observe(element);
    });
}

function handleScrollAnimations() {
    // Add scroll-based animations here
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icons');
    
    parallaxElements.forEach(element => {
        const speed = 0.2;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// ========================================
// Utility Functions
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// Additional Interactive Features
// ========================================

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Enhanced hover effects
function initializeHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-item, .achievement-card, .training-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeHoverEffects();
    
    // Add reveal class to elements that should animate on scroll
    const elementsToReveal = document.querySelectorAll('.about-content, .skills-container, .projects-grid, .education-timeline, .training-grid, .contact-content');
    elementsToReveal.forEach(element => element.classList.add('reveal'));
    
    window.addEventListener('scroll', revealOnScroll);
});

// ========================================
// Performance Optimization
// ========================================

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'images/profile-photo.jpg',
        'images/ecommerce-project.jpg',
        'images/simon-game.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    preloadCriticalResources();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
