document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const overlay = document.createElement('div');
    const body = document.body;
    
    if (hamburger && nav) {
        overlay.id = 'nav-overlay';
        overlay.className = 'nav-overlay';
        body.appendChild(overlay);
        
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav');
        
        hamburger.addEventListener('click', toggleMenu);
        
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        overlay.addEventListener('click', closeMenu);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
        
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            const firstNavItem = nav.querySelector('a');
            if (firstNavItem) {
                setTimeout(() => firstNavItem.focus(), 100);
            }
        }
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
    }
    
    document.querySelectorAll('#nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                closeMenu();
            }
        });
    });
});
