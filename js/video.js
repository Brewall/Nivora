console.log("video.js cargado correctamente");
document.addEventListener('DOMContentLoaded', function() {
    const floatingVideo = document.querySelector('.floating-video');
    let isDragging = false;
    let offsetX, offsetY;

    floatingVideo.addEventListener('mousedown', function(e) {
        isDragging = true;
        floatingVideo.classList.add('dragging');
        

        offsetX = e.clientX - floatingVideo.getBoundingClientRect().left;
        offsetY = e.clientY - floatingVideo.getBoundingClientRect().top;
        
        e.preventDefault();
    });


    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        const maxX = window.innerWidth - floatingVideo.offsetWidth;
        const maxY = window.innerHeight - floatingVideo.offsetHeight;
        
        floatingVideo.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
        floatingVideo.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
        floatingVideo.style.right = 'auto';
        floatingVideo.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            floatingVideo.classList.remove('dragging');
        }
    });

    floatingVideo.addEventListener('touchstart', function(e) {
        isDragging = true;
        floatingVideo.classList.add('dragging');
        const touch = e.touches[0];
        offsetX = touch.clientX - floatingVideo.getBoundingClientRect().left;
        offsetY = touch.clientY - floatingVideo.getBoundingClientRect().top;
    }, {passive: false});

    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        const x = touch.clientX - offsetX;
        const y = touch.clientY - offsetY;
        
        const maxX = window.innerWidth - floatingVideo.offsetWidth;
        const maxY = window.innerHeight - floatingVideo.offsetHeight;
        
        floatingVideo.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
        floatingVideo.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
        floatingVideo.style.right = 'auto';
        floatingVideo.style.bottom = 'auto';
    }, {passive: false});

    document.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            floatingVideo.classList.remove('dragging');
        }
    });
});