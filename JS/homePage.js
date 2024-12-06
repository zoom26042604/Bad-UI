function showAlert() {
    alert('Ce bouton ne fonctionne pas correctement.');
}

document.querySelector('.button').addEventListener('click', function() {
    alert('Erreur !');
});

const confettiContainer = document.querySelector('.confetti');
for (let i = 0; i < 100; i++) {
    const confetto = document.createElement('div');
    confetto.className = 'confetto';
    confetto.style.left = Math.random() * 100 + '%';
    confetto.style.animationDelay = Math.random() * 3 + 's';
    confettiContainer.appendChild(confetto);
}