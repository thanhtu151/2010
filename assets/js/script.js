// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    createFloatingRoses();
    createFloatingHearts();
    setupMobileMenu();
    setupSmoothScrolling();
    initializeAOS();
});

// Create floating roses background
function createFloatingRoses() {
    const roseContainer = document.getElementById('roseContainer');
    const roseEmojis = ['🌹', '🌸', '💐', '🌺'];

    for (let i = 0; i < 15; i++) {
        const rose = document.createElement('div');
        rose.className = 'floating-rose';
        rose.textContent = roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
        rose.style.left = Math.random() * 100 + '%';
        rose.style.animationDelay = Math.random() * 15 + 's';
        rose.style.animationDuration = (15 + Math.random() * 10) + 's';
        roseContainer.appendChild(rose);
    }
}

// Create floating hearts in hero section
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartEmojis = ['💖', '💕', '💗', '💝', '💘'];

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heartsContainer.appendChild(heart);
    }
}

// Mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add message functionality
function addMessage() {
    const messageInput = document.getElementById('messageInput');
    const messagesDisplay = document.getElementById('messagesDisplay');
    const messageText = messageInput.value.trim();

    if (messageText === '') {
        alert('Please write a beautiful message first! 💖');
        return;
    }

    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.style.opacity = '0';
    messageItem.style.transform = 'translateY(20px)';

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageItem.innerHTML = `
        <div class="message-avatar">👩</div>
        <div class="message-content">
            <p>${escapeHtml(messageText)}</p>
            <span class="message-time">${currentTime}</span>
        </div>
    `;

    messagesDisplay.insertBefore(messageItem, messagesDisplay.firstChild);
    messageInput.value = '';

    // Animate the new message
    setTimeout(() => {
        messageItem.style.transition = 'all 0.5s ease';
        messageItem.style.opacity = '1';
        messageItem.style.transform = 'translateY(0)';
    }, 10);

    // Add celebration effect
    createCelebrationEffect();
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

// Create celebration effect when message is added
function createCelebrationEffect() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ff69b4', '#ffc0cb'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = '0';
        particle.style.top = '0';

        const angle = (i * 30) * Math.PI / 180;
        const velocity = 200 + Math.random() * 100;
        const lifetime = 1000 + Math.random() * 1000;

        container.appendChild(particle);

        let startTime = null;
        function animateParticle(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / lifetime;

            if (progress < 1) {
                const x = Math.cos(angle) * velocity * progress;
                const y = Math.sin(angle) * velocity * progress + (progress * progress * 100);
                const opacity = 1 - progress;

                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;

                requestAnimationFrame(animateParticle);
            } else {
                container.removeChild(particle);
            }
        }

        requestAnimationFrame(animateParticle);
    }

    setTimeout(() => {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }, 3000);
}

// Initialize AOS (Animate on Scroll)
function initializeAOS() {
    // Simple AOS implementation since we're not loading the library
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.aos;
                const delay = element.dataset.aosDelay || 0;

                setTimeout(() => {
                    switch(animationType) {
                        case 'fade-up':
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                            break;
                        case 'zoom-in':
                            element.style.opacity = '1';
                            element.style.transform = 'scale(1)';
                            break;
                    }
                }, delay);

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Set initial states and observe elements
    document.querySelectorAll('[data-aos]').forEach(element => {
        const animationType = element.dataset.aos;

        switch(animationType) {
            case 'fade-up':
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                break;
            case 'zoom-in':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                break;
        }

        observer.observe(element);
    });
}

// Add hover effects to cards
function initializeAnimations() {
    // Add hover effect to tribute cards
    document.querySelectorAll('.tribute-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(1deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Add dynamic rose growth on click
    document.querySelectorAll('.rose').forEach(rose => {
        rose.addEventListener('click', function() {
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);

            // Create small floating rose
            createMiniRose(this);
        });
    });
}

// Create mini rose effect
function createMiniRose(element) {
    const miniRose = document.createElement('div');
    miniRose.textContent = '🌹';
    miniRose.style.position = 'absolute';
    miniRose.style.fontSize = '30px';
    miniRose.style.pointerEvents = 'none';
    miniRose.style.zIndex = '1000';
    miniRose.style.transition = 'all 2s ease-out';

    const rect = element.getBoundingClientRect();
    miniRose.style.left = rect.left + rect.width / 2 + 'px';
    miniRose.style.top = rect.top + rect.height / 2 + 'px';

    document.body.appendChild(miniRose);

    setTimeout(() => {
        miniRose.style.transform = 'translateY(-100px) scale(0)';
        miniRose.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        document.body.removeChild(miniRose);
    }, 2000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Ctrl/Cmd + Enter to submit message
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const messageInput = document.getElementById('messageInput');
        if (document.activeElement === messageInput) {
            addMessage();
        }
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const roses = document.querySelectorAll('.floating-rose');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }

    roses.forEach((rose, index) => {
        const speed = 0.5 + (index * 0.1);
        rose.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add dynamic time-based greeting
function updateTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good day';

    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    // You could add this to the hero subtitle if desired
    return greeting;
}

// Add confetti effect on page load
window.addEventListener('load', function() {
    setTimeout(createPageLoadConfetti, 500);
});

function createPageLoadConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#fff'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = '0.8';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.transition = 'all 3s ease-out';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = '100%';
                confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
                confetti.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 3000);
        }, i * 30);
    }
}