// Isi untuk loader.js
(function() {
    const loaderHTML = `
        <div id="loading-screen">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading Awesome Content...</div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    document.body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            document.body.style.overflow = 'auto';
        }, 500);
    });
})();