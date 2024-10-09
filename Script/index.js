const carousel = document.querySelector('.draggable-carousel');
const gallery = document.querySelector('.game-gallery');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// Disable context menu on carousel
carousel.addEventListener('contextmenu', (e) => e.preventDefault());

// Mouse events
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('mouseleave', dragEnd);

// Touch events
carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('touchend', dragEnd);
carousel.addEventListener('touchmove', drag);

function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
}

function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    prevTranslate = currentTranslate;
}

function drag(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

function setSliderPosition() {
    const galleryWidth = gallery.scrollWidth;
    const carouselWidth = carousel.offsetWidth;
    const maxTranslate = 0;
    const minTranslate = carouselWidth - galleryWidth;

    // Limit the translate value to prevent empty space
    if (currentTranslate > maxTranslate) {
        currentTranslate = maxTranslate;
    } else if (currentTranslate < minTranslate) {
        currentTranslate = minTranslate;
    }

    gallery.style.transform = `translateX(${currentTranslate}px)`;
}