// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveFeatures();
    createFloatingRoses();
    setupClickHandlers();
    setupMessageSystem();
});

// Create floating roses background
function createFloatingRoses() {
    const roseContainer = document.getElementById('roseContainer');
    const roseEmojis = ['🌹', '🌸', '💐', '🌺'];

    for (let i = 0; i < 10; i++) {
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
    // Add hover sound effects (optional)
    const clickableItems = document.querySelectorAll('.clickable-item');
    clickableItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05) rotate(2deg)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// Setup click handlers for interactive elements
function setupClickHandlers() {
    const clickableItems = document.querySelectorAll('.clickable-item');

    clickableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Add clicked animation
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);

            // Get the content type
            const contentType = this.dataset.content;
            if (contentType) {
                showContent(contentType);
                createClickEffect(e.pageX, e.pageY);
            }
        });
    });
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

// Setup message system
function setupMessageSystem() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.querySelector('.send-btn');

    if (sendBtn) {
        sendBtn.addEventListener('click', shareMessage);
    }

    if (messageInput) {
        // Allow Ctrl+Enter to send message
        messageInput.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                shareMessage();
            }
        });
    }
}

// Share message function
function shareMessage() {
    const messageInput = document.getElementById('messageInput');
    const messagesDisplay = document.getElementById('messagesDisplay');
    const messageText = messageInput.value.trim();

    if (messageText === '') {
        alert('Please write a beautiful message first! 💖');
        return;
    }

    // Create message element
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';

    const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    messageItem.innerHTML = `
        <p>${escapeHtml(messageText)}</p>
        <span class="message-time">${currentTime}</span>
    `;

    // Add to display
    messagesDisplay.insertBefore(messageItem, messagesDisplay.firstChild);

    // Clear input
    messageInput.value = '';

    // Create celebration effect
    createMessageCelebration();

    // Limit messages to prevent overcrowding
    const messages = messagesDisplay.querySelectorAll('.message-item');
    if (messages.length > 5) {
        messagesDisplay.removeChild(messages[messages.length - 1]);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Create message celebration effect
function createMessageCelebration() {
    const hearts = ['💖', '💕', '💗', '💝', '💘'];
    const messageArea = document.querySelector('.message-area');
    const rect = messageArea.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'celebration-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.fontSize = (20 + Math.random() * 15) + 'px';
        heart.style.color = '#ff69b4';

        document.body.appendChild(heart);

        setTimeout(() => {
            if (document.body.contains(heart)) {
                document.body.removeChild(heart);
            }
        }, 2000);
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
        e.target.classList.contains('content-areas')) {

        if (Math.random() > 0.7) { // 30% chance
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

// Add welcome message on load
window.addEventListener('load', function() {
    setTimeout(() => {
        const messagesDisplay = document.getElementById('messagesDisplay');
        if (messagesDisplay) {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'message-item';
            welcomeMessage.innerHTML = `
                <p>Welcome to our Women's Day celebration! Click on any emoji above to discover beautiful messages. 🌹</p>
                <span class="message-time">Just now</span>
            `;
            messagesDisplay.appendChild(welcomeMessage);
        }
    }, 1000);
});

// Add hover effects to the main title
const mainTitle = document.querySelector('.main-title');
if (mainTitle) {
    mainTitle.addEventListener('mouseenter', function() {
        createTitleSparkles();
    });
}

// Create sparkles around title
function createTitleSparkles() {
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