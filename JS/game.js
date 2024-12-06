// Global variables to track game difficulty
let gameTime = 0;
let fakeButtonCount = 50;
let moveSpeed = 0; // Lower is faster

function createFakeButtons(count) {
    const body = document.body;
    for (let i = 0; i < count; i++) {
        const fakeButton = document.createElement('button');
        fakeButton.classList.add('fake');
        fakeButton.dataset.size = 1; // Initial size multiplier
        fakeButton.innerText = ['WRONG!', 'NOPE!', 'NOT HERE!', 'TRY AGAIN!'][Math.floor(Math.random() * 4)];
        fakeButton.onclick = function() {
            const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
            audio.play();
            fakeButton.style.transform = 'scale(0.5) rotate(360deg)';
        };

        // Random positioning
        fakeButton.style.left = `${Math.random() * 100}%`;
        fakeButton.style.top = `${Math.random() * 100}%`;

        body.appendChild(fakeButton);
    }
}

function createCorrectButton() {
    const correct = document.createElement('button');
    correct.id = 'correct';
    correct.innerText = 'CATCH ME!';
    correct.dataset.speed = 1; // Initial speed multiplier
    correct.onclick = function() {
        const time = Math.floor(gameTime / 1000);
        alert(`YOU GOT ME IN ${time} SECONDS! 😈\nCAN YOU SURVIVE THE NEXT ROUND?`);

        // Reset game or increase difficulty
        resetGame();
    };

    document.body.appendChild(correct);
}

function moveButton() {
    const button = document.getElementById('correct');
    if (button) {
        // Increase movement speed over time
        const speedMultiplier = parseFloat(button.dataset.speed);
        button.style.transition = `all ${1/speedMultiplier}s ease-out`;

        button.style.left = `${Math.random() * 90}%`;
        button.style.top = `${Math.random() * 90}%`;
    }
}

function increaseDifficulty() {
    // Increase fake button sizes
    const fakeButtons = document.querySelectorAll('.fake');
    fakeButtons.forEach(button => {
        let currentSize = parseFloat(button.dataset.size);
        currentSize *= 1.3; // Grow 10% larger
        button.dataset.size = currentSize;
        button.style.transform = `scale(${currentSize})`;
    });

    // Make correct button faster
    const correctButton = document.getElementById('correct');
    let currentSpeed = parseFloat(correctButton.dataset.speed);
    correctButton.dataset.speed = currentSpeed;

    // Add more crazy effects
    document.body.classList.add('extreme-mode');

    // Increase number of fake buttons
    createFakeButtons(10);
}

function resetGame() {
    // Remove all existing buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.remove());

    // Reset game variables
    gameTime = 0;

    // Recreate buttons
    createFakeButtons(fakeButtonCount);
    createCorrectButton();

    // Reset body classes
    document.body.classList.remove('extreme-mode');
}

// Game loop
function gameLoop() {
    gameTime += 100;

    // Increase difficulty every 5 seconds
    if (gameTime % 5000 === 0) {
        increaseDifficulty();
    }

    // Move the correct button periodically
    if (gameTime % moveSpeed === 0) {
        moveButton();
    }

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

// Initialize the game
createFakeButtons(fakeButtonCount);
createCorrectButton();

// Move the correct button on hover
document.getElementById('correct').addEventListener('mouseover', moveButton);

// Start the game loop
gameLoop();

// Random floating text movement
function animateFloatingTexts() {
    const floatingTexts = document.querySelectorAll('.floating-text');
    floatingTexts.forEach(text => {
        text.style.left = `${Math.random() * 90}%`;
        text.style.top = `${Math.random() * 90}%`;
    });
}

// Animate floating texts every 3 seconds
setInterval(animateFloatingTexts, 3000);