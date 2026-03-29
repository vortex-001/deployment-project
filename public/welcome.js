// Get username from localStorage
const username = localStorage.getItem("username") || "Guest";

// Personalized message
const message = `Hello! Welcome ${username}, thanks for visiting our site!`;

// Typewriter effect
let index = 0;
const speed = 100;
const greetingElement = document.getElementById("greeting");

function typeWriter() {
    if (index < message.length) {
        greetingElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Start typing when page loads
window.onload = typeWriter;
