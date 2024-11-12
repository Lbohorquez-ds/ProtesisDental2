//GALERIA DE FOTOS

//Seleccionamos los elementos del Dom (p/modif medidas)
let imagenes = document.querySelectorAll('.img-galeria');
let modal = document.querySelector('#modal');
let img = document.querySelector('#img-modal');
let boton = document.querySelector('#modal-btn');

//Abrimos el modal y mostramos la imagen seleccionada
for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener('click', function (e) {
        modal.classList.toggle("modal-open");
        let src = e.target.src;
        img.setAttribute("src", src);
    });
}

//Lo cerramos
boton.addEventListener('click', function () {
    modal.classList.toggle("modal-open");
}); 