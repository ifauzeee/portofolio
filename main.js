// ==================================
// LOADER LOGIC
// ==================================
(function() {
    const loaderHTML = `<div id="loading-screen"><div class="loading-spinner"></div><div class="loading-text">Loading Awesome Content...</div></div>`;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    document.body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    });
})();

// ==================================
// MAIN SCRIPT LOGIC
// ==================================
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal:not(.active)');
    if (revealElements.length === 0) return;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(element => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
    // ==================================
    // THEME SWITCHER LOGIC
    // ==================================
    const themeSwitcher = document.getElementById('theme-switcher');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if(sunIcon) sunIcon.classList.add('hidden');
            if(moonIcon) moonIcon.classList.remove('hidden');
        } else {
            body.classList.remove('light-mode');
            if(sunIcon) sunIcon.classList.remove('hidden');
            if(moonIcon) moonIcon.classList.add('hidden');
        }
    };

    if(themeSwitcher){
        themeSwitcher.addEventListener('click', () => {
            const isLight = body.classList.contains('light-mode');
            const newTheme = isLight ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('dark'); // Default to dark mode
    }

    // ==================================
    // COMPONENT & PAGE-SPECIFIC LOGIC
    // ==================================
    initializeScrollReveal();

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('_footer.html')
            .then(response => response.ok ? response.text() : Promise.reject('File not found'))
            .then(data => {
                footerPlaceholder.innerHTML = data;
                const yearSpan = document.getElementById('current-year');
                if (yearSpan) yearSpan.textContent = new Date().getFullYear();
                initializeScrollReveal(); // Re-run for footer
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // Logic specifically for index.html
    const scrollProgress = document.querySelector('.scroll-progress');
    if(scrollProgress) {
        function updateScrollProgress() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
            scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
        }
        window.addEventListener('scroll', updateScrollProgress);
        window.addEventListener('resize', updateScrollProgress);
        updateScrollProgress();
    }
    
    const marquee = document.querySelector('.marquee');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
    }
});