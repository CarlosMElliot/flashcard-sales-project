let flashcards = [];
let currentIndex = 0;
let isFlipped = false;

const card = document.getElementById('card');
const termEl = document.getElementById('card-term');
const hintEl = document.getElementById('card-hint');
const defEl = document.getElementById('card-def');
const counterEl = document.getElementById('counter');
const progressBar = document.getElementById('progress-bar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function initProgressBar() {
    progressBar.innerHTML = '';
    flashcards.forEach((_, index) => {
        const seg = document.createElement('div');
        seg.className = 'progress-segment' + (index === 0 ? ' active' : '');
        progressBar.appendChild(seg);
    });
}

function updateCard() {
    if (isFlipped) {
        card.classList.remove('flipped');
        isFlipped = false;
        setTimeout(loadCardData, 200);
    } else {
        loadCardData();
    }
}

function loadCardData() {
    const item = flashcards[currentIndex];
    termEl.textContent = item.term;
    hintEl.textContent = item.hint ? '💡 Hint: ' + item.hint : '';
    defEl.textContent = item.definition;
    counterEl.textContent = `${currentIndex + 1} / ${flashcards.length}`;

    Array.from(progressBar.children).forEach((seg, idx) => {
        seg.classList.toggle('active', idx <= currentIndex);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === flashcards.length - 1;
}

function flipCard() {
    isFlipped = !isFlipped;
    card.classList.toggle('flipped');
}

function nextCard() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        updateCard();
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flipCard();
    }
});

async function init() {
    try {
        const response = await fetch('flashcards.json');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        flashcards = await response.json();
        initProgressBar();
        loadCardData();
    } catch (err) {
        console.error('Could not load flashcards.json:', err);
        termEl.textContent = 'Could not load cards';
        hintEl.textContent = 'Run a local server (see note) so flashcards.json can load.';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    }
}

init();
