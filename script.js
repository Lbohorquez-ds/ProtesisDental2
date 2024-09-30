$(document).ready(function () {
    // Cargar productos y especialistas desde el local
    let products = JSON.parse(localStorage.getItem('products')) || [
        { code: 1, name: 'Ortodoncia Bracket Metálico', type: 'Ortodoncia', price: 300, specialist: 1 },
        { code: 2, name: 'Ortodoncia Bracket Zafiro', type: 'Ortodoncia', price: 600, specialist: 1 },
        { code: 3, name: 'Ortodoncia Bracket Cerámico', type: 'Ortodoncia', price: 450, specialist: 1 },
        { code: 4, name: 'Ortodoncia Lingual', type: 'Ortodoncia', price: 800, specialist: 1 },
        { code: 5, name: 'Alineador Invisible Tipo A', type: 'Alineador Invisible', price: 1200, specialist: 2 },
        { code: 6, name: 'Alineador Invisible Tipo B', type: 'Alineador Invisible', price: 1500, specialist: 4 },
        { code: 7, name: 'Carilla Dental de Porcelana', type: 'Carillas Dentales', price: 800, specialist: 4 },
        { code: 8, name: 'Carilla Dental Composite', type: 'Carillas Dentales', price: 600, specialist: 3 },
        { code: 9, name: 'Prótesis Completa Superior', type: 'Protesis Completa', price: 1200, specialist: 3 },
        { code: 10, name: 'Prótesis Completa Inferior', type: 'Protesis Completa', price: 1200, specialist: 1 },
        { code: 11, name: 'Incisivo Central Superior', type: 'Implante Dental', price: 100, specialist: 1 },
        { code: 12, name: 'Incisivo Central Inferior', type: 'Implante Dental', price: 100, specialist: 1 },
        { code: 13, name: 'Incisivo Lateral Inferior', type: 'Implante Dental', price: 100, specialist: 2 },
        { code: 14, name: 'Incisivo Lateral Superior', type: 'Implante Dental', price: 100, specialist: 2 },
        { code: 15, name: 'Canino Superior', type: 'Implante Dental', price: 120, specialist: 2 },
        { code: 16, name: 'Canino Inferior', type: 'Implante Dental', price: 120, specialist: 2 },
        { code: 17, name: 'Premolar Superior', type: 'Implante Dental', price: 150, specialist: 3 },
        { code: 18, name: 'Premolar Inferior', type: 'Implante Dental', price: 150, specialist: 4 },
        { code: 19, name: 'Molar Superior', type: 'Implante Dental', price: 180, specialist: 2 },
        { code: 20, name: 'Molar Inferior', type: 'Implante Dental', price: 180, specialist: 3 }
    ];

    let specialists = JSON.parse(localStorage.getItem('specialists')) || [
        { code: 1, name: 'Julia Sivila' },
        { code: 2, name: 'Andrea Salguero' },
        { code: 3, name: 'Emanuel Peña' },
        { code: 4, name: 'Licia Castillo' },
    ];

    // guardar en localStorage
    function saveToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('specialists', JSON.stringify(specialists));
    }

    // Refrescar Tproductos
    function refreshProductTable() {
        $('#productTable tbody').empty();
        products.forEach(product => {
            $('#productTable tbody').append(`
                <tr>
                    <td>${product.code}</td>
                    <td>${product.name}</td>
                    <td>${product.type}</td>
                    <td>${product.price}</td>
                    <td>${product.specialist}</td>
                </tr>
            `);
        });
    }

    // Buscar producto
    $('#searchButton').click(function () {
        const query = $('#searchProduct').val().toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        $('#productTable tbody').empty();
        filteredProducts.forEach(product => {
            $('#productTable tbody').append(`
                <tr>
                    <td>${product.code}</td>
                    <td>${product.name}</td>
                    <td>${product.type}</td>
                    <td>${product.price}</td>
                    <td>${product.specialist}</td>
                    <td>
                        <button class="delete-product" data-code="${product.code}">Eliminar</button>
                    </td>
                </tr>
            `);
        });
    });

    // Agregar producto
    $('#addProductButton').click(function () {
        const newProduct = {
            code: products.length + 1,
            name: $('#newProductName').val(),
            type: $('#newProductType').val(),
            price: parseFloat($('#newProductPrice').val()),
            specialist: parseInt($('#newProductSpecialist').val())
        };
        products.push(newProduct);
        saveToLocalStorage();
        refreshProductTable();
    });

    // Modificar producto
    $('#modifyProductButton').click(function () {
        const code = parseInt($('#modifyProductCode').val());
        const product = products.find(p => p.code === code);
        if (product) {
            product.name = $('#modifyProductName').val() || product.name;
            product.type = $('#modifyProductType').val() || product.type;
            product.price = parseFloat($('#modifyProductPrice').val()) || product.price;
            saveToLocalStorage();
            refreshProductTable();
        } else {
            alert('Producto no encontrado');
        }
    });

    // Eliminar producto
    $(document).on('click', '.delete-product', function () {
        const code = $(this).data('code');
        products = products.filter(product => product.code !== code);
        saveToLocalStorage();
        refreshProductTable();
    });

    // Refrescar Lespecialistas
    function refreshSpecialistList() {
        $('#specialistTable tbody').empty();
        specialists.forEach(specialist => {
            $('#specialistTable tbody').append(`
                <tr>
                    <td>${specialist.code}</td>
                    <td>${specialist.name}</td>
                </tr>
            `);
        });
    }

    // Agregar especialista
    $('#addSpecialistButton').click(function () {
        const newSpecialist = {
            code: specialists.length + 1, 
            name: $('#newSpecialistName').val()
        };
        specialists.push(newSpecialist);
        saveToLocalStorage();
        refreshSpecialistList();
    });

    // Inicializar la tabla de productos y especialistas al cargar la página
    refreshProductTable();
    refreshSpecialistList();
});