
document.addEventListener("DOMContentLoaded", ()=>{
  const btn = document.getElementById("hambtn");
  const menu = document.getElementById("hambMenu");
  if(btn && menu){
    btn.addEventListener("click", ()=>menu.classList.toggle("show"));
  }
  const lang = localStorage.getItem("lang") || "es";
  document.querySelectorAll("[data-lang]").forEach(el=>{
    el.style.display = el.dataset.lang === lang ? "block":"none";
  });
});
function setLang(l){
  localStorage.setItem("lang", l);
  location.reload();
}
