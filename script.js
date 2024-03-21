document.addEventListener("DOMContentLoaded", function () {
    const parts = document.querySelectorAll(".part");

    // Fonction pour basculer la visibilité des sections
    function toggleSectionVisibility(sectionId) {
        parts.forEach(part => {
            if (part.id === sectionId) {
                part.classList.remove("hidden");
            } else {
                part.classList.add("hidden");
            }
        });
    }

    // Ajouter un écouteur d'événement à chaque élément du menu
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const sectionId = this.dataset.target;
            toggleSectionVisibility(sectionId);
        });
    });

    // Ajouter des transitions lors du passage d'une section à l'autre
    parts.forEach(part => {
        part.addEventListener("transitionend", function () {
            if (!part.classList.contains("hidden")) {
                part.classList.add("fade-in");
            } else {
                part.classList.remove("fade-in");
            }
        });
    });

    // Ajouter un effet de survol pour les liens de contact
    const contactLinks = document.querySelectorAll(".contact-link");
    contactLinks.forEach(link => {
        link.addEventListener("mouseover", function () {
            this.classList.add("hover-effect");
        });

        link.addEventListener("mouseout", function () {
            this.classList.remove("hover-effect");
        });
    });
});

    
// Fonction pour ouvrir/fermer le menu
// Sélection des éléments du menu
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu-items .item');
const menuToggle = document.querySelector('.menu-toggle');

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
  menuItems.forEach(item => {
    item.classList.toggle('active');
  });
  menuToggle.classList.toggle('active');
}

// Ajout d'un gestionnaire d'événement au bouton de menu pour ouvrir/fermer le menu
menuToggle.addEventListener('click', toggleMenu);

// Fonction pour fermer le menu lorsqu'un clic est effectué à l'extérieur
function closeMenu(event) {
  if (!menu.contains(event.target)) {
    menuItems.forEach(item => {
      item.classList.remove('active');
    });
    menuToggle.classList.remove('active');
  }
}

// Ajout d'un gestionnaire d'événement pour le clic sur le corps
document.addEventListener('click', closeMenu);