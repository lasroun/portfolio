//Code pour l'ajustement du header

document.addEventListener('click', function (event) {
    if (!event.target.matches('a[href^="#"]')) return;

    event.preventDefault();

    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        // Ajuster la hauteur du header en fonction de la taille de l'écran
        const headerOffset = window.innerWidth >= 768 ? 80 : 56; // 80px pour md et plus, 56px pour mobile (h-20 et h-14 en Tailwind CSS)
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});


// Code pour le defilement des projets 
document.addEventListener('DOMContentLoaded', () => {
    const elements = [document.getElementById('element1'),
    document.getElementById('element2'),
    document.getElementById('element3')];
    let currentElement = 0;
    let autoSlideInterval;

    function showElement(index) {
        // Masquer tous les éléments
        elements.forEach(element => element.classList.add('hidden'));
        elements.forEach(element => element.classList.remove('md:flex'));

        // Afficher l'élément demandé
        elements[index].classList.remove('hidden');
        elements[index].classList.add('md:flex');
    }

    function nextElement() {
        currentElement = (currentElement + 1) % elements.length;
        showElement(currentElement);
    }

    function setupAutoSlide() {
        clearInterval(autoSlideInterval); // Arrêter l'intervalle précédent, s'il existe
        autoSlideInterval = setInterval(nextElement, 50000); // Changer l'élément toutes les 5 secondes
    }

    // Gestionnaires d'événements pour les boutons
    document.getElementById('prevBtn').addEventListener('click', () => {
        currentElement = currentElement - 1 < 0 ? elements.length - 1 : currentElement - 1;
        showElement(currentElement);
        setupAutoSlide(); // Réinitialiser l'intervalle lorsqu'un utilisateur interagit
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        nextElement();
        setupAutoSlide(); // Réinitialiser l'intervalle lorsqu'un utilisateur interagit
    });

    // Initialiser l'affichage et l'intervalle
    showElement(currentElement);
    setupAutoSlide();
});