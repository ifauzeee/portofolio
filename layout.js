// Fungsi untuk memuat dan menyisipkan komponen HTML
const loadComponent = async (url, selector) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not fetch ${url}`);
        const text = await response.text();
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = text;
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
};

// Fungsi ini akan berjalan saat skrip dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Muat header dan footer
    // Note: Untuk <head>, kita memuatnya ke dalam placeholder div, lalu memindahkan elemen.
    const headPlaceholder = document.createElement('div');
    loadComponent('_header.html', 'head').then(() => {
        // Karena <head> tidak bisa di-innerHTML secara langsung,
        // kita muat kontennya dan bisa tambahkan logic lain jika perlu.
        // Untuk setup ini, cukup pastikan file-file JS/CSS sudah di-link di _header.html
    });

    loadComponent('_footer.html', 'footer');

    // Menambahkan tombol kembali ke halaman selain index.html
    const backButtonPlaceholder = document.querySelector('#back-button-placeholder');
    if (backButtonPlaceholder) {
        backButtonPlaceholder.innerHTML = `
            <a href="index.html" class="back-button text-white hover:text-yellow-500">
                <i class="fas fa-arrow-left mr-2"></i>
                <span>Back to Home</span>
            </a>
        `;
    }
});