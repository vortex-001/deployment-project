fetch('/api/login')

// Redirect to signup page
function goToSignup() {
    window.location.href = "signup.html";
}

// Handle login form submit
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // prevents page reload

    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.status !== 200) {
            alert(data.message);
        } else {
            localStorage.setItem('username', data.fullname);
            window.location.href = 'welcome.html';
        }

    } catch (err) {
        console.error(err);
        alert("Error logging in");
    }
});