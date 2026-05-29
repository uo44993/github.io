
document.addEventListener("DOMContentLoaded", ()=>{
  const btn = document.getElementById("hambtn");
  const menu = document.getElementById("hambMenu");
 // if(btn && menu){
 //   btn.addEventListener("click", ()=>menu.classList.toggle("show"));
 // }

 const lang = localStorage.getItem("lang") || "es";

  document.documentElement.setAttribute("lang", lang);

  // Mostrar/ocultar textos por idioma (tu sistema actual)
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.style.display = el.dataset.lang === lang ? "inline" : "none";
  });

  // Traducir aria-label dinámicamente
  if (btn) {
    const ariaText = btn.getAttribute(`data-aria-${lang}`);
    btn.setAttribute("aria-label", ariaText);
  }

  // Toggle menú accesible
  if (btn && menu) {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", !isOpen);

      if (isOpen) {
        menu.hidden = true;
      } else {
        menu.hidden = false;
      }
    });
  }
});




// document.querySelectorAll("[data-lang]").forEach(el=>{
//    el.style.display = el.dataset.lang === lang ? "block":"none";
//  });
//});
function setLang(l){
  localStorage.setItem("lang", l);
  location.reload();
}
