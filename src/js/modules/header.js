function initBurgerMenu() {

    const burger = document.querySelector('.js-burger');
    const nav = document.querySelector('.js-nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

}


export default function() {
    initBurgerMenu();
}