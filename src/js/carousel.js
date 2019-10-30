const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('carousel-slide img');

//Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//Counter
let Counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

$(document).ready(function() {
    function slider(){
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'; 
    }
})