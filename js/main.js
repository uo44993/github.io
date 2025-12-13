const contentEl = document.getElementById('content');
const btnEs = document.getElementById('langEs');
const btnEn = document.getElementById('langEn');
const hambtn = document.getElementById('hambtn');
const hambMenu = document.getElementById('hambMenu');

const i18n = {
  es: {
    site_title:'Mi nombre',
    subtitle:'Breve presentación o lema',
    menu_personal:'Personal',
    menu_hobbies:'Aficiones',
    menu_projects:'Proyectos',
    nav_personal:'Personal',
    nav_hobbies:'Aficiones',
    nav_projects:'Proyectos',
    personal_title:'Sobre mí',
    personal_presentacion:'Presentación',
    personal_paragraph:'Soy [tu nombre], desarrollador/a y entusiasta. Aquí va una breve biografía.',
    contact:'Contacto',
    contact_email_label:'Email:',
    contact_email:'tu@correo.com',
    contact_tel_label:'Tel:',
    contact_linkedin_label:'LinkedIn:',
    contact_linkedin:'tu-linkedin',
    hobbies_title:'Aficiones',
    hobby_sports:'Deportes',
    hobby_sports_text:'Descripción de deportes que practicas o sigues.',
    hobby_music:'Música',
    hobby_music_text:'Gustos musicales, instrumentos, conciertos favoritos.',
    hobby_travel:'Viajes',
    hobby_travel_text:'Lugares visitados y destinos soñados.',
    hobby_other:'Otros',
    hobby_other_text:'Otras aficiones.',
    projects_title:'Proyectos',
    proj_work:'Laboral',
    proj_personal:'Personal',
    proj_work_item1:'Proyecto A - descripción breve',
    proj_work_item2:'Proyecto B - descripción breve',
    proj_personal_item1:'Proyecto personal 1',
    proj_personal_item2:'Proyecto personal 2',
    version_info:'Versión: HTML5 / CSS3'
  },
  en: {
    site_title:'My name',
    subtitle:'Short presentation or tagline',
    menu_personal:'Personal',
    menu_hobbies:'Hobbies',
    menu_projects:'Projects',
    nav_personal:'Personal',
    nav_hobbies:'Hobbies',
    nav_projects:'Projects',
    personal_title:'About me',
    personal_presentacion:'Introduction',
    personal_paragraph:'I am [your name], a developer and enthusiast. Here goes a short bio.',
    contact:'Contact',
    contact_email_label:'Email:',
    contact_email:'your@email.com',
    contact_tel_label:'Phone:',
    contact_linkedin_label:'LinkedIn:',
    contact_linkedin:'your-linkedin',
    hobbies_title:'Hobbies',
    hobby_sports:'Sports',
    hobby_sports_text:'Description of the sports you practice or follow.',
    hobby_music:'Music',
    hobby_music_text:'Musical tastes, instruments, favorite concerts.',
    hobby_travel:'Travel',
    hobby_travel_text:'Places visited and dream destinations.',
    hobby_other:'Other',
    hobby_other_text:'Other hobbies.',
    projects_title:'Projects',
    proj_work:'Work',
    proj_personal:'Personal',
    proj_work_item1:'Project A - short description',
    proj_work_item2:'Project B - short description',
    proj_personal_item1:'Personal project 1',
    proj_personal_item2:'Personal project 2',
    version_info:'Version: HTML5 / CSS3'
  }
};

let currentLang = localStorage.getItem('siteLang') || 'es';

function applyTranslations(){
  const dict = i18n[currentLang] || i18n.es;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(!key) return;
    if(dict[key]) {
      // For links or inputs, set value/text appropriately
      if(el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'P' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'LI' || el.tagName === 'SPAN' || el.tagName === 'DIV' ){
        el.textContent = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });
  // also update footer version text if present
  const ver = document.querySelector('[data-i18n="version_info"]');
  if(ver && i18n[currentLang] && i18n[currentLang].version_info) ver.textContent = i18n[currentLang].version_info;
}

// templates fallback mapping (templates are present in index.html)
const templates = {
  './html/personal.html': document.getElementById('tpl-personal').innerHTML,
  './html/hobbies.html': document.getElementById('tpl-hobbies').innerHTML,
  './html/projects.html': document.getElementById('tpl-projects').innerHTML
};

async function loadPage(url){
  try{
    const res = await fetch(url, { cache: "no-store" });
    if(!res.ok) throw new Error("Error cargando " + url);
    const html = await res.text();
    contentEl.innerHTML = html;
  } catch (e) {
    contentEl.innerHTML = "<div class='card'>Error cargando la página</div>";
    console.error(e);
  } finally {
    applyTranslations();
  }
}

// delegated links so both sidebar and hamburger menu work
document.addEventListener('click', (ev)=>{
  const a = ev.target.closest('[data-load]');
  if(a){ ev.preventDefault(); const url = a.getAttribute('data-load'); const normalized = url.startsWith('./') || url.startsWith('/') ? url : './' + url; loadPage(normalized); }
});

// language buttons change site-wide language and persist selection
btnEs.addEventListener('click', ()=>{
  currentLang = 'es';
  localStorage.setItem('siteLang', currentLang);
  applyTranslations();
});
btnEn.addEventListener('click', ()=>{
  currentLang = 'en';
  localStorage.setItem('siteLang', currentLang);
  applyTranslations();
});

// hamburger toggle
hambtn.addEventListener('click', ()=>{
  const is = hambMenu.classList.toggle('show');
  hambtn.setAttribute('aria-expanded', is ? 'true' : 'false');
});

// on load, apply translations and load default page
applyTranslations();
loadPage('./html/personal.html');
