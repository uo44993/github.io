
const lang = localStorage.getItem("lang") || "es";
document.documentElement.lang = lang;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.style.display = el.dataset.lang === lang ? "block" : "none";
  });
});

function setLang(l){
  localStorage.setItem("lang", l);
  location.reload();
}
