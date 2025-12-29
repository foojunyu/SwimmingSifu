// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all level buttons and content sections
    const levelButtons = document.querySelectorAll('.level-btn');
    const levelContents = document.querySelectorAll('.level-content');

    // Function to switch between levels
    function switchLevel(targetLevel) {
        // Remove active class from all buttons and contents
        levelButtons.forEach(btn => btn.classList.remove('active'));
        levelContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-level="${targetLevel}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Show corresponding content
        const activeContent = document.getElementById(targetLevel);
        if (activeContent) {
            activeContent.classList.add('active');
            
            // Smooth scroll to content
            activeContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }

        // Save current level to localStorage
        localStorage.setItem('currentLevel', targetLevel);
    }

    // Add click event listeners to all level buttons
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            switchLevel(level);
        });
    });

    // Restore last viewed level from localStorage
    const savedLevel = localStorage.getItem('currentLevel');
    if (savedLevel) {
        switchLevel(savedLevel);
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const levels = ['beginner', 'intermediate', 'pro', 'elite', 'worldclass'];
        const currentActive = document.querySelector('.level-btn.active');
        
        if (!currentActive) return;

        const currentLevel = currentActive.getAttribute('data-level');
        const currentIndex = levels.indexOf(currentLevel);

        // Left arrow or 'A' key - previous level
        if ((e.key === 'ArrowLeft' || e.key === 'a') && currentIndex > 0) {
            switchLevel(levels[currentIndex - 1]);
        }
        
        // Right arrow or 'D' key - next level
        if ((e.key === 'ArrowRight' || e.key === 'd') && currentIndex < levels.length - 1) {
            switchLevel(levels[currentIndex + 1]);
        }

        // Number keys 1-5 for direct navigation
        if (e.key >= '1' && e.key <= '5') {
            const levelIndex = parseInt(e.key) - 1;
            switchLevel(levels[levelIndex]);
        }
    });

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Add progress tracker
    function updateProgressIndicator() {
        const levels = ['beginner', 'intermediate', 'pro', 'elite', 'worldclass'];
        const currentActive = document.querySelector('.level-btn.active');
        
        if (currentActive) {
            const currentLevel = currentActive.getAttribute('data-level');
            const currentIndex = levels.indexOf(currentLevel);
            const progressPercent = ((currentIndex + 1) / levels.length) * 100;
            
            // Update progress bar if it exists
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = progressPercent + '%';
            }
        }
    }

    // Call on page load and level change
    updateProgressIndicator();
    levelButtons.forEach(button => {
        button.addEventListener('click', updateProgressIndicator);
    });

    // Log welcome message
    console.log('🏊 Welcome to Swimming Sifu!');
    console.log('💡 Tip: Use arrow keys or number keys 1-5 to navigate between levels');
    console.log('⌨️ Keyboard shortcuts: ← → (or A/D) to switch levels, 1-5 for direct access');
});
