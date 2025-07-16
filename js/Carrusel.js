document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel__track');
    const slides = document.querySelectorAll('.carousel__slide');
    const controls = document.querySelectorAll('.carousel__control');
    const carousel = document.querySelector('.carousel');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    const intervalTime = 3000; 
    
    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        else if (index >= slideCount) index = 0;
        
        carouselTrack.style.transform = `translateX(-${index * 100 / 3}%)`;
        
        controls.forEach(control => control.classList.remove('active'));
        controls[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function startCarousel() {
        stopCarousel(); 
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    function stopCarousel() {
        clearInterval(slideInterval);
    }
    
    controls.forEach((control, index) => {
        control.addEventListener('click', () => {
            stopCarousel();
            goToSlide(index);
            startCarousel();
        });
    });
    
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
    
    startCarousel();
    controls[0].classList.add('active');
});