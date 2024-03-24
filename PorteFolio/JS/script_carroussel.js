const container = document.querySelector(".container");
const containerCarrousel = container.querySelector(".container-carrousel");
const carrousel = container.querySelector(".carrousel");
const carrouselItems = carrousel.querySelectorAll(".carrousel-item");

// Inicialisation des variables qui changeront leur état.
let isMouseDown = false; // Indique si le bouton de la souris est enfoncé
let currentMousePos = 0; // Position actuelle de la souris
let lastMousePos = 0; // Dernière position de la souris
let lastMoveTo = 0; // Dernière valeur de déplacement
let moveTo = 0; // Valeur de déplacement actuelle

const createCarrousel = () => {
const carrouselProps = onResize();
const length = carrouselItems.length; // Longueur du tableau
const degress = 360 / length; // Degrés par élément
const gap = 20; // Espacement entre chaque élément
const tz = distanceZ(carrouselProps.w, length, gap)

const fov = calculateFov(carrouselProps);
const height = calculateHeight(tz);

container.style.width = tz * 2 + gap * length + "px";
container.style.height = height + "px";

carrouselItems.forEach((item, i) => {
const degressByItem = degress * i + "deg";
item.style.setProperty("--rotatey", degressByItem);
item.style.setProperty("--tz", tz + "px");
});
};

// Fonction qui donne une animation fluide
const lerp = (a, b, n) => {
return n * (a - b) + b;
};

// https://3dtransforms.desandro.com/carousel
const distanceZ = (widthElement, length, gap) => {
return (widthElement / 2) / Math.tan(Math.PI / length) + gap; // Distance Z des éléments
}

// Calcul de la hauteur du conteneur en utilisant le champ de vision et la distance de la perspective
const calculateHeight = z => {
const t = Math.atan(90 * Math.PI / 180 / 2);
const height = t * 2 * z;

return height;
};

// Calcul du champ de vision du carrousel
const calculateFov = carrouselProps => {
const perspective = window
.getComputedStyle(containerCarrousel)
.perspective.split("px")[0];

const length =
Math.sqrt(carrouselProps.w * carrouselProps.w) +
Math.sqrt(carrouselProps.h * carrouselProps.h);
const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
return fov;
};

// Obtient la position X et évalue si la position est à droite ou à gauche
const getPosX = x => {
currentMousePos = x;

moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;

lastMousePos = currentMousePos;
};

const update = () => {
lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
carrousel.style.setProperty("--rotatey", lastMoveTo + "deg");

requestAnimationFrame(update);
};

const onResize = () => {
// Obtient les propriétés de taille du carrousel
const boundingCarrousel = containerCarrousel.getBoundingClientRect();

const carrouselProps = {
w: boundingCarrousel.width,
h: boundingCarrousel.height
};

return carrouselProps;
};

const initEvents = () => {
// Événements de la souris
carrousel.addEventListener("mousedown", () => {
isMouseDown = true;
carrousel.style.cursor = "grabbing";
});
carrousel.addEventListener("mouseup", () => {
isMouseDown = false;
carrousel.style.cursor = "grab";
});
container.addEventListener("mouseleave", () => (isMouseDown = false));

carrousel.addEventListener(
"mousemove",
e => isMouseDown && getPosX(e.clientX)
);

// Événements du toucher
carrousel.addEventListener("touchstart", () => {
isMouseDown = true;
carrousel.style.cursor = "grabbing";
});
carrousel.addEventListener("touchend", () => {
isMouseDown = false;
carrousel.style.cursor = "grab";
});
container.addEventListener(
"touchmove",
e => isMouseDown && getPosX(e.touches[0].clientX)
);

window.addEventListener("resize", createCarrousel);

update();
createCarrousel();
};

initEvents();
    