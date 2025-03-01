// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get navbar element
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    
    // Show/hide navbar on scroll
    window.addEventListener('scroll', function() {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Show navbar when scrolled past hero section
        if (scrollPosition > heroHeight - 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navRight = document.querySelector('.nav-right');
    const bars = document.querySelectorAll('.menu-toggle .bar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navRight.classList.toggle('active');
            bars.forEach(bar => bar.classList.toggle('change'));
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navRight && navRight.classList.contains('active')) {
            if (!navRight.contains(event.target) && !menuToggle.contains(event.target)) {
                navRight.classList.remove('active');
                bars.forEach(bar => bar.classList.remove('change'));
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
                    bars.forEach(bar => bar.classList.remove('change'));
                }
            }
        });
    });
    
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
    
    // Initialize image hover effects for story items
    const storyItems = document.querySelectorAll('.story-item');
    
    storyItems.forEach(item => {
        const content = item.querySelector('.story-content');
        const link = item.querySelector('.story-link');
        
        if (content && link) {
            // Show content on hover
            item.addEventListener('mouseenter', () => {
                content.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                content.style.opacity = '0';
            });
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', { name, email, date, message });
            
            // Show success message (in a real application)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.gallery-item, .package');
        
        elements.forEach(function(element) {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
}); 