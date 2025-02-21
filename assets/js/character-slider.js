class CharacterSlider {
    constructor(containerId, prevId, nextId, characters) {
        // Get DOM elements
        this.container = document.getElementById(containerId);
        this.prevButton = document.getElementById(prevId);
        this.nextButton = document.getElementById(nextId);
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
                <img src="${character.image}" alt="${character.name}">
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

        // Set up click events for arrows
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        // Set up keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Set initial active state
        this.updateSliderState();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.cards[this.currentIndex].classList.remove('active');
            this.currentIndex--;
            this.updateSliderState();
        }
    }

    nextSlide() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.cards[this.currentIndex].classList.remove('active');
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
    }
}

// Initialize sliders when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CharacterSlider('main-characters-cards', 'main-prev', 'main-next', characterData.main);
    new CharacterSlider('support-characters-cards', 'support-prev', 'support-next', characterData.supporting);
}); 