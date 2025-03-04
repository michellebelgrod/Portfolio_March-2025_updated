
document.addEventListener("DOMContentLoaded", function () {
    const closeBtn = document.querySelector('.close-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            history.back(); // Go back to the previous page
        });
    }
});


// if (window.innerWidth > 768) {
//     const body = document.querySelector('.about-page');
//     body.style.backgroundColor = `hsl(180deg, 100%, 50%)`;
    
//     window.addEventListener('mousemove', (e) => {
//         let posX = e.clientX/window.innerWidth;
//         let posY = e.clientY/window.innerHeight;
    
//         body.style.backgroundColor = `hsl(${posX*180}deg, 100%, 50%)`;
//     })
// } else {
//     const body = document.querySelector('.about-page');
//     body.style.backgroundColor = `hsl(0deg, 100%, 50%)`;

//     window.addEventListener('scroll', (e) => {
//         const aboutPage = document.querySelector('.about-page');
//         let pos = window.scrollY/(aboutPage.offsetHeight-window.innerHeight);
//         body.style.backgroundColor = `hsl(${pos*180}deg, 100%, 50%)`;
//     })
// }