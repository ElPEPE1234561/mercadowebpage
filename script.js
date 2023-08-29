const foods = [
    {
      name: "Alimento 1",
      image: "aderezos.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$2.99",
    },
    {
      name: "Alimento 2",
      image: "chocolates.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$1.49",
    },
    {
      name: "Alimento 3",
      image: "condimentos.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$3.99",
    },
    {
      name: "Alimento 4",
      image: "huevo.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$4.49",
    },
    {
      name: "Alimento 5",
      image: "leche.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$2.25",
    },
    {
      name: "Alimento 6",
      image: "manteca.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$3.75",
    },
    {
      name: "Alimento 7",
      image: "pan.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$5.99",
    },
    {
      name: "Alimento 8",
      image: "queso.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$1.99",
    },
    {
      name: "Alimento 9",
      image: "verduras.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$3.49",
    },
    {
      name: "Alimento 10",
      image: "yogurtH.jpg", // Cambiar por la ruta correcta de la imagen
      price: "$2.15",
    },
    // Agregar más elementos aquí
  ];
  
  const itemColors = [
    "#FFff", // Color 1
    "rgba(255,216,168,255)", // Color 2
    "#FFFF", // Color 3
    "#FFFF", // Color 4
    "rgba(209,238,255,255)", // Color 5
    "#FFFF", // Color 6
    "rgba(255,241,179,255)", // Color 7
    "rgba(165,243,245,255)", // Color 8
    "#FFFF", // Color 9
    "rgba(245,245,245,255)"  // Color 10
  ];

  function removeFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    cartTotal -= removedItem.total;
    updateCart();
  }
  
  function resetCart() {
    cartItems.length = 0;
    cartTotal = 0;
    updateCart();
  }
  
  function showOverlay(index) {
    const overlay = document.getElementById("overlay");
    const overlayContent = overlay.querySelector(".overlay-content");
  
    const food = foods[index];
  
    overlayContent.innerHTML = `
    <div class="overlay-header">
      <button class="close-button" onclick="closeOverlay()">&times;</button>
    </div>
    <img src="${food.image}" alt="${food.name}" width="150" height="150">
    <p class="price">${food.price}</p>
    <div class="quantity-control">
      <button class="quantity-btn minus minus-${index}" onclick="adjustQuantity(-1, ${index})">&#8722;</button>
      <input type="number" id="quantity" value="1">
      <button class="quantity-btn plus plus-${index}" onclick="adjustQuantity(1, ${index})">&#43;</button>
    </div>
    <button class="buy-button" onclick="addToCart(${index}, parseInt(document.getElementById('quantity').value))">Agregar al Carrito</button>
  `;
  
    overlayContent.style.backgroundColor = itemColors[index]; // Usar color específico
  
    overlay.style.display = "flex";
  }
  
  function closeOverlay() {
    const overlay = document.getElementById("overlay");
    const overlayContent = overlay.querySelector(".overlay-content");
  
    overlayContent.style.backgroundColor = "white"; // Restaurar el color de fondo original
    overlay.style.display = "none";
  }


  const cartItems = [];
let cartTotal = 0;

function removeFromCart(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  cartTotal -= removedItem.total;
  updateCart();
}

function resetCart() {
  cartItems.length = 0;
  cartTotal = 0;
  updateCart();
}

function showOverlay(index) {
  const overlay = document.getElementById("overlay");
  const overlayContent = overlay.querySelector(".overlay-content");

  const food = foods[index];

  overlayContent.innerHTML = `
    <div class="overlay-header">
      <button class="close-button" onclick="closeOverlay()">&times;</button>
    </div>
    <img src="${food.image}" alt="${food.name}" width="150" height="150">
    <p class="price">${food.price}</p>
    <div class="quantity-control">
      <button class="quantity-btn minus" onclick="adjustQuantity(-1)">&#8722;</button>
      <input type="number" id="quantity" value="1">
      <button class="quantity-btn plus" onclick="adjustQuantity(1)">&#43;</button>
    </div>
    <button class="buy-button" onclick="addToCart(${index}, parseInt(document.getElementById('quantity').value))">Agregar al Carrito</button>
  `;

  overlayContent.style.backgroundColor = itemColors[index]; // Usar color específico

  overlay.style.display = "flex";
}

function closeOverlay() {
  const overlay = document.getElementById("overlay");
  const overlayContent = overlay.querySelector(".overlay-content");

  overlayContent.style.backgroundColor = "white"; // Restaurar el color de fondo original
  overlay.style.display = "none";
}

function addToCart(foodIndex, quantity) {
  const food = foods[foodIndex];
  const itemTotal = parseFloat(food.price.slice(1)) * quantity;

  const existingItemIndex = cartItems.findIndex(item => item.food.name === food.name);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += quantity;
    cartItems[existingItemIndex].total += itemTotal;
  } else {
    cartItems.push({
      food: food,
      quantity: quantity,
      total: itemTotal
    });
  }

  cartTotal += itemTotal;
  updateCart();
  closeOverlay();
}

function updateCart() {
  const cartItemsList = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsList.innerHTML = "";
  cartItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.food.name} x${item.quantity} = $${item.total.toFixed(2)}`;
    cartItemsList.appendChild(listItem);
  });

  cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
}

function adjustQuantity(change) {
  const quantityInput = document.getElementById("quantity");
  let quantity = parseInt(quantityInput.value) + change;
  if (quantity < 1) quantity = 1;
  quantityInput.value = quantity;
}   

document.addEventListener("DOMContentLoaded", function () {
  const quantityBtns = document.querySelectorAll(".quantity-btn");

  quantityBtns.forEach((btn, index) => {
    btn.style.backgroundColor = itemColors[index];
  });
});