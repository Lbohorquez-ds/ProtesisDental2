const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-Form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.children.email.value;
    const contrasena1 = e.target.children.contrasena1.value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, contrasena1 })
        });

        if (!response.ok) {
            mensajeError.classList.toggle("invisible_visible", true);
            return;
        }

        const resJson = await response.json();
        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    } catch (error) {
        console.error("Login failed:", error);
        mensajeError.classList.toggle("invisible_visible", true);
    }
});