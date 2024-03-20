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