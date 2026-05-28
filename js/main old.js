
document.addEventListener('DOMContentLoaded', () => {

    // menú hamburguesa
    const hambtn = document.getElementById('hambtn');
    const hambMenu = document.getElementById('hambMenu');

    if(hambtn && hambMenu){
        hambtn.addEventListener('click', () => {
            hambMenu.classList.toggle('show');
        });
    }

    // idioma guardado
    const savedLang = localStorage.getItem('lang') || 'es';

    changeLanguage(savedLang);

});

function setLang(lang){

    localStorage.setItem('lang', lang);

    changeLanguage(lang);

}

function changeLanguage(lang){

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-lang]').forEach(el => {

        if(el.dataset.lang === lang){
            el.style.display = '';
        }else{
            el.style.display = 'none';
        }

    });

}
