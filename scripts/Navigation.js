// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    document.getElementById(pageId).classList.add('active-page');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active-nav');
        }
    });

    document.getElementById('mobile-menu').classList.add('hidden');
    window.scrollTo(0, 0);
}

// Initial page load
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.hash.substring(1) || 'home';
    showPage(currentPage);

    // Add click listeners to nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            showPage(targetPage);
            window.location.hash = targetPage;
        });
    });
});

// Listen to hash changes (back/forward browser buttons)
window.addEventListener('hashchange', () => {
    const currentPage = window.location.hash.substring(1) || 'home';
    showPage(currentPage);
});
