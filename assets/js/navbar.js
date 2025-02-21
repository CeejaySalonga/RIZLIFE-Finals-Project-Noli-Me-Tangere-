const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

// Function to handle scroll
function handleScroll() {
    // Check if we're on the index page
    const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    
    if (isIndexPage) {
        // Original behavior for index page
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    } else {
        // Always show scrolled state on other pages
        navbar.classList.add('scrolled');
    }
}

// Toggle menu
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
    }
});

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Check initial scroll position
handleScroll();

// Add dropdown functionality for mobile
document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 991) {
            e.preventDefault();
            const dropdown = dropdownToggle.parentElement;
            dropdown.classList.toggle('active');
        }
    });
}); 