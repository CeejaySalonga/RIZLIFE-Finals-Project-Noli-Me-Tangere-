class CharacterSlider {
    constructor(containerId, prevId, nextId, paginationId, progressTextId, characters) {
        // Get DOM elements
        this.container = document.getElementById(containerId);
        this.prevButton = document.getElementById(prevId);
        this.nextButton = document.getElementById(nextId);
        this.paginationContainer = document.getElementById(paginationId);
        this.progressText = document.getElementById(progressTextId);
        this.characters = characters;
        
        // Set initial state
        this.currentIndex = 0;
        this.totalSlides = this.characters.length;
        
        // Initialize the slider
        this.init();
    }

    createCharacterCard(character) {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <div class="character-image">
                <img src="${character.image}" alt="${character.name}" loading="lazy">
            </div>
            <div class="character-info">
                <h3>${character.name}</h3>
                <p>${character.description}</p>
            </div>
        `;
        return card;
    }

    init() {
        // Create character cards
        this.characters.forEach(character => {
            const card = this.createCharacterCard(character);
            this.container.appendChild(card);
        });

        // Create pagination circles
        this.createPagination();

        // Set up click events for arrows
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        // Set up keyboard navigation
        this.container.tabIndex = 0; // Make the container focusable
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Set initial active state
        this.updateSliderState();
    }

    createPagination() {
        for (let i = 0; i < this.totalSlides; i++) {
            const circle = document.createElement('span');
            circle.className = 'pagination-circle';
            circle.dataset.index = i;
            circle.addEventListener('click', () => this.goToSlide(i));
            this.paginationContainer.appendChild(circle);
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSliderState();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSliderState();
        }
    }

    nextSlide() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
            this.updateSliderState();
        }
    }

    updateSliderState() {
        // Move slides
        const offset = -this.currentIndex * 100;
        this.container.style.transform = `translateX(${offset}%)`;
        
        // Update active state
        this.cards = Array.from(this.container.children);
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update arrow visibility
        this.prevButton.classList.toggle('hidden', this.currentIndex === 0);
        this.nextButton.classList.toggle('hidden', this.currentIndex === this.totalSlides - 1);

        // Update pagination circles
        const circles = this.paginationContainer.children;
        Array.from(circles).forEach((circle, index) => {
            circle.classList.toggle('active', index === this.currentIndex);
        });

        // Update progress text
        this.progressText.textContent = `${this.currentIndex + 1}/${this.totalSlides}`;
    }
}

// Initialize sliders when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CharacterSlider('main-characters-cards', 'main-prev', 'main-next', 'main-pagination', 'main-progress-text', characterData.main);
    new CharacterSlider('support-characters-cards', 'support-prev', 'support-next', 'support-pagination', 'support-progress-text', characterData.supporting);
});

// Add this code to handle tab switching
document.getElementById('main-tab').addEventListener('click', function() {
    document.getElementById('main-characters').style.display = 'block';
    document.getElementById('support-characters').style.display = 'none';
    this.classList.add('active');
    document.getElementById('support-tab').classList.remove('active');
});

document.getElementById('support-tab').addEventListener('click', function() {
    document.getElementById('main-characters').style.display = 'none';
    document.getElementById('support-characters').style.display = 'block';
    this.classList.add('active');
    document.getElementById('main-tab').classList.remove('active');
}); 