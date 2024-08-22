import { cartProduct, products } from "../scripts/prueba.js";

const listCard = document.getElementById('list-card');
const pCounter = document.getElementById('p-counter');
const cartBox = document.getElementById('mySidebar');
const cartBtn = document.getElementById('btn-cart');
const closeBtn = document.createElement('button'); // Cambiado a 'button'

closeBtn.textContent = 'Cerrar';
closeBtn.classList.add('barBtn');
closeBtn.id = 'closeBtn';

cartBox.appendChild(closeBtn);

let cartCount = 0;
let pCounterCar = 0;

// Renderizar los productos
function componentsProduct(product) {
    const containerComponents = document.createElement('div');
    containerComponents.classList.add('card');
    containerComponents.id = product.id;

    const componentsName = document.createElement('h3');
    componentsName.textContent = product.name;

    const imgComponents = document.createElement('img');
    imgComponents.src = product.img;
    imgComponents.alt = product.name;
    imgComponents.classList.add('image-card');

    const priceComponents = document.createElement('p');
    priceComponents.textContent = `$${product.price}`;
    priceComponents.classList.add('pricing');

    const btnCart = document.createElement('button');
    btnCart.textContent = 'Agregar al carrito';
    btnCart.classList.add('btn-add-cart');

    containerComponents.appendChild(componentsName);
    containerComponents.appendChild(imgComponents);
    containerComponents.appendChild(priceComponents);
    containerComponents.appendChild(btnCart);

    listCard.appendChild(containerComponents);

    btnCart.addEventListener('click', () => addToCart(product));
}

// Función para agregar productos al carrito
function addToCart(product) {
    const existingProduct = cartProduct.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartProduct.push({ ...product
            , quantity: 1 });
    }

    pCounterCar++;
    pCounter.textContent = pCounterCar;

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cartProduct));

    updateCart();
}

// Función para actualizar el sidebar del carrito
function updateCart() {
    // Limpiar el carrito actual
    const existingItems = document.querySelectorAll('.bar-item');
    existingItems.forEach(item => item.remove());

    cartProduct.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('bar-item');

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('items-pd');
        
        const itemImg = document.createElement('img');
        itemImg.src = item.img;
        itemImg.alt = item.name;

        const itemName = document.createElement('p');
        itemName.textContent = `${item.name} - $${item.price * item.quantity}`;

        itemInfo.appendChild(itemImg);
        itemInfo.appendChild(itemName);

        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity');

        const decrementBtn = document.createElement('button');
        decrementBtn.textContent = '-';
        decrementBtn.addEventListener('click', () => changeQuantity(item.id, -1));

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;

        const incrementBtn = document.createElement('button');
        incrementBtn.textContent = '+';
        incrementBtn.addEventListener('click', () => changeQuantity(item.id, 1));

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Eliminar';
        removeBtn.addEventListener('click', () => removeItem(item.id));

        quantityControls.appendChild(decrementBtn);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(incrementBtn);
        quantityControls.appendChild(removeBtn);

        cartItem.appendChild(itemInfo);
        cartItem.appendChild(quantityControls);

        cartBox.appendChild(cartItem);
    });
}

// Cambiar la cantidad de un producto en el carrito
function changeQuantity(productId, amount) {
    const product = cartProduct.find(p => p.id === productId);

    if (product) {
        product.quantity += amount;

        if (product.quantity <= 0) {
            cartProduct.splice(cartProduct.indexOf(product), 1);
        }
    }

    pCounterCar += amount;
    pCounter.textContent = pCounterCar;

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cartProduct));

    updateCart();
}

// Eliminar un producto del carrito
function removeItem(productId) {
    const productIndex = cartProduct.findIndex(p => p.id === productId);

    if (productIndex > -1) {
        pCounterCar -= cartProduct[productIndex].quantity;
        cartProduct.splice(productIndex, 1);
        pCounter.textContent = pCounterCar;

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cartProduct));

        updateCart();
    }
}

// Abrir y cerrar el carrito
function openCart() {
    document.getElementById('mainBox').style.padding = '0rem';
    cartBox.style.display = "block";
}

function closeCart() {
    cartBox.style.display = "none";
}

cartBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);

// Cargar el carrito desde localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cartProduct.push(...JSON.parse(storedCart));
        pCounterCar = cartProduct.reduce((total, item) => total + item.quantity, 0);
        pCounter.textContent = pCounterCar;
        updateCart();
    }
}

// Renderizar productos al cargar
function renderProducts() {
    products.forEach(product => componentsProduct(product));
}

renderProducts();
loadCart();
