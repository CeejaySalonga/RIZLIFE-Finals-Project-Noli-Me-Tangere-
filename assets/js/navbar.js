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
    
    // Close dropdown if clicking outside
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Check initial scroll position
handleScroll();

// Add dropdown functionality for mobile
document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
        const dropdown = dropdownToggle.parentElement;
        dropdown.classList.toggle('active'); // Toggle the dropdown visibility
    });

    // Add mouseenter and mouseleave events to keep dropdown open
    dropdownToggle.addEventListener('mouseenter', () => {
        const dropdown = dropdownToggle.parentElement;
        dropdown.classList.add('active'); // Keep dropdown open on hover
    });

    let timeout; // Variable to hold the timeout ID

    // Ensure dropdown stays open when hovering over the dropdown itself
    const dropdownMenu = dropdownToggle.parentElement.querySelector('.dropdown-menu'); // Adjust selector as needed
    dropdownMenu.addEventListener('mouseenter', () => {
        const dropdown = dropdownToggle.parentElement;
        clearTimeout(timeout); // Clear the timeout to prevent closing
        dropdown.classList.add('active'); // Keep dropdown open on hover
    });

    dropdownMenu.addEventListener('mouseleave', () => {
        const dropdown = dropdownToggle.parentElement;
        timeout = setTimeout(() => {
            dropdown.classList.remove('active'); // Remove active class after delay
        }, 300); // Adjust delay time as needed (300ms here)
    });
});

// Ensure dropdown closes when clicking outside
document.addEventListener('click', (e) => {
    if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
    }
    
    // Close dropdown if clicking outside
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Add event listener for the Work button
const workButton = document.querySelector('.dropdown > button');
const dropdownContent = document.querySelector('.dropdown-content');

let timeout; // Variable to hold the timeout ID

workButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling up to document
    dropdownContent.classList.toggle('show');
});

// Close dropdown when mouse leaves the button
workButton.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
        dropdownContent.classList.remove('show'); // Hide dropdown when mouse leaves
    }, 200); // Adjust delay time as needed (200ms here)
});

// Ensure dropdown closes when mouse leaves the dropdown content
dropdownContent.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
        dropdownContent.classList.remove('show'); // Hide dropdown when mouse leaves
    }, 200); // Adjust delay time as needed (200ms here)
});

// Clear timeout when mouse enters the dropdown content
dropdownContent.addEventListener('mouseenter', () => {
    clearTimeout(timeout); // Clear timeout to keep dropdown open
});

// Check if the current page matches any of the dropdown links
const dropdownLinks = dropdownContent.querySelectorAll('a');
const currentPage = window.location.pathname.split('/').pop(); // Get the current page

dropdownLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        workButton.classList.add('active'); // Add active class to the button
    }
});

// Check if the current page is the Work button's dropdown
if (currentPage === 'historical-context.html' || currentPage === 'plot-summary.html' || currentPage === 'characters.html') {
    workButton.classList.add('active'); // Add active class to the button
} 