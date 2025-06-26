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
});