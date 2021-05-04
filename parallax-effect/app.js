const parallax = document.querySelector('.parallax');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    // This transform property will make image and text move at different speed with scroll
    parallax.style.transform = `translateY(${scrollTop * 0.5}px)`;
    // Multiply with -ve sign if you want image should move faster than text
})