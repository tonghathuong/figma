document.querySelectorAll('.flow-y').forEach(c => {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 350) {
            c.classList.remove('text-white');
            c.classList.add('text-black');
        } else {
            c.classList.add('text-white');
            c.classList.remove('text-black');
        }
    })
})