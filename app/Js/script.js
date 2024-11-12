$(document).ready(function () {

    // Mostrar todos los productos para CLIENTES
    if (window.location.pathname.includes("ListaMostrarCliente.html")) {
        loadProductosCliente();
    } else {
        loadProductos();
    }

    // function loadProductosCliente() {
    //     $.get('/api/productos', function (data) {
    //         $('#productos tbody').e(mpty);
    //         data.forEach(producto => {
    //             $('#productos tbody').append(` 
    //             <tr>
    //                 <td>${producto.nombre_producto}</td>
    //                 <td>$${producto.precio_producto}</td>
    //                 <td>${producto.nombre_tipo}</td>
    //                 <td>${producto.nombre_especialista}</td>
    //             </tr>`);
    //         });
    //     });
    // }

    // loadProductosCliente();

    // Mostrar todos los productos
    function loadProductos() {
        $.get('/api/productos', function (data) {
            $('#productos tbody').empty();
            data.forEach(producto => {
                $('#productos tbody').append(`  <tr>
                    <td>${producto.nombre_producto}</td>
                    <td>$${producto.precio_producto}</td>
                    <td>${producto.nombre_tipo}</td>
                    <td>${producto.nombre_especialista}</td>
                    <td>
                        <button class="edit" data-id="${producto.id_producto}">Editar</button>
                        <button class="delete" data-id="${producto.id_producto}">Eliminar</button>
                    </td>
                </tr>`);
            });
        });
    }

    // Buscar producto
    $('#searchButton').on('click', function () {
        const nombre = $('#searchProduct').val();
        $.get(`/api/productos?nombre=${nombre}`, function (data) { // Cambiado a /api/productos
            $('#productos').empty();
            if (data.length === 0) {
                $('#productos').append(`<div>No se encontraron productos con el nombre "${nombre}"</div>`);
            } else {
                data.forEach(producto => {
                    $('#productos').append(`
                    <div class="producto-item">
                        ${producto.nombre_producto} - $${producto.precio_producto} - 
                        Tipo: ${producto.nombre_tipo} - 
                        Especialista: ${producto.nombre_especialista}
                    </div>
                `);
                });
            }
        }).fail(function () {
            alert("Hubo un error al buscar el producto.");
        });
    });

// Agregar producto
$('#formAgregar').on('submit', function (e) {
    e.preventDefault();
    const nuevoProducto = {
        nombre_producto: $('#nombre_producto').val(),
        precio_producto: $('#precio_producto').val(),
        id_tipo: $('#id_tipo').val(),
        id_especialista: $('#id_especialista').val()
    };
    if (!nuevoProducto.nombre_producto || !nuevoProducto.precio_producto || !nuevoProducto.id_tipo || !nuevoProducto.id_especialista) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    $.post('/api/productos', nuevoProducto, function (data) {
        loadProductos();
        alert("Producto agregado con éxito.");
    });
});

// Eliminar producto
$('#productos').on('click', '.delete', function () {
    const id = $(this).data('id');
    $.ajax({
        url: `/api/productos/${id}`,
        type: 'DELETE',
        success: function (result) {
            loadProductos();
            alert("Producto eliminado con éxito.");
        }
    });
});

// Editar producto
$('#productos').on('click', '.edit', function () {
    const id = $(this).data('id');
    const nombre = prompt("Nombre del producto:");
    const precio = prompt("Precio del producto:");
    const id_tipo = prompt("Numero de Tipo de producto:");
    const id_especialista = prompt("Numero de Especialista:");
    $.ajax({
        url: `/api/productos/${id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ nombre_producto: nombre, precio_producto: precio, id_tipo: id_tipo, id_especialista: id_especialista }),
        success: function (result) {
            loadProductos();
            alert("Producto modificado con éxito.");
        }
    });
});

// Cargar Tipos
function loadTipos() {
    $.get('/api/tipos', function (data) {
        $('#tipos tbody').empty();
        data.forEach(tipo => {
            $('#tipos tbody').append(`<tr>
                        <td>${tipo.id_tipo}</td>
                        <td>${tipo.nombre_tipo}</td>
                        <td>
                            <button class="edit" data-id="${tipo.id_tipo}">Editar</button>
                            <button class="delete" data-id="${tipo.id_tipo}">Eliminar</button>
                            <button class="tachar" data-id="${tipo.id_tipo}">Tachar</button>
                        </td>
                    </tr>`);
        });
    });
}

// Cargar Especialistas
function loadEspecialistas() {
    $.get('/api/especialistas', function (data) {
        console.log("Especialistas data:", data);
        data.forEach(especialista => {
            $('#especialistas tbody').append(`<tr>
                        <td>${especialista.id_especialista}</td>
                        <td>${especialista.nombre_especialista}</td>
                        <td>
                            <button class="edit" data-id="${especialista.id_especialista}">Editar</button>
                            <button class="delete" data-id="${especialista.id_especialista}">Eliminar</button>
                            <button class="tachar" data-id="${especialista.id_especialista}">Tachar</button>
                        </td>
                    </tr>`);
        });
    });
}

// Evento para editar Tipo
$('#tipos').on('click', '.edit', function () {
    const id = $(this).data('id');
    const nombre_tipo = prompt("Nombre del tipo:");

    $.ajax({
        url: `/api/tipos/${id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ nombre_tipo }),
        success: function () {
            loadTipos();
            alert("Tipo modificado con éxito.");
        }
    });
});

// Evento para editar Especialista
$('#especialistas').on('click', '.edit', function () {
    const id = $(this).data('id');
    const nombre_especialista = prompt("Nombre del especialista:");

    $.ajax({
        url: `/api/especialistas/${id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ nombre_especialista }),
        success: function () {
            loadEspecialistas();
            alert("Especialista modificado con éxito.");
        }
    });
});

// Evento para eliminar Tipo
$('#tipos').on('click', '.delete', function () {
    const id = $(this).data('id');

    $.ajax({
        url: `/api/tipos/${id}`,
        type: 'DELETE',
        success: function () {
            loadTipos();
            alert("Tipo eliminado con éxito.");
        }
    });
});

// Evento para eliminar Especialista
$('#especialistas').on('click', '.delete', function () {
    const id = $(this).data('id');

    $.ajax({
        url: `/api/especialistas/${id}`,
        type: 'DELETE',
        success: function () {
            loadEspecialistas();
            alert("Especialista eliminado con éxito.");
        }
    });
});

// Evento para tachar en Tipos
$('#tipos').on('click', '.tachar', function () {
    $(this).closest('tr').toggleClass('tachado');
});

// Evento para tachar en Especialistas
$('#especialistas').on('click', '.tachar', function () {
    $(this).closest('tr').toggleClass('tachado');
});

// Cargar las tablas al cargar la página
loadTipos();
loadEspecialistas();
loadProductos();
});

