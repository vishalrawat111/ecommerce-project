const api = "https://ecommerce-project-1xai.onrender.com/api/products";

fetch(api)
    .then(res => res.json())
    .then(data => {

        const productsDiv = document.getElementById("products");

        data.forEach(product => {

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
<img src="${product.image}">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
`;

            productsDiv.appendChild(card);

        });

    });