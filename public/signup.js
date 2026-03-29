// Redirect to login page
function goToLogin() {
    window.location.href = "login.html";
}

// Signup button
const signupButton = document.getElementById("signupBtn");

signupButton.addEventListener("click", async function() {
    const fullname = document.querySelector('input[name="fullname"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    if (!fullname || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch('/api/signup', {   // ✅ FIXED HERE
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ fullname, email, password })
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
        alert("Error signing up");
    }
});