// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



// Mobile nav toggle
const toggler = document.querySelector('.nav-toggler');
const navLinks = document.querySelector('.nav-links');

toggler.addEventListener('click', function() {
    toggler.classList.toggle('active');
    navLinks.classList.toggle('active');
});




// Handle the parallax text layers
document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const layers = document.querySelectorAll('.parallax-text');

    // Adjust the speed of the text scroll for different layers
    const speeds = [0.1, 0.1, 0.3, 0.4]; // Different speeds for different layers

    layers.forEach((layer, index) => {
        const speed = speeds[index] || 0.1; // Default to 0.1 if not enough speeds provided
        if (index === 0) {
            // Move layer 1 off to the left
            layer.style.transform = `translate(calc(-50% - ${scrollPosition * speed}px), ${scrollPosition * speed}px)`;
        } else if (index === 1) {
            // Move layer 2 off to the right
            layer.style.transform = `translate(calc(-50% + ${scrollPosition * speed}px), ${scrollPosition * speed}px)`;
        } else if (index === 2) {
            // Move layer 3 off to the left
            layer.style.transform = `translate(calc(-50% - ${scrollPosition * speed}px), ${scrollPosition * speed}px)`;
        } else if (index === 3) {
            // Move layer 4 off to the right
            layer.style.transform = `translate(calc(-50% + ${scrollPosition * speed}px), ${scrollPosition * speed}px)`;
        } else {
            layer.style.transform = `translate(-50%, ${scrollPosition * speed}px)`;
        }
    });
});

// Handle the image click and show it in the modal
document.querySelectorAll('.image-wrapper').forEach(item => {
    item.addEventListener('click', function() {
        const imageUrl = this.getAttribute('data-image-src');
        document.getElementById('modalImage').src = imageUrl;
    });
});