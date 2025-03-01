// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navRight.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navRight && navRight.classList.contains('active')) {
            if (!navRight.contains(event.target) && !menuToggle.contains(event.target)) {
                navRight.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (navRight && navRight.classList.contains('active')) {
                    navRight.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Scroll animations for navbar
    const nav = document.querySelector('nav');
    const heroSection = document.querySelector('.hero');
    
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        
        // Show/hide navbar based on scroll position
        if (scrollPosition > 100) {
            nav.classList.add('visible');
        } else {
            // Only hide navbar if not on about or contact page
            if (!document.body.classList.contains('about-page') && 
                !document.body.classList.contains('contact-page')) {
                nav.classList.remove('visible');
            }
        }
        
        // Make stories section visible immediately
        const storiesSection = document.querySelector('.stories');
        if (storiesSection) {
            storiesSection.classList.add('visible');
        }
    }
    
    // Initial check for page load
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href="#' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-links a[href="#' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message (in a real application)
            alert('Grazie per il tuo messaggio! Ti risponderemo al più presto.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Make all gallery items visible immediately
    const galleryItems = document.querySelectorAll('.gallery-item, .story-item');
    galleryItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
}); 