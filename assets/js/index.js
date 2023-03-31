var scrollPositionY = 0;
var ticking = false;
var pageHeight = document.body.scrollHeight;
var screenHeight = pageHeight / 2

window.addEventListener('scroll', function(e) {
    scrollPositionY = window.pageYOffset;
    pageHeight = document.body.scrollHeight;
    screenHeight = pageHeight / 2
    if (scrollPositionY >= (screenHeight)) {
        return;
    }

    if (!ticking) {
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
