document.addEventListener('DOMContentLoaded', () => {
    const navText = document.getElementById('nav-text');

    if (navText) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > 50) {
                navText.style.opacity = "1";
                navText.style.visibility = "visible";
            } else {
                navText.style.opacity = "0";
                navText.style.visibility = "hidden";
            }
        });
    }
});
