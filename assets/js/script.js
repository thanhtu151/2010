// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveFeatures();
    createFloatingRoses();
    startFallingEmojis();
    setupDynamicImages();
    setupClickHandlers();
});

// Create floating roses background
function createFloatingRoses() {
    const roseContainer = document.getElementById('roseContainer');
    const roseEmojis = ['🌹', '🌸', '💐', '🌺'];

    for (let i = 0; i < 8; i++) {
        const rose = document.createElement('div');
        rose.className = 'floating-rose';
        rose.textContent = roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
        rose.style.left = Math.random() * 100 + '%';
        rose.style.animationDelay = Math.random() * 15 + 's';
        rose.style.animationDuration = (15 + Math.random() * 10) + 's';
        roseContainer.appendChild(rose);
    }
}

// Initialize interactive features
function initializeInteractiveFeatures() {
    // Add hover effects to title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.addEventListener('mouseenter', function() {
            createTitleSparkles();
        });
    }
}

// Start falling emojis system
function startFallingEmojis() {
    const fallingArea = document.getElementById('fallingArea');
    if (!fallingArea) return;

    // Define emoji types and their content
    const emojiTypes = [
        { emoji: '🌹', class: 'rose', content: 'strength' },
        { emoji: '💖', class: 'heart', content: 'beauty' },
        { emoji: '⭐', class: 'star', content: 'wisdom' },
        { emoji: '🌸', class: 'flower', content: 'love' },
        { emoji: '🎁', class: 'gift', content: 'inspiration' },
        { emoji: '👑', class: 'crown', content: 'excellence' },
        { emoji: '💎', class: 'diamond', content: 'strength' },
        { emoji: '🦋', class: 'butterfly', content: 'beauty' },
        { emoji: '✨', class: 'sparkle', content: 'wisdom' },
        { emoji: '🌺', class: 'flower', content: 'love' },
        { emoji: '💝', class: 'heart', content: 'inspiration' },
        { emoji: '🏆', class: 'crown', content: 'excellence' }
    ];

    // Create falling emojis continuously
    function createFallingEmoji() {
        const randomType = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
        const fallingItem = document.createElement('div');
        fallingItem.className = `falling-item ${randomType.class}`;
        fallingItem.textContent = randomType.emoji;
        fallingItem.dataset.content = randomType.content;

        // Random horizontal position
        const randomX = Math.random() * 90 + 5; // 5% to 95% to avoid edges
        fallingItem.style.left = randomX + '%';

        // Random fall duration (between 5 and 12 seconds)
        const fallDuration = Math.random() * 7 + 5;
        fallingItem.style.animationDuration = fallDuration + 's';

        // Random size
        const randomSize = Math.random() * 1.5 + 2; // 2rem to 3.5rem
        fallingItem.style.fontSize = randomSize + 'rem';

        // Add click event
        fallingItem.addEventListener('click', function(e) {
            e.preventDefault();
            handleFallingItemClick(this, e);
        });

        fallingArea.appendChild(fallingItem);

        // Remove emoji after animation completes
        setTimeout(() => {
            if (fallingArea.contains(fallingItem)) {
                fallingArea.removeChild(fallingItem);
            }
        }, fallDuration * 1000);
    }

    // Create first batch immediately
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFallingEmoji(), i * 200);
    }

    // Continue creating new falling emojis
    setInterval(createFallingEmoji, 1500);

    // Create extra emojis more frequently for more interaction
    setInterval(() => {
        if (Math.random() > 0.3) { // 70% chance
            createFallingEmoji();
        }
    }, 800);
}

// Handle falling item click
function handleFallingItemClick(item, event) {
    // Add clicked animation
    item.classList.add('clicked');
    setTimeout(() => {
        item.classList.remove('clicked');
    }, 600);

    // Get content type
    const contentType = item.dataset.content;
    if (contentType) {
        showContent(contentType);
        updateActiveImage(contentType);
        createClickEffect(event.pageX, event.pageY);
    }
}

// Setup dynamic images
function setupDynamicImages() {
    const dynamicImages = document.querySelectorAll('.dynamic-image');

    dynamicImages.forEach(image => {
        image.addEventListener('click', function() {
            const contentType = this.dataset.content;
            if (contentType) {
                showContent(contentType);
                updateActiveImage(contentType);
                createClickEffect(window.innerWidth / 2, window.innerHeight / 2);
            }
        });

        // Add hover effect
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1) rotate(5deg)';
        });

        image.addEventListener('mouseleave', function() {
            const isActive = this.classList.contains('active');
            this.style.transform = isActive ? 'scale(1.15)' : 'scale(1)';
        });
    });
}

// Update active image
function updateActiveImage(contentType) {
    const allImages = document.querySelectorAll('.dynamic-image');
    allImages.forEach(img => {
        img.classList.remove('active');
        img.style.transform = 'scale(1)';
    });

    const activeImage = document.querySelector(`.dynamic-image[data-content="${contentType}"]`);
    if (activeImage) {
        activeImage.classList.add('active');
        activeImage.style.transform = 'scale(1.15)';
    }
}

// Setup click handlers (for any remaining elements)
function setupClickHandlers() {
    // Any additional click handlers can be added here
}

// Show content dropdown
function showContent(contentType) {
    // Hide all content dropdowns first
    const allDropdowns = document.querySelectorAll('.content-dropdown');
    allDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });

    // Show the selected content
    const selectedContent = document.getElementById(contentType + '-content');
    if (selectedContent) {
        // Small delay for better animation
        setTimeout(() => {
            selectedContent.classList.add('active');
            // Scroll to the content
            selectedContent.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);

        // Create celebration effect
        createCelebrationParticles();
    }
}

// Close content dropdown
function closeContent(contentId) {
    const content = document.getElementById(contentId);
    if (content) {
        content.classList.remove('active');
        createClickEffect(window.innerWidth / 2, window.innerHeight / 2);
    }
}

// Create click effect at position
function createClickEffect(x, y) {
    const particles = ['🌹', '✨', '💖', '🌟', '💫'];
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb'];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = (20 + Math.random() * 15) + 'px';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];

        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 50 + Math.random() * 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        particle.style.transform = `translate(${dx}px, ${dy}px)`;

        document.body.appendChild(particle);

        setTimeout(() => {
            document.body.removeChild(particle);
        }, 2000);
    }
}

// Create celebration particles
function createCelebrationParticles() {
    const emojis = ['🌹', '🌸', '💖', '✨', '🎉', '💐', '🌺'];
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff69b4'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'celebration-particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = '-50px';
            particle.style.fontSize = (25 + Math.random() * 20) + 'px';
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];

            document.body.appendChild(particle);

            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 3000);
        }, i * 100);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC to close any open content
    if (e.key === 'Escape') {
        const activeDropdowns = document.querySelectorAll('.content-dropdown.active');
        activeDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // Number keys to trigger different content
    if (e.key >= '1' && e.key <= '6') {
        const contents = ['strength', 'beauty', 'wisdom', 'love', 'inspiration', 'excellence'];
        const index = parseInt(e.key) - 1;
        if (contents[index]) {
            showContent(contents[index]);
        }
    }
});

// Add some random interactive elements
document.addEventListener('click', function(e) {
    // Random rose drops on empty clicks
    if (e.target === document.body ||
        e.target.classList.contains('interactive-main') ||
        e.target.classList.contains('falling-area')) {

        if (Math.random() > 0.6) { // 40% chance
            createRandomRose(e.pageX, e.pageY);
        }
    }
});

// Create random rose at click position
function createRandomRose(x, y) {
    const rose = document.createElement('div');
    rose.textContent = '🌹';
    rose.style.position = 'fixed';
    rose.style.left = x + 'px';
    rose.style.top = y + 'px';
    rose.style.fontSize = '30px';
    rose.style.pointerEvents = 'none';
    rose.style.zIndex = '9999';
    rose.style.transition = 'all 1s ease-out';
    rose.style.transform = 'scale(0) rotate(0deg)';

    document.body.appendChild(rose);

    setTimeout(() => {
        rose.style.transform = 'scale(1) rotate(180deg)';
    }, 10);

    setTimeout(() => {
        rose.style.transform = 'scale(0) rotate(360deg)';
        rose.style.opacity = '0';
    }, 800);

    setTimeout(() => {
        if (document.body.contains(rose)) {
            document.body.removeChild(rose);
        }
    }, 1800);
}

// Create sparkles around title
function createTitleSparkles() {
    const mainTitle = document.querySelector('.main-title');
    if (!mainTitle) return;

    const titleRect = mainTitle.getBoundingClientRect();
    const sparkles = ['✨', '⭐', '💫'];

    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = (titleRect.left + Math.random() * titleRect.width) + 'px';
        sparkle.style.top = (titleRect.top + Math.random() * titleRect.height) + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '999';
        sparkle.style.animation = 'particleFall 1s ease-out forwards';

        document.body.appendChild(sparkle);

        setTimeout(() => {
            if (document.body.contains(sparkle)) {
                document.body.removeChild(sparkle);
            }
        }, 1000);
    }
}