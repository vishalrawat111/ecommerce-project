document.addEventListener("DOMContentLoaded", function () {

    let isLogin = true;

    /* ================= HERO AUTO SLIDER ================= */

    let slides = document.querySelectorAll(".slide");

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000);

    /* ================= PRODUCT API ================= */

    const productContainer =
        document.getElementById("product-container");

    const searchInput =
        document.getElementById("search");

    const categorySelect =
        document.getElementById("category-select");

    let products = [];

    async function loadProducts() {

        try {

            const res =
                await fetch(
                    "https://dummyjson.com/products?limit=100"
                );

            const data =
                await res.json();

            products = data.products;

            renderProducts(products);

        } catch (error) {

            console.error(error);

            productContainer.innerHTML = `
                <h2 style="padding:20px;">
                    Failed to load products
                </h2>
            `;
        }
    }

    function renderProducts(list) {

        productContainer.innerHTML = "";

        list.forEach(product => {

            const oldPrice =
                Math.floor(
                    product.price +
                    (product.price * 0.4)
                );

            const rating =
                Math.round(product.rating);

            let stars = "";

            for (let i = 0; i < 5; i++) {

                if (i < rating) {
                    stars += "⭐";
                } else {
                    stars += "☆";
                }
            }

            const card =
                document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `

                <div class="discount-badge">
                    ${product.discountPercentage.toFixed(0)}% OFF
                </div>

                <div class="wishlist-btn">
                    ❤️
                </div>

                <img
                    src="${product.thumbnail}"
                    onclick="openProduct(${product.id})"
                    style="cursor:pointer"
                />

                <h3
                    onclick="openProduct(${product.id})"
                    style="cursor:pointer"
                >
                    ${product.title}
                </h3>

                <div class="rating">
                    ${stars}
                    <span>(${product.rating})</span>
                </div>

                <div class="price-box">
                    <span class="new-price">
                        ₹${product.price}
                    </span>

                    <span class="old-price">
                        ₹${oldPrice}
                    </span>
                </div>

                <p class="delivery">
                    FREE Delivery Tomorrow
                </p>

                <p class="product-desc">
                    ${product.description.slice(0, 60)}...
                </p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            `;

            productContainer.appendChild(card);
        });
    }

    /* ================= PRODUCT PAGE ================= */

    window.openProduct = function (id) {

        window.location.href =
            "product.html?id=" + id;
    };

    /* ================= CART ================= */

    window.addToCart = function (id) {

        const product =
            products.find(p => p.id === id);

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCartCount();

        alert(product.title + " added to cart");
    };

    function updateCartCount() {

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const cartCount =
            document.getElementById("cart-count");

        if (cartCount) {

            cartCount.textContent =
                cart.length;
        }
    }

    /* ================= SEARCH ================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            (e) => {

                const text =
                    e.target.value.toLowerCase();

                const filtered =
                    products.filter(product =>

                        product.title
                            .toLowerCase()
                            .includes(text)
                    );

                renderProducts(filtered);
            }
        );
    }

    /* ================= CATEGORY FILTER ================= */

    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            (e) => {

                const category =
                    e.target.value;

                if (category === "All") {

                    renderProducts(products);

                } else {

                    const filtered =
                        products.filter(product =>

                            product.category
                                .toLowerCase()
                                .includes(
                                    category.toLowerCase()
                                )
                        );

                    renderProducts(filtered);
                }
            }
        );
    }

    /* ================= MODAL ================= */

    window.openLoginModal = function () {

        document.getElementById("authModal")
            .style.display = "flex";
    };

    window.closeModal = function () {

        document.getElementById("authModal")
            .style.display = "none";
    };

    /* ================= LOGIN TYPE ================= */

    window.setType = function (type) {

        const emailBtn =
            document.getElementById("emailBtn");

        const mobileBtn =
            document.getElementById("mobileBtn");

        const identifier =
            document.getElementById("identifier");

        if (type === "email") {

            emailBtn.className = "active-btn";

            mobileBtn.className = "inactive-btn";

            identifier.placeholder =
                "Enter Email";

        } else {

            emailBtn.className = "inactive-btn";

            mobileBtn.className = "active-btn";

            identifier.placeholder =
                "Enter Mobile Number";
        }
    };

    /* ================= TOGGLE AUTH ================= */

    window.toggleAuthMode = function () {

        const modalTitle =
            document.getElementById("modalTitle");

        const btnText =
            document.getElementById("btnText");

        const toggleText =
            document.getElementById("toggleText");

        isLogin = !isLogin;

        modalTitle.innerText =
            isLogin ? "Login" : "Sign Up";

        btnText.innerText =
            isLogin ? "Login" : "Sign Up";

        toggleText.innerText =
            isLogin
                ? "Don't have an account?"
                : "Already have an account?";
    };

    /* ================= AUTH ================= */

    window.handleAuth = async function () {

        const identifier =
            document.getElementById("identifier");

        const password =
            document.getElementById("password");

        const btnText =
            document.getElementById("btnText");

        const identifierValue =
            identifier.value.trim();

        const passwordValue =
            password.value;

        if (!identifierValue || !passwordValue) {

            alert("Please fill all fields!");
            return;
        }

        btnText.innerText =
            "Please wait...";

        try {

            const BASE_URL =
                "http://127.0.0.1:5000";

            const endpoint =
                isLogin
                    ? "/api/auth/login"
                    : "/api/auth/register";

            let bodyData = {
                password: passwordValue
            };

            if (isLogin) {

                bodyData.emailOrMobile =
                    identifierValue;

            } else {


                bodyData.name =
                    identifierValue.split("@")[0];
                if (
                    identifierValue.includes("@")
                ) {

                    bodyData.email =
                        identifierValue;

                } else {

                    bodyData.mobile =
                        identifierValue;
                }
            }

            const response =
                await fetch(
                    BASE_URL + endpoint,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(bodyData)
                    }
                );

            const data =
                await response.json();

            if (response.ok) {

                // SAVE TOKEN

                if (data.token) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );
                }

                // SAVE USER

                if (data.user) {

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );
                }

                alert(
                    isLogin
                        ? "✅ Login Successful!"
                        : "✅ Signup Successful!"
                );

                closeModal();

                location.reload();

            } else {

                alert(data.message);
            }

        } catch (error) {

            console.error(error);

            alert(
                "Run backend:\nnode server/server.js"
            );
        }

        btnText.innerText =
            isLogin ? "Login" : "Sign Up";
    };

    loadProducts();

    updateCartCount();
    /* ================= USER PROFILE ================= */

    const userArea =
        document.getElementById("user-area");

    const savedUser =
        JSON.parse(localStorage.getItem("user"));

    if (savedUser && userArea) {

        userArea.innerHTML = `

        <span>
            👋 Hello,
        </span>

        <p>
            ${savedUser.name || "User"}
        </p>
    `;

        userArea.onclick = function () {

            const logout =
                confirm(
                    "Do you want to logout?"
                );

            if (logout) {

                localStorage.removeItem("user");

                localStorage.removeItem("token");

                location.reload();
            }
        };
    }
});