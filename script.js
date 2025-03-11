// Create and style the custom cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');

// Initially hide the cursor until we know where the mouse is
cursor.style.opacity = '0';
document.body.appendChild(cursor);

// Hide the default cursor completely
document.body.style.cursor = 'none';

// Initialize cursor position off-screen until we get a mouse position
cursor.style.left = '-100px';
cursor.style.top = '-100px';

// Update the position of the custom cursor on mouse move
document.addEventListener('mousemove', (e) => {
    // Update position
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    
    // Make sure cursor is visible once we have a position
    cursor.style.opacity = '1';
});

// Store the last known mouse position across page loads
document.addEventListener('mousemove', (e) => {
    // Save mouse position to localStorage
    localStorage.setItem('lastMouseX', e.pageX);
    localStorage.setItem('lastMouseY', e.pageY);
});

// On page load, position cursor at last known position
window.addEventListener('load', () => {
    const lastX = localStorage.getItem('lastMouseX');
    const lastY = localStorage.getItem('lastMouseY');
    
    if (lastX && lastY) {
        cursor.style.left = `${lastX}px`;
        cursor.style.top = `${lastY}px`;
        cursor.style.opacity = '1';
    }
    
    // Rest of your existing load code...
    const urlHash = window.location.hash;
    let lastViewedImageIndex = 0;

    if (urlHash && urlHash.startsWith('#image-')) {
        const index = parseInt(urlHash.split('-')[1], 10);
        if (!isNaN(index) && index >= 0 && index < images.length) {
            lastViewedImageIndex = index;
        }
    }

    currentImageIndex = lastViewedImageIndex;
    updateBackgroundAndTitle();
    clearVideoOverlay();
    appendOverlayVideo();
    history.replaceState(null, null, '');
});

// Handle hover events to change the cursor to left or right arrows
const left = document.querySelector('.left');
const right = document.querySelector('.right');

left.addEventListener('mouseenter', () => updateCursor('left'));
right.addEventListener('mouseenter', () => updateCursor('right'));

// Remove the custom cursor when mouse leaves the left or right elements
left.addEventListener('mouseleave', () => cursor.innerHTML = '');
right.addEventListener('mouseleave', () => cursor.innerHTML = '');

// Function to update the cursor to left or right arrow
function updateCursor(direction) {
    const cursorImagePath = `../assets/${direction}-arrow.svg`;

    fetch(cursorImagePath)
        .then(response => response.text())
        .then(svg => {
            cursor.innerHTML = svg; // Update the cursor's HTML with the SVG
        })
        .catch(error => {
            console.error('Error loading cursor SVG:', error);
        });
}

// Ensure pointer events are enabled for clickable navigation links
left.style.pointerEvents = 'auto';
right.style.pointerEvents = 'auto';

// Prevent the default pointer cursor during clicks
left.addEventListener('mousedown', (e) => {
    e.preventDefault();
});
right.addEventListener('mousedown', (e) => {
    e.preventDefault();
});

// Optional: Handle clicks with stop propagation to prevent any conflicts
left.addEventListener('click', (e) => {
    e.stopPropagation();
});
right.addEventListener('click', (e) => {
    e.stopPropagation();
});