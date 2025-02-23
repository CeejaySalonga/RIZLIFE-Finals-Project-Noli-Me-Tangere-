let currentCategory = 'rizal';
let currentIndex = 0;

function updateGallery() {
    const titleElement = document.getElementById('gallery-item-title');
    const titleImageElement = document.getElementById('gallery-item-image-title');
    const imageElement = document.getElementById('gallery-item-image');
    const descriptionElement = document.getElementById('gallery-item-image-description');
    const progressTextElement = document.getElementById('gallery-progress-text');

    const currentItems = galleryData[currentCategory];
    const currentItem = currentItems[currentIndex];

    titleElement.textContent = currentItem.displayTitle;
    titleImageElement.textContent = currentItem.title;
    imageElement.src = currentItem.image;
    descriptionElement.textContent = currentItem.description;

    // Update pagination
    updatePagination();

    // Update progress text
    progressTextElement.textContent = `${currentIndex + 1}/${currentItems.length}`;
}

function updatePagination() {
    const paginationContainer = document.getElementById('gallery-pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const currentItems = galleryData[currentCategory];
    currentItems.forEach((_, index) => {
        const circle = document.createElement('span');
        circle.className = 'pagination-circle';
        circle.dataset.index = index;
        circle.addEventListener('click', () => goToSlide(index));
        paginationContainer.appendChild(circle);
    });

    // Set active class for the current index
    const circles = paginationContainer.children;
    Array.from(circles).forEach((circle, index) => {
        circle.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateGallery();
}

function nextImage() {
    const currentItems = galleryData[currentCategory];
    currentIndex = (currentIndex + 1) % currentItems.length;
    updateGallery();
}

function prevImage() {
    const currentItems = galleryData[currentCategory];
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    updateGallery();
}

function switchCategory(category) {
    currentCategory = category;
    currentIndex = 0;
    updateGallery();
}

// Event listeners for gallery navigation
document.getElementById('gallery-item-image-arrow-left').addEventListener('click', prevImage);
document.getElementById('gallery-item-image-arrow-right').addEventListener('click', nextImage);

// Event listeners for tab switching
document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        // Switch to the corresponding category
        const category = this.textContent.toLowerCase();
        switchCategory(category);
    });
});

// Initialize gallery
updateGallery(); 