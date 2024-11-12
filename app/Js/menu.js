//MENU HAMBURGUESA

let btnMenu = document.getElementById('btnMenu');
let menu = document.getElementById('menu');


//Agregar evento clic
btnMenu.addEventListener('click', function () {
    'use strict';
    menu.classList.toggle('mostrar');
});

//Scroll arriba (detecta clic en el boton de desplazamiento hacia arriba)
document.getElementById("button-up").addEventListener("click", scrollUp);

//La funcion
function scrollUp() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollUp);
        window.scrollTo(0, currentScroll - (currentScroll / 6));
    }
}
//Mostrar/ocultar el boton segun el desplazamiento
buttonUp = document.getElementById("button-up");
window.onscroll = function () {
    var scroll = document.documentElement.scrollTop;
    if (scroll > 500) {
        buttonUp.style.transform = "scale(1)";
    } else if (scroll < 500) {
        buttonUp.style.transform = "scale(0)";
    }
}