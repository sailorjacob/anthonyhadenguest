// Gallery data with corrected image URLs
const galleryData = {
    'smile-wars': [
        { id: '15qBDc3LPXkE1W5mcnXw9BcKfibgZ-cWu', title: 'Smile Wars #1' },
        { id: '1HdzxIvntWTRYEetW3x-oLvSXFuoijq1b', title: 'Smile Wars #2' },
        { id: '1K8cpyUtTpTLxwyYGhL1E5JW8jxcXS1bV', title: 'Smile Wars #3' },
        { id: '1Lt-eHT25vxcP8L_Lw_oaFgCK5yQ6qT86', title: 'Smile Wars #4' },
        { id: '1M9C7al8RI3b0YGHgbSKuFWMekND0kbHZ', title: 'Smile Wars #5' },
        { id: '1hVZe2oaaoMe5_RdLtzsKDBVQeJSkk2_-', title: 'Smile Wars #6' },
        { id: '1upzI1GpCAOltJROvnje_7j0h0M8hbCUe', title: 'Smile Wars #7' }
    ],
    'things-next': [
        { id: '1A7QXz0vClnkrnofbuxVRtDqeDls8rcKc', title: 'Things #1' },
        { id: '1E9M_YCUHsW1-SurimINJnMrC1ZahozPn', title: 'Things #2' },
        { id: '1F7H7caYwGZkp8EE4DK-aO9diwIvg0Oii', title: 'Things #3' },
        { id: '1HkSM-aVwpBUz4KVRDX__XSNIBMHQe7xI', title: 'Things #4' },
        { id: '1RMcuXx5w-I_5WqgdI8Y3urA531XB8Sn-', title: 'Things #5' },
        { id: '1UoxtKGQKvk5bFF4qyYiROtwhSRh7iFh1', title: 'Things #6' },
        { id: '1ViPloe6k_qM8WgbNe2_9wFmXwwXmONh8', title: 'Things #7' },
        { id: '1WwC53TAn82qB6Rv-acRJBfT_D1aTB25r', title: 'Things #8' },
        { id: '1dh1gacfbzJIB-CfYcJSth3sQ6MtIlfj5', title: 'Things #9' },
        { id: '1fH3GrsjEWQf47cH79ND4CDniMVzTa-Wr', title: 'Things #10' },
        { id: '1i7uU-qR3ciIqABIVxhK-sm9DLBMXxjmP', title: 'Things #11' },
        { id: '1nReW3MK6B7M2ZuKcebvNSz3JlUu_Kl1z', title: 'Things #12' },
        { id: '1tMMHlBCn6ZX0DvkPL2dXvaIRQO4j1ikM', title: 'Things #13' }
    ]
};

// DOM Elements
const galleryView = document.getElementById('gallery-view');
const imageViewer = document.getElementById('image-viewer');
const viewerImage = document.getElementById('viewer-image');
const viewerTitle = document.getElementById('viewer-title');
const viewerCounter = document.getElementById('viewer-counter');
const backBtn = document.getElementById('back-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const navbar = document.querySelector('.navbar');
const footer = document.querySelector('.footer');

// State
let currentCollection = '';
let currentIndex = 0;
let currentImages = [];
let isViewingImage = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupGallery();
    setupImageViewer();
    setupScrollAnimations();
    setupNavbarScroll();
    setupImageLoading();
});

// Setup gallery click handlers
function setupGallery() {
    document.querySelectorAll('.artwork-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            const collection = thumb.closest('.collection-section').getAttribute('data-collection');
            const index = parseInt(thumb.getAttribute('data-index'));
            openImageViewer(collection, index);
        });
        
        // Keyboard support
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                thumb.click();
            }
        });
    });
}

// Setup image viewer functionality
function setupImageViewer() {
    backBtn.addEventListener('click', closeImageViewer);
    prevBtn.addEventListener('click', () => navigateImage(-1));
    nextBtn.addEventListener('click', () => navigateImage(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Touch/swipe support
    setupSwipeSupport();
}

// Open image viewer (full page transformation)
function openImageViewer(collection, index) {
    currentCollection = collection;
    currentIndex = index;
    currentImages = galleryData[collection];
    isViewingImage = true;
    
    // Add body class for styling
    document.body.classList.add('viewing-image');
    
    // Hide gallery and footer with animation
    galleryView.classList.add('hidden');
    footer.classList.add('hidden');
    
    // Show image viewer
    setTimeout(() => {
        imageViewer.classList.add('active');
        updateViewerImage();
    }, 200);
    
    // Track interaction
    trackImageView(collection, index);
}

// Close image viewer (return to gallery)
function closeImageViewer() {
    isViewingImage = false;
    
    // Remove body class
    document.body.classList.remove('viewing-image');
    
    // Hide image viewer
    imageViewer.classList.remove('active');
    
    // Show gallery and footer
    setTimeout(() => {
        galleryView.classList.remove('hidden');
        footer.classList.remove('hidden');
    }, 200);
}

// Navigate between images
function navigateImage(direction) {
    currentIndex += direction;
    
    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }
    
    updateViewerImage();
}

// Update viewer image with smooth transition
function updateViewerImage() {
    const imageData = currentImages[currentIndex];
    const imageUrl = `https://drive.google.com/thumbnail?id=${imageData.id}&sz=w1200`;
    
    // Fade out current image
    viewerImage.style.opacity = '0';
    
    setTimeout(() => {
        viewerImage.src = imageUrl;
        viewerImage.alt = imageData.title;
        
        // Update title and counter
        viewerTitle.textContent = imageData.title;
        viewerCounter.textContent = `${currentIndex + 1} of ${currentImages.length}`;
        
        // Fade in new image when loaded
        viewerImage.onload = () => {
            viewerImage.style.opacity = '1';
        };
        
        // Handle load error
        viewerImage.onerror = () => {
            viewerImage.style.opacity = '1';
            console.warn('Failed to load image:', imageUrl);
        };
    }, 150);
}

// Handle keyboard navigation
function handleKeyboard(e) {
    if (!isViewingImage) return;
    
    switch(e.key) {
        case 'Escape':
            closeImageViewer();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            navigateImage(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            navigateImage(1);
            break;
        case ' ':
            e.preventDefault();
            navigateImage(1);
            break;
    }
}

// Setup swipe support for touch devices
function setupSwipeSupport() {
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;
    let isDragging = false;
    
    // Touch events
    imageViewer.addEventListener('touchstart', (e) => {
        if (!isViewingImage) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    });
    
    imageViewer.addEventListener('touchmove', (e) => {
        if (!isDragging || !isViewingImage) return;
        e.preventDefault();
    });
    
    imageViewer.addEventListener('touchend', (e) => {
        if (!isDragging || !isViewingImage) return;
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe(startX, endX, startY, endY);
        isDragging = false;
    });
    
    // Mouse drag support for desktop
    imageViewer.addEventListener('mousedown', (e) => {
        if (!isViewingImage || e.target !== viewerImage) return;
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
        e.preventDefault();
    });
    
    imageViewer.addEventListener('mousemove', (e) => {
        if (!isDragging || !isViewingImage) return;
        e.preventDefault();
    });
    
    imageViewer.addEventListener('mouseup', (e) => {
        if (!isDragging || !isViewingImage) return;
        endX = e.clientX;
        endY = e.clientY;
        handleSwipe(startX, endX, startY, endY);
        isDragging = false;
    });
}

// Handle swipe gestures
function handleSwipe(startX, endX, startY, endY) {
    const threshold = 50;
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Only handle horizontal swipes (ignore vertical)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            navigateImage(1); // Swipe left - next image
        } else {
            navigateImage(-1); // Swipe right - previous image
        }
    }
}

// Scroll animations for gallery view
function setupScrollAnimations() {
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

    // Observe collection sections
    document.querySelectorAll('.collection-section').forEach(section => {
        observer.observe(section);
    });
}

// Navbar scroll effect
function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (isViewingImage) return;
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.99)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Image loading with error handling
function setupImageLoading() {
    const images = document.querySelectorAll('.artwork-thumb img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.closest('.artwork-thumb').classList.remove('loading');
        });
        
        img.addEventListener('error', function() {
            const thumb = this.closest('.artwork-thumb');
            thumb.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    background: var(--gallery-bg);
                    color: var(--text-light);
                    font-style: italic;
                    text-align: center;
                    padding: 2rem;
                    font-weight: 300;
                    letter-spacing: 0.02em;
                ">
                    <p>Image unavailable</p>
                </div>
            `;
        });
        
        // Set initial loading state
        img.style.opacity = '0';
        img.closest('.artwork-thumb').classList.add('loading');
    });
}

// Preload images for better performance
function preloadImages() {
    Object.values(galleryData).flat().forEach(item => {
        const img = new Image();
        img.src = `https://drive.google.com/thumbnail?id=${item.id}&sz=w1200`;
    });
}

// Initialize preloading after a short delay
setTimeout(preloadImages, 2000);

// Analytics tracking
function trackImageView(collection, index) {
    console.log(`Image viewed: ${collection} #${index + 1}`, {
        collection,
        index,
        artwork: currentImages[index]?.title
    });
}

// Accessibility improvements
function setupAccessibility() {
    // Add ARIA labels and keyboard support
    document.querySelectorAll('.artwork-thumb').forEach((thumb, index) => {
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('tabindex', '0');
        thumb.setAttribute('aria-label', `View artwork ${index + 1}`);
    });
    
    // Image viewer accessibility
    imageViewer.setAttribute('role', 'dialog');
    imageViewer.setAttribute('aria-modal', 'true');
    imageViewer.setAttribute('aria-label', 'Full screen artwork viewer');
}

// Focus management
function setupFocusManagement() {
    let lastFocusedElement;
    
    // Store focus when opening viewer
    const originalOpenViewer = openImageViewer;
    window.openImageViewer = function(collection, index) {
        lastFocusedElement = document.activeElement;
        originalOpenViewer(collection, index);
        
        // Focus back button when viewer opens
        setTimeout(() => {
            backBtn.focus();
        }, 300);
    };
    
    // Restore focus when closing viewer
    const originalCloseViewer = closeImageViewer;
    window.closeImageViewer = function() {
        originalCloseViewer();
        
        // Return focus to the last focused element
        if (lastFocusedElement) {
            setTimeout(() => {
                lastFocusedElement.focus();
            }, 300);
        }
    };
}

// Initialize accessibility and focus management
setupAccessibility();
setupFocusManagement();

// Handle browser back button
window.addEventListener('popstate', (e) => {
    if (isViewingImage) {
        closeImageViewer();
    }
});

// Add history state when opening viewer
function addHistoryState() {
    if (isViewingImage) {
        history.pushState({ viewing: true }, '', window.location.href);
    }
}

// Enhanced error handling
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
    }
});

// Prevent context menu on images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (isViewingImage) {
        // Ensure image is properly sized after resize
        setTimeout(() => {
            viewerImage.style.maxWidth = '100%';
            viewerImage.style.maxHeight = '100%';
        }, 100);
    }
});

// Smooth scroll for anchor links (gallery view only)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (isViewingImage) return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Performance optimization with Intersection Observer
function optimizePerformance() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observe images for lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Debug helper
window.galleryDebug = {
    currentState: () => ({
        isViewingImage,
        currentCollection,
        currentIndex,
        currentImages: currentImages.length
    }),
    openViewer: openImageViewer,
    closeViewer: closeImageViewer,
    navigate: navigateImage
}; 