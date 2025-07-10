let statusUser = localStorage.getItem('statusUser') === 'true';

document.addEventListener('click', event => {
    const target = event.target;
    const a = target.closest('a');
    const btn = target.closest('button, input[type="button"]');

    const menu = document.querySelector(".nav-hamburger_menu");
    const search = document.querySelector(".search-wrapper");
    const blur = document.querySelector(".blur");

    if (a) {
        if (a.id === 'burger'){
            event.preventDefault();
            menu.classList.add("show");
            blur.classList.add("blur-active");
        }

        if (a.id === 'search'){
            event.preventDefault();
            search.classList.add("show");
            blur.classList.add("blur-active");
        }

        if (a.id === 'product') {
            event.preventDefault();
            if (!statusUser) {
                alert("User is not logged in!")
                window.location.href = 'login.html';
                return;
            }
                const product = a.closest('.product');
                const productName = product.querySelector('.caption').textContent;
                const productPrice = product.querySelector('p').textContent;
                const productImage = product.querySelector('img').src;

                const productData = {
                    name: productName,
                    price: productPrice,
                    image: productImage
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(productData);
                localStorage.setItem('cart', JSON.stringify(cart));

                alert(productName + ' added to cart!');
        }
        
    }
    
    if (btn) {
        if (btn.id === 'close-menu') {
            menu.classList.remove("show");
            blur.classList.remove("blur-active");
        }

        if (btn.id === 'close-search') {
            search.classList.remove("show");    
            blur.classList.remove("blur-active");
        }

        if (btn.id === "search-btn") {
            const inputGet = document.querySelector('.search-input_js');
            const inputSearch = document.querySelector('.search-input_js').value;

            if (document.body.innerText.toLowerCase().includes(inputSearch.toLowerCase()))
                alert('Text exist!');
            else
                alert('Unknown!');

            inputGet.value = '';
            search.classList.remove("show");    
            blur.classList.remove("blur-active");
        }

        if (btn.id === 'sign_up-register') {
            const name = document.getElementById('name-reg');
            const username = document.getElementById('username-reg');
            const email = document.getElementById('email-reg');
            const pass = document.getElementById('pass-reg');

            if (name.value && username.value && email.value && pass.value) {
                alert("Successfully Registered!");
                name.value = "";
                username.value = "";
                email.value = "";
                pass.value = "";
            } else {
                alert("Missing Information!");
            }
        }

        if (btn.id === 'sign_up') {
            const name = document.getElementById('username-log');
            const pass = document.getElementById('pass-log');

            if (name.value && pass.value) {
                alert("Successfully Logged In!");
                localStorage.setItem('statusUser', 'true');
                name.value = "";
                pass.value = "";
            } else {
                alert("Missing Information!");
            }
        }

        if (btn.closest('.delete-btn')) {
            const productCart = btn.closest('.product-cart_wrapper');
            const productName = productCart.querySelector('.product-text_cart h1').textContent;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            productCart.remove();

            cart = cart.filter(product => product.name !== productName);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            if (cart.length === 0) { 
                document.querySelector('.cart').style.display = 'flex';
                document.querySelector('.test').style.display = 'none';
            }
        }

        if (btn.id === "check-out_cart") {
            const cartWrapper = document.querySelector('.product-cart_wrapper');

            localStorage.removeItem("cart");
            cartWrapper.innerHTML = '';
            document.querySelector(".test").style.display = "none";
            alert("Successfully ordered the product(s)!");
            document.querySelector('.cart').style.display = 'flex';
        }
    }

    if (btn) {
        const carouselContainer = btn.closest('.carousel-container');
        let carousel = carouselContainer.querySelector('.carousel');
        let scrollAmount = 700;
        if (window.innerWidth <= 1200)
            scrollAmount = 350;
        

        let isDoubleClick = btn.dataset.clicked === "true";

        if (btn.id === 'carousel-right' && carousel) {
            if (isDoubleClick) {
                carousel.scrollTo({ left: 0, behavior: 'auto' });
                btn.dataset.clicked = "false";
            } else {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                btn.dataset.clicked = "true";
                setTimeout(() => btn.dataset.clicked = "false", 300);
            }
        }

        if (btn.id === 'carousel-left' && carousel) {
            if (isDoubleClick) {
                const fullWidth = carousel.scrollWidth;
                const visibleWidth = carousel.clientWidth;
                carousel.scrollTo({ left: fullWidth - visibleWidth, behavior: 'auto' });
                btn.dataset.clicked = "false";
            } else {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                btn.dataset.clicked = "true";
                setTimeout(() => btn.dataset.clicked = "false", 300);
            }
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    const cartWrapper = document.querySelector('.product-cart_wrapper');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const CheckProduct = cart.length > 0;
    
    
    carousels.forEach((carousel) => {
        const products = carousel.querySelectorAll('.product');
        
        if (products.length > 0) {
            const middleIndex = Math.floor(products.length / 2);
            const middleProduct = products[middleIndex];
            const offsetLeft = middleProduct.offsetLeft;
            const carouselWidth = carousel.offsetWidth;
            const productWidth = middleProduct.offsetWidth;
            
            carousel.scrollLeft = offsetLeft - (carouselWidth / 2) + (productWidth / 2);
        }
    });
    
    if (CheckProduct) {
        document.querySelector('.cart').style.display = 'none';
        document.querySelector('.test').style.display = 'flex';
    } else {
        document.querySelector('.cart').style.display = 'flex';
        document.querySelector('.test').style.display = 'none';
    }

    cart.forEach(productData => {
        const productCart = document.createElement('div');
        productCart.classList.add('product-cart_wrapper');
        productCart.innerHTML = `
        <div class="product-cart">
        <div class="product-img_cart">
        <img src="${productData.image}" alt="">
        </div>
                <div class="product-text_cart">
                    <h1>${productData.name}</h1>
                    <p>${productData.price}</p>
                </div>
                <div class="product-icon_cart">
                    <input type="number" value="1">
                    <button class="delete-btn"><i class="bi bi-trash"></i></button>
                </div>
            </div>

            <div class="line-break"></div>
        `;
        cartWrapper.appendChild(productCart);
    });
});


