// Initialize advanced animations
document.addEventListener('DOMContentLoaded', function() {
    // Skill bar animation
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(skillBar => {
            const percentage = skillBar.getAttribute('data-percentage');
            const progressBar = skillBar.querySelector('.bg-primary, .bg-secondary');
            
            // Only animate if not already animated
            if (progressBar && !progressBar.classList.contains('animated')) {
                setTimeout(() => {
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1s ease-in-out';
                        progressBar.style.width = percentage + '%';
                        progressBar.classList.add('animated');
                    }, 100);
                }, 200);
            }
        });
    }
    
    // Add animation to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if it's a skill section
                if (entry.target.querySelector('.skill-bar')) {
                    animateSkillBars();
                }
                
                // Add general animations
                entry.target.classList.add('show');
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Type writer effect for hero section
    let typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        let text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    });
    
    // Counter animation for stat boxes
    let statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        let target = parseInt(element.textContent);
        let count = 0;
        let speed = 2000 / target; // Adjust speed based on target value
        
        function updateCount() {
            if (count < target) {
                count++;
                element.textContent = count + '+';
                setTimeout(updateCount, speed);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCount();
    }
    
    // Setup the intersection observer for counters
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Make sure we extract just the number part before +
                let number = entry.target.textContent.replace('+', '');
                entry.target.textContent = '0';
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stat numbers
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('#home');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            // Only apply parallax if not on mobile
            if (window.innerWidth > 768) {
                heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.projects .bg-white');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow-lg');
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-lg');
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Smooth reveal of sections
    window.addEventListener('scroll', debounce(checkSections, 50));
    function checkSections() {
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
    
    // Debounce function to limit how often a function is called
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
    
    // Check sections on page load
    checkSections();
});
