const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li')

// Event Listeners
burger.addEventListener('click', function() {
    // Side-panel toggling
    nav.classList.toggle('nav-active');

    // Burger <-> Close Animation
    this.classList.toggle('toggle');

    // Nav Links Animation
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            // Removing animation when closing side nav
            link.style.animation = '';
        } else {
            // Links appearing one after another after slight delay (CSS Animation)
            link.style.animation = `slideIn 0.5s ease forwards ${index / 7 + 0.5}s`;
        }
    })
});