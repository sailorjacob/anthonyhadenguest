// Initialize Lucide icons
lucide.createIcons();

// Gallery data
const galleryData = {
    'smile-wars': [
        {
            id: 1,
            title: 'Smile Wars #1',
            description: 'Social Commentary',
            src: 'https://drive.google.com/uc?export=view&id=15qBDc3LPXkE1W5mcnXw9BcKfibgZ-cWu'
        },
        {
            id: 2,
            title: 'Smile Wars #2',
            description: 'Cultural Observation',
            src: 'https://drive.google.com/uc?export=view&id=1HdzxIvntWTRYEetW3x-oLvSXFuoijq1b'
        },
        {
            id: 3,
            title: 'Smile Wars #3',
            description: 'Social Dynamics',
            src: 'https://drive.google.com/uc?export=view&id=1K8cpyUtTpTLxwyYGhL1E5JW8jxcXS1bV'
        },
        {
            id: 4,
            title: 'Smile Wars #4',
            description: 'Contemporary Critique',
            src: 'https://drive.google.com/uc?export=view&id=1Lt-eHT25vxcP8L_Lw_oaFgCK5yQ6qT86'
        },
        {
            id: 5,
            title: 'Smile Wars #5',
            description: 'Visual Commentary',
            src: 'https://drive.google.com/uc?export=view&id=1M9C7al8RI3b0YGHgbSKuFWMekND0kbHZ'
        },
        {
            id: 6,
            title: 'Smile Wars #6',
            description: 'Satirical Insight',
            src: 'https://drive.google.com/uc?export=view&id=1hVZe2oaaoMe5_RdLtzsKDBVQeJSkk2_-'
        },
        {
            id: 7,
            title: 'Smile Wars #7',
            description: 'Social Observation',
            src: 'https://drive.google.com/uc?export=view&id=1upzI1GpCAOltJROvnje_7j0h0M8hbCUe'
        }
    ]
};

// Custom cursor functionality
const cursor = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Smooth cursor animation
function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Enhanced cursor for interactive elements
document.querySelectorAll('a, button, .artwork-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.opacity = '0.8';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.opacity = '1';
    });
});

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentGallery = 'smile-wars';
let currentImageIndex = 0;

// Open lightbox
function openLightbox(galleryType, imageIndex) {
    currentGallery = galleryType;
    currentImageIndex = imageIndex;
    
    const imageData = galleryData[galleryType][imageIndex];
    
    lightboxImage.src = imageData.src;
    lightboxTitle.textContent = imageData.title;
    lightboxDescription.textContent = imageData.description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add loading animation
    lightboxImage.style.opacity = '0';
    lightboxImage.onload = () => {
        lightboxImage.style.transition = 'opacity 0.3s ease';
        lightboxImage.style.opacity = '1';
    };
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate lightbox
function navigateLightbox(direction) {
    const gallery = galleryData[currentGallery];
    
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % gallery.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + gallery.length) % gallery.length;
    }
    
    const imageData = gallery[currentImageIndex];
    
    // Fade out
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = imageData.src;
        lightboxTitle.textContent = imageData.title;
        lightboxDescription.textContent = imageData.description;
        
        lightboxImage.onload = () => {
            lightboxImage.style.opacity = '1';
        };
    }, 150);
}

// Event listeners for lightbox
lightboxClose.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigateLightbox('prev'));
nextBtn.addEventListener('click', () => navigateLightbox('next'));

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox('prev');
                break;
            case 'ArrowRight':
                navigateLightbox('next');
                break;
        }
    }
});

// Artwork card click handlers
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const artworkId = parseInt(btn.getAttribute('data-artwork'));
        const gallerySection = btn.closest('.gallery-section');
        const galleryType = gallerySection.id;
        
        openLightbox(galleryType, artworkId - 1);
    });
});

// Artwork card click (entire card clickable)
document.querySelectorAll('.artwork-card').forEach(card => {
    card.addEventListener('click', () => {
        const artworkId = parseInt(card.getAttribute('data-artwork'));
        const gallerySection = card.closest('.gallery-section');
        const galleryType = gallerySection.id;
        
        openLightbox(galleryType, artworkId - 1);
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.artwork-card, .section-header, .about-text, .stat').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Staggered animation for gallery items
function addStaggeredAnimation() {
    const artworkCards = document.querySelectorAll('.artwork-card');
    artworkCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// Enhanced hover effects for artwork cards
document.querySelectorAll('.artwork-card').forEach(card => {
    const image = card.querySelector('.artwork-image');
    const overlay = card.querySelector('.artwork-overlay');
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
        overlay.style.transform = 'translateY(0)';
        card.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
        overlay.style.transform = 'translateY(100%)';
        card.style.transform = 'translateY(0)';
    });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Image lazy loading with fade-in effect
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            if (img.complete) {
                img.style.opacity = '1';
            }
            
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('.artwork-image').forEach(img => {
    imageObserver.observe(img);
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
    // Header effect
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Parallax shapes
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add staggered animation to gallery items
    setTimeout(addStaggeredAnimation, 500);
    
    // Initialize stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            }
        };
        
        // Start counter when element is visible
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    statObserver.unobserve(entry.target);
                }
            });
        });
        
        statObserver.observe(stat.parentElement);
    });
});

// Add mobile menu styles
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transform: translateY(-20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// Preload images for better performance
function preloadImages() {
    galleryData['smile-wars'].forEach(item => {
        const img = new Image();
        img.src = item.src;
    });
}

// Initialize preloading
preloadImages(); 