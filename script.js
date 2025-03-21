// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}


// Making Function
function ready() {
    loadCartFromLocalStorage();
    // Remove Items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Update the cart count on page load
    updateCartCount();
}

// Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    updateCartCount();
    saveCartToLocalStorage();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartToLocalStorage();
}

// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerHTML == title) {
            alert("You have already added this item to the cart");
            return;
        }
    }
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- remove cart-->
        <i class='bx bx-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    updateCartCount();
    saveCartToLocalStorage();
}

// Update Cart Count
function updateCartCount() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var cartCount = cartBoxes.length;
    document.getElementById('cart-count').innerText = cartCount;
}

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var subTotal = 0;
    var taxRate = 0.10; // Tax rate is 10%
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        subTotal += price * quantity;
    }
    var tax = subTotal * taxRate;
    var total = subTotal + tax;
    document.querySelector(".subtotal-price").innerText = "$" + subTotal.toFixed(2);
    document.querySelector(".tax-price").innerText = "$" + tax.toFixed(2);
    document.querySelector(".total-price").innerText = "$" + total.toFixed(2);
}

// User Modal
const userIcon = document.getElementById("user-icon");
const userModal = document.getElementById("user-modal");
const closeModal = document.querySelector(".close-modal");
const switchToSignup = document.getElementById("switch-to-signup");
const switchToLogin = document.getElementById("switch-to-login");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Open Modal
userIcon.onclick = () => {
    userModal.classList.add("active");
};

// Close Modal
closeModal.onclick = () => {
    userModal.classList.remove("active");
};

// Switch to Sign Up Form
switchToSignup.onclick = (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
};

// Switch to Log In Form
switchToLogin.onclick = (e) => {
    e.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "block";
};

// Handle Log In Form Submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    // Add your login logic here
    console.log("Logging in with:", email, password);
    alert("Logged in successfully!");
    userModal.classList.remove("active");
});

// Handle Sign Up Form Submission
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    // Add your signup logic here
    console.log("Signing up with:", name, email, password);
    alert("Signed up successfully!");
    userModal.classList.remove("active");
});

// Search Functionality
const searchInput = document.getElementById("search-input");
const productBoxes = document.querySelectorAll(".product-box");
const noResultsMessage = document.querySelector(".no-results");

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let foundResults = false;

    productBoxes.forEach((productBox) => {
        const productTitle = productBox.querySelector(".product-title").innerText.toLowerCase();
        if (productTitle.includes(searchTerm)) {
            productBox.style.display = "block"; // Show the product
            foundResults = true;
        } else {
            productBox.style.display = "none"; // Hide the product
        }
    });

    // Show or hide the "No Results Found" message
    if (foundResults) {
        noResultsMessage.style.display = "none"; // Hide the message if results are found
    } else {
        noResultsMessage.style.display = "block"; // Show the message if no results are found
    }
});

// Hamburger Menu
const menuIcon = document.getElementById("menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon.onclick = () => {
    navlist.classList.toggle("active");
};



// Local Storage
function saveCartToLocalStorage() {
    const cartContent = document.querySelector(".cart-content");
    const cartBoxes = cartContent.getElementsByClassName("cart-box");
    const cartItems = [];

    for (let i = 0; i < cartBoxes.length; i++) {
        const cartBox = cartBoxes[i];
        const title = cartBox.querySelector(".cart-product-title").innerText;
        const price = cartBox.querySelector(".cart-price").innerText;
        const quantity = cartBox.querySelector(".cart-quantity").value;
        const productImg = cartBox.querySelector(".cart-img").src;

        cartItems.push({
            title: title,
            price: price,
            quantity: quantity,
            productImg: productImg,
        });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartContent = document.querySelector(".cart-content");

    cartItems.forEach((item) => {
        const cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");

        const cartBoxContent = `
            <img src="${item.productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${item.title}</div>
                <div class="cart-price">${item.price}</div>
                <input type="number" value="${item.quantity}" class="cart-quantity">
            </div>
            <i class='bx bx-trash cart-remove'></i>`;
        cartShopBox.innerHTML = cartBoxContent;
        cartContent.append(cartShopBox);

        // Add event listeners for remove and quantity change
        cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
        cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
    });

    updatetotal(); // Update the total price
    updateCartCount(); // Update the cart count
}



// Chat Box
const chatIcon = document.querySelector(".chat-icon");
const chatBox = document.querySelector(".chat-box");
const closeChat = document.querySelector(".close-chat");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatMessages = document.querySelector(".chat-messages");

// Open Chat Box
if (chatIcon) {
    chatIcon.addEventListener("click", () => {
        chatBox.classList.add("active");
    });
}

// Close Chat Box
closeChat.addEventListener("click", () => {
    chatBox.classList.remove("active");
});

// Send Message
sendBtn.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, "user");
        chatInput.value = ""; // Clear input
    }
});

// Add Message to Chat
function addMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to latest message
}