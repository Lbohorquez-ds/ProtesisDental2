// Realizar la petición al backend para obtener los datos de SQLite
fetch('http://localhost:3000/data')
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(data => {
    console.log(data); // Mostrar los datos en la consola para verificar que funciona
    
    const dataContainer = document.getElementById('data-container');
    
    // Mostrar los datos en el DOM (HTML)
    data.data.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p>ID: ${item.id}, Nombre: ${item.name}</p>`;
      dataContainer.appendChild(div);
    });
  })
  .catch(error => console.error('Error:', error)); // Capturar errores si ocurre algo mal