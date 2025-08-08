// Isi baru untuk components.js

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

document.addEventListener("DOMContentLoaded", function() {
    // 1. Jalankan animasi untuk semua elemen yang sudah ada di halaman
    initializeScrollReveal();

    // 2. Muat footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('_footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                
                // Atur tahun
                const yearSpan = document.getElementById('current-year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }

                // 3. PENTING: Jalankan lagi animasi untuk mencari elemen baru (yaitu footer)
                initializeScrollReveal();
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});