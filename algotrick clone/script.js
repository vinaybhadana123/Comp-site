// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate stats on scroll
function animateStats() {
    const statBoxes = document.querySelectorAll('.stat-box h2');
    statBoxes.forEach(box => {
        const target = parseInt(box.textContent.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                box.textContent = target.toLocaleString() + (box.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                box.textContent = Math.floor(current).toLocaleString() + (box.textContent.includes('+') ? '+' : '');
            }
        }, 20);
    });
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

function checkStatsVisibility() {
    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0 && !statsAnimated) {
        animateStats();
        statsAnimated = true;
    }
}

window.addEventListener('scroll', checkStatsVisibility);
window.addEventListener('load', checkStatsVisibility);

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter');
const newsletterInput = document.querySelector('.newsletter-input');
const newsletterBtn = document.querySelector('.newsletter-btn');

newsletterBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const email = newsletterInput.value.trim();

    if (email === '') {
        showNotification('Please enter your email address', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    newsletterBtn.disabled = true;

    setTimeout(() => {
        showNotification('Thank you for subscribing! You\'ll receive our latest updates.', 'success');
        newsletterInput.value = '';
        newsletterBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        newsletterBtn.disabled = false;
    }, 1500);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        padding: 15px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-left: 4px solid #27ae60;
    }

    .notification.success i {
        color: #27ae60;
    }

    .notification.error {
        border-left: 4px solid #e74c3c;
    }

    .notification.error i {
        color: #e74c3c;
    }

    .notification i {
        font-size: 18px;
    }

    .notification span {
        font-size: 14px;
        color: #2c3e50;
    }

    @media (max-width: 480px) {
        .notification {
            left: 10px;
            right: 10px;
            max-width: none;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Mobile menu toggle (for future implementation)
const menuToggle = document.querySelector('.fa-bars');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        // Future mobile menu implementation
        console.log('Mobile menu toggle clicked');
    });
}