// Cargar productos desde la base de datos al iniciar
function loadProducts() {
    $.ajax({
        url: 'http://localhost:3000/api/productos',
        method: 'GET',
        success: function(products) {
            $('#productTable tbody').empty();
            products.forEach(product => {
                $('#productTable tbody').append(`
                    <tr>
                        <td>${product.id_producto}</td>
                        <td>${product.nombre_producto}</td>
                        <td>${product.id_tipo}</td>
                        <td>${product.precio_producto}</td>
                        <td>${product.id_especialista}</td>
                        <td><button class="delete-product" data-id="${product.id_producto}">Eliminar</button></td>
                    </tr>
                `);
            });
        }
    });
}

$('#addProductButton').click(function () {
    const newProduct = {
        name: $('#newProductName').val(),
        type: $('#newProductType').val(),
        price: parseFloat($('#newProductPrice').val()),
        specialist: parseInt($('#newProductSpecialist').val())
    };

    $.ajax({
        url: 'http://localhost:3000/api/productos',
        method: 'POST',
        data: JSON.stringify(newProduct),
        contentType: 'application/json',
        success: function() {
            loadProducts();
        }
    });
});

$(document).on('click', '.delete-product', function () {
    const id = $(this).data('id');
    $.ajax({
        url: `http://localhost:3000/api/productos/${id}`,
        method: 'DELETE',
        success: function() {
            loadProducts();
        }
    });
});

$('#modifyProductButton').click(function () {
    const id = parseInt($('#modifyProductCode').val());
    const updatedProduct = {
        name: $('#modifyProductName').val(),
        type: $('#modifyProductType').val(),
        price: parseFloat($('#modifyProductPrice').val())
    };

    $.ajax({
        url: `http://localhost:3000/api/productos/${id}`,
        method: 'PUT',
        data: JSON.stringify(updatedProduct),
        contentType: 'application/json',
        success: function() {
            loadProducts();
        }
    });
});

$(document).ready(function () {
    loadProducts();
    loadSpecialists();
});