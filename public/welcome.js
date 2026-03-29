// Get username from localStorage
const username = localStorage.getItem("username");

//  If not logged in → redirect to login page
if (!username) {
    window.location.href = "login.html";
}

// Personalized message
const message = `Hello! Welcome ${username}, thanks for visiting our site!`;

// Typewriter effect
let index = 0;
const speed = 100;
const greetingElement = document.getElementById("greeting");

// Clear previous text (important if page reloads)
greetingElement.innerHTML = "";

function typeWriter() {
    if (index < message.length) {
        greetingElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Start typing when page loads
window.onload = () => {
    typeWriter();
};

// 🔥 Button functionality (optional but useful)
document.getElementById("loginBtn").addEventListener("click", () => {
    window.location.href = "https://your-website-link.com"; // change this
});