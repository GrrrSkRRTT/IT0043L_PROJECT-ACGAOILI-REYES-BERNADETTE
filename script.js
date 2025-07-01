document.addEventListener('click', function (event) {
    const target = event.target;
    const a = target.closest('a');
    const btn = target.closest('button');

    
    const menu = document.querySelector(".nav-hamburger_menu");
    
    if (a) {
        if (a.id === 'burger'){
            event.preventDefault();
            menu.classList.add("show");
        }
    }
    
    if (btn) {
        if (btn.id === 'close-menu') {
            menu.classList.remove("show");
        }
    }

    if (btn) {
        const carouselContainer = btn.closest('.carousel-container');
        let carousel = carouselContainer.querySelector('.carousel');
        const scrollAmount = 750;
        
        
       if (btn.id === 'carousel-right' && carousel) {
            carousel.scrollBy({ left: scrollAmount, behavior: 'auto' });

            setTimeout(() => {
                if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
                    carousel.scrollTo({ left: 0, behavior: 'auto' });
                }
            }, 1000);
        }

        if (btn.id === 'carousel-left' && carousel) {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'auto' });

            setTimeout(() => {
                if (carousel.scrollLeft <= 0) {
                    const fullWidth = carousel.scrollWidth;
                    const visibleWidth = carousel.clientWidth;
                    carousel.scrollTo({ left: fullWidth - visibleWidth, behavior: 'auto' });
                }
            }, 1000);
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
   const carousels = document.querySelectorAll('.carousel');

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
});

