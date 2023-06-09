function carouselCall(num) {
    const carousel = document.querySelector(`.carousel-container-${num}`);
    const items = document.querySelector(`.carousel-items-${num}`);
    const prevBtn = document.querySelector(`.carousel-prev-${num}`);
    const nextBtn = document.querySelector(`.carousel-next-${num}`);
    const carouselWidth = carousel.clientWidth;
    const numItems = items.children.length
    const itemWidth = carouselWidth * numItems

    let position = 0;
    nextBtn.addEventListener('click', () => {
        if (position > -(itemWidth - carouselWidth)) {
            position -= carouselWidth;
            items.style.transform = `translateX(${position}px)`;
            if (prevBtn.classList.contains("blocked")) {
                prevBtn.classList.remove("blocked")
            }
            if (!(position > -(itemWidth - carouselWidth))) {
                nextBtn.classList.add("blocked")
            }
        }

    });

    prevBtn.addEventListener('click', () => {
        if (position < 0) {
            position += carouselWidth;
            items.style.transform = `translateX(${position}px)`;
            if (nextBtn.classList.contains("blocked")) {
                nextBtn.classList.remove("blocked")
            }
            if (!(position < 0)) {
                prevBtn.classList.add("blocked")
            }
        }
    });
}

const numProjects = document.querySelector('.projects-showcase').children.length

window.onload = () => {
    for (let i = 1; i <= numProjects; i++) {
        carouselCall(i)
    }
}

