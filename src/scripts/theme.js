/* Desenvolva sua lógica aqui ... */
const renderDarkMode = () => {
    const buttonDark = document.querySelector('.header__btn');
    const storedTheme = JSON.parse(localStorage.getItem('theme'));

    if (storedTheme) {
        document.body.classList.add('darkMode');
        const img = document.querySelector('.img__btn')
        img.src = './src/assets/img/sun.svg';
        img.alt = 'lightMode'
    }

buttonDark.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('darkMode')
    const isDarkMode = body.classList.contains('darkMode');
    if (isDarkMode) {
        localStorage.setItem('theme', true);
        const img = document.querySelector('.img__btn')
        img.src = './src/assets/img/sun.svg'
        img.alt = 'lightMode'
    } else {
        localStorage.removeItem('theme', false);
        const img = document.querySelector('.img__btn')
        img.src = './src/assets/img/moon.svg';
        img.alt = 'darkMode'
    }
});
};
renderDarkMode();