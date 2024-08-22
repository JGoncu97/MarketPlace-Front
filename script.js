document.addEventListener('DOMContentLoaded', () => {
    const listCard = document.getElementById('list-card');
    const pCounter = document.getElementById('p-counter');
    let cartCount = 0;

    const products = [
        { id: 1, nombre: 'CPU', precio: 800000, imagen: './assets/cpu.jpg' },
        { id: 2, nombre: 'MONITOR', precio: 1200000, imagen: './assets/monitor.avif' },
        { id: 3, nombre: 'TECLADO', precio: 350000, imagen: './assets/teclado.jpg' },
        { id: 4, nombre: 'MOUSE', precio: 150000, imagen: './assets/mouse.jpg' },
        { id: 5, nombre: 'GRAFICA', precio: 2000000, imagen: './assets/Tarjeta-grafica.jpg' },
        { id: 6, nombre: 'MEMORIA RAM', precio: 450000, imagen: './assets/Memoria Ram ddr5.jpg' }
    ];

    function cargarProductos() {
        listCard.innerHTML = ''; // Limpia el contenedor antes de agregar productos

        products.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('id', producto.id);

            card.innerHTML = `
                <div class="title-card">
                    <h3>${producto.nombre}</h3>
                </div>
                <img src="${producto.imagen}" alt="${producto.nombre}" class="image-card">
                <div class="pricing">
                    <p class="price">${producto.precio.toLocaleString()} <strong>$</strong></p>
                    <button class="btn-add-cart">Agregar al Carro</button>
                </div>
            `;

            listCard.appendChild(card);

            card.querySelector('.btn-add-cart').addEventListener('click', () => {
                cartCount++;
                pCounter.textContent = cartCount;
            });
        });
    }

    cargarProductos();

    // Función para agregar un nuevo producto
    function addProduct(nombre, precio, imagen) {
        const newProduct = {
            id: products.length + 1,
            nombre: nombre,
            precio: precio,
            imagen: imagen
        };
        products.push(newProduct);
        cargarProductos();
    }

    // Ejemplo de cómo agregar un nuevo producto
    addProduct('NUEVO PRODUCTO', 500000, './assets/nuevo-producto.jpg');
});
