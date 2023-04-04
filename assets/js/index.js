var scrollPositionY = 0;
var ticking = false;
var pageHeight = document.body.scrollHeight;
var screenHeight = pageHeight / 2
const sectionWrapper = document.querySelector(".section-wrapper")


window.addEventListener('scroll', function(e) {
    if (window.innerWidth <= 1000) {
        return;
    }
    scrollPositionY = window.pageYOffset;
    pageHeight = document.body.scrollHeight;
    screenHeight = Math.floor(pageHeight / 2)
    
    if (scrollPositionY >= (screenHeight)) {
        window.requestAnimationFrame(function() {
            horizontalScroll();
            ticking = false;
        });
        ticking = true;
    } else if (!ticking) {
        window.requestAnimationFrame(function() {
            updateColor();
            fadeInHeaderFooter();
            ticking = false;
        });
        ticking = true;
    }
});

function updateColor() {
    let scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrolledToBottom = Math.ceil(window.scrollY) >= scrollableHeight;
    if (!scrolledToBottom || pageReload) {
        let newColor = calculateColor();
        document.documentElement.style.setProperty("--MAIN-BG", newColor)
    }
}

function calculateColor() {
    let colorNumber = getColorNumber();
    return '#' + colorNumber + colorNumber + colorNumber;
}

function getColorNumber() {
    let colorNumber = 26 + Math.round(13 * (scrollPositionY / screenHeight));
    colorNumber = changeColorNumberToHex(colorNumber)
    return colorNumber
}

function changeColorNumberToHex(colorNumber) {
    let hexNumber = "";
    if (colorNumber >= 30 && colorNumber <= 35) {
        hexNumber += "2";
        let secondNum = colorNumber - 29
        let convertNum = convertSecondNumber(secondNum);
        hexNumber += convertNum
    } else if (colorNumber >= 36) {
        let convertNum = colorNumber - 6
        hexNumber += convertNum
    } else {
        hexNumber += colorNumber
    }

    return hexNumber
}

function convertSecondNumber(secondNum) {
    switch (secondNum) {
        case 1:
            return "a"
        case 2: 
            return "b"
        case 3: 
            return "c"
        case 4:
            return "d"
        case 5:
            return "e"
        case 6:
            return "f"
        default:
            return "a"
    }
}

function fadeInHeaderFooter() {
    let scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrolledToBottom = Math.ceil(window.scrollY) >= scrollableHeight;
    if (!scrolledToBottom) {
        let opacity = calculateOpacity()
        let header = document.querySelector("header")
        let footer = document.querySelector("footer")
        header.style.opacity = opacity
        footer.style.opacity = opacity
    }
}

function calculateOpacity() {
    let opacity = ((scrollPositionY - (screenHeight / 2 )) / screenHeight) * 2
    if (scrollPositionY < (screenHeight / 2)) {
        opacity = 0;
    }
    return opacity;
}

var sliding = false;
function horizontalScroll() {
    disableVerticalScroll();
    
    window.addEventListener("wheel", function(event) {
        if (scrollPositionY >= (screenHeight)) {
            if (sliding == true) {
                return;
            }
        
            var deltaY = event.deltaY;
            
            if (deltaY < 0 && getTranslateX(contents[0]) >= 0) {
                enableVerticalScroll();
                horizontalScrollCounter = 0;
                return;
            }

            slideContent(deltaY);
            
            setTimeout(() => {
                updateSwipeFeature();
            }, 250)
        }
        
    });
    
}

function disableVerticalScroll() {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    window.onscroll = function() {
        window.scrollTo(0, scrollPosition);
    };
}

function enableVerticalScroll() {
    window.onscroll = function() {};
}

var contents = document.querySelectorAll('.content-section');
var numContents = contents.length;
function slideContent(deltaY) {
    if (getTranslateX(contents[3]) == 0 && deltaY > 0) {
        return;
    }
    sliding = true;
    for (i = 0; i < numContents; i++) {
        let amountToMove = getAmountToMove(deltaY)
        let translateXPercentage = getTranslateX(contents[i])
        contents[i].style.transform = `translateX(${translateXPercentage + amountToMove}%)`;
    }
    updateCurrentSectionNumber(deltaY);
    setTimeout(() => {
        sliding = false;
    }, 250)
    
}

var currentSectionNumber = 0
const translateAmount = 50;
function getAmountToMove(deltaY) {
    let amountToMove = 0
    if (deltaY > 0) {
        amountToMove = -(translateAmount);
    } else {
        amountToMove = translateAmount;
    }
    return amountToMove
}

function updateCurrentSectionNumber(deltaY) {
    if (deltaY > 0) {
        currentSectionNumber += 0.5;
    } else {
        currentSectionNumber -= 0.5;
    }
}

function getTranslateX(element) {
    let computedStyle = window.getComputedStyle(element)
    let transform = computedStyle.getPropertyValue("transform")
    let matrix = new DOMMatrixReadOnly(transform);
    let translateX = matrix.m41;
    let width = element.offsetWidth
    let translateXPercentage = Math.round((translateX / width) * 100);
    let rounded = Math.round(translateXPercentage / translateAmount) * translateAmount
    return rounded
}

function displayHeaderFooter() {
    let header = document.querySelector("header")
    let footer = document.querySelector("footer")
    header.style.display = "flex"
    footer.style.display = "flex"
}

const navLinks = document.querySelectorAll(".nav-link")
const welcomeLinks = document.querySelectorAll(".wel-nav-link")
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", (event) => {
        if (window.innerWidth > 1000) {
            event.preventDefault();
            linkToSection(i, navLinks[i])
        }
    })

    welcomeLinks[i].addEventListener("click", (event) => {
        if (window.innerWidth > 1000) {
            event.preventDefault();
            linkToSection(i, welcomeLinks[i])
        }
    })
}

function linkToSection(i, link) {
    disableTransition();
    scrollToSection(link);
    moveToSection(i);
    enableTransition();
}

function scrollToSection(link) {
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
}

function moveToSection(num) {
    currentSectionNumber = num
    for (let i = 0; i < numContents; i++) {
        let currentTranslateX = 100 * i
        contents[i].style.transform = `translateX(${currentTranslateX - (100 * num)}%)`;
    }
    scrollPositionY = window.pageYOffset;
    pageHeight = document.body.scrollHeight;
    screenHeight = pageHeight / 2;
    updateColor();
    fadeInHeaderFooter();
    updateSwipeFeature();
}

function disableTransition() {
    for (let i = 0; i < numContents; i++) {
        contents[i].style.transition = "transform 0s ease";
    }
}

function enableTransition() {
    for (let i = 0; i < numContents; i++) {
        contents[i].style.transition = "transform 0.5s ease";
    }
}

const dots = document.querySelectorAll(".dot");
function updateSwipeFeature() {
    let activeDot = getActiveDot();
    if (currentSectionNumber == 0 && activeDot != 0) {
        removeActiveDot(activeDot);
        addActiveDot(0);
    } else if (currentSectionNumber == 1 && activeDot != 1) {
        removeActiveDot(activeDot);
        addActiveDot(1);
    } else if (currentSectionNumber == 2 && activeDot != 2) {
        removeActiveDot(activeDot);
        addActiveDot(2);
    } else if (currentSectionNumber == 3 && activeDot != 3) {
        removeActiveDot(activeDot);
        addActiveDot(3);
    }
}

function getActiveDot() {
    for (let i = 0; i < numContents; i++) {
        if (dots[i].classList.contains("active")) {
            return i;
        }
    }
}

function removeActiveDot(activeDot) {
    dots[activeDot].classList.remove("active");
}

function addActiveDot(activeDot) {
    dots[activeDot].classList.add("active");
}

const swipeRight = document.querySelector(".swipe-right")
swipeRight.addEventListener("click", () => {
    moveToSection(Math.floor(currentSectionNumber + 1));
})

const swipeLeft = document.querySelector(".swipe-left")
swipeLeft.addEventListener("click", () => {
    moveToSection(Math.ceil(currentSectionNumber - 1));
})

for (let i = 0; i < numContents; i++) {
    dots[i].addEventListener("click", () => {
        moveToSection(i);
    })
}

var pageReload = false
window.addEventListener("load", () => {
    pageReload = true
    scrollPositionY = window.pageYOffset;
    pageHeight = document.body.scrollHeight;
    screenHeight = pageHeight / 2;
    if (window.innerWidth > 1000) {
        updateColor();
        fadeInHeaderFooter();
        displayHeaderFooter();
        updateSwipeFeature()
    }
    pageReload = false
})
