const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("register-Form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        contrasena1: document.getElementById('contrasena1').value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            mensajeError.classList.toggle("invisible_visible", true);
            return;
        }

        const result = await response.json();
        if (result.redirect) {
            window.location.href = result.redirect;
        } else {
            alert('Registracion realizada');
        }
    } catch (error) {
        console.error("Falla en registracion:", error);
    }
});