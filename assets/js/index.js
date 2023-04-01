var scrollPositionY = 0;
var ticking = false;
var pageHeight = document.body.scrollHeight;
var screenHeight = pageHeight / 2
const sectionWrapper = document.querySelector(".section-wrapper")


window.addEventListener('scroll', function(e) {
    scrollPositionY = window.pageYOffset;
    pageHeight = document.body.scrollHeight;
    screenHeight = pageHeight / 2
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
    let newColor = calculateColor();
    document.documentElement.style.setProperty("--MAIN-BG", newColor)
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
    let opacity = calculateOpacity()
    let header = document.querySelector("header")
    let footer = document.querySelector("footer")
    header.style.opacity = opacity
    footer.style.opacity = opacity
}

function calculateOpacity() {
    let opacity = ((scrollPositionY - (screenHeight / 2 )) / screenHeight) * 2
    if (scrollPositionY < (screenHeight / 2)) {
        opacity = 0
    }
    return opacity
}

var contents = document.querySelectorAll('.content-section');
var wrapper = document.querySelector(".section-wrapper")
var wrapperWidth = wrapper.offsetWidth
const pxAmount = 10
function slideContent(deltaY) {
    var numContents = contents.length;
    for (i = 0; i < numContents; i++) {
        let amountToMove = 0
        if (deltaY > 0) {
            amountToMove = -(pxAmount)
        } else {
            amountToMove = pxAmount
        }
        let currentPosition = contents[i].offsetLeft
        if (currentPosition > (-(pxAmount * 2)) && amountToMove == -pxAmount && i == 0) {
            contents[0].style.left = `${pxAmount}px`;
            contents[1].style.left = `${(wrapperWidth + pxAmount)}px`;
            contents[2].style.left = `${(wrapperWidth * 2) + pxAmount}px`;
            contents[3].style.left = `${(wrapperWidth * 3) + pxAmount}px`;
        } else if (currentPosition < (pxAmount * 2) && amountToMove == pxAmount && i == 3) {
            contents[3].style.left = `-5px`;
            contents[2].style.left = `${-(wrapperWidth + pxAmount)}px`;
            contents[1].style.left = `${-(wrapperWidth * 2) + pxAmount}px`;
            contents[0].style.left = `${-(wrapperWidth * 3) + pxAmount}px`;
        }
        contents[i].style.left = `${currentPosition + amountToMove}px`;
        console.log(contents[i].offsetLeft)
    }
}

function horizontalScroll() {
    disableVerticalScroll()
    
    window.addEventListener("wheel", function(event) {
        var deltaY = event.deltaY;
        
        if (deltaY < 0 && contents[0].offsetLeft == 0) {
            enableVerticalScroll()
            return;
        }

        slideContent(deltaY);

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

window.addEventListener("load", () => {
    scrollPositionY = window.pageYOffset;
    pageHeight = document.body.scrollHeight;
    screenHeight = pageHeight / 2
    updateColor();
    fadeInHeaderFooter();
})
