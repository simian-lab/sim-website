document.addEventListener('DOMContentLoaded', function () {

    const burger = document.querySelector('.burger');
    const navWrap = document.querySelector('.nav-wrap');

    if (burger && navWrap) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('active');
            navWrap.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', function () {
        if (window.scrollY >= 100) {
            document.body.classList.add('scroll');
        } else {
            document.body.classList.remove('scroll');
        }
    });

});