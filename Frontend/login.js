const alternateTextElement = document.getElementById("alternateText");
const alternateTexts = ["Welcome to Shoppie!", "Free delivery", "Genuine Products"];
let currentAlternateTextIndex = 0;

function updateAlternateText() {
    alternateTextElement.textContent = alternateTexts[currentAlternateTextIndex];
    currentAlternateTextIndex = (currentAlternateTextIndex + 1) % alternateTexts.length;
}

updateAlternateText();
setInterval(updateAlternateText, 3000);