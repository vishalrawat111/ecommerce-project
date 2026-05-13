let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement("div");
        div.innerHTML = `<span>${item.name} - ₹${item.price}</span> <button onclick="removeFromCart(${index})">Remove</button>`;
        cartContainer.appendChild(div);
    });

    document.getElementById("cart-count").textContent = cart.length;
    document.getElementById("total-price").textContent = total;
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("show");
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Checkout successful! Total: ₹" + document.getElementById("total-price").textContent);
    cart = [];
    updateCartUI();
}