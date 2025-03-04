window.addEventListener('load', () => {
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

// Create and style the custom cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Hide the default cursor completely
document.body.style.cursor = 'none';

// Update the position of the custom cursor on mouse move
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
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
    const cursorImagePath = `../assets/${direction}-arrow.svg`; // Adjust the path to the assets folder

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
    e.preventDefault(); // Prevent default cursor behavior
});
right.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent default cursor behavior
});

// Optional: Handle clicks with stop propagation to prevent any conflicts
left.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
});
right.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
});
