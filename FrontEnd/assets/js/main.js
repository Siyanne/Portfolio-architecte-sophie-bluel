import { fetchCategories } from "./api.js";
import { check, setToken } from "./auth.js";
import { works } from "./works.js";
const categories = await fetchCategories();

const galleryElm = document.querySelector(".gallery");
const btnFiltres = document.querySelector(".filtres");
/** elle permet de creer un element et le append à l'element parent pour l'affichage */
function createAppend(elm, tag) {
  return elm.appendChild(document.createElement(tag));
}

/** elle permet d'afficher un work/un projet recupéré dans l'api */
export function generateWork(work) {
  const figureElm = createAppend(galleryElm, "figure");
  figureElm.dataset.id = work.id;
  const imageElm = createAppend(figureElm, "img");
  imageElm.src = work.imageUrl;

  const figcaptionElm = createAppend(figureElm, "figcaption");
  figcaptionElm.innerText = work.title;
}
/**  elle permet d'afficher tout les works/projets recupérés dans l'api*/
function generateWorks(works) {
  galleryElm.innerHTML = "";
  for (let work of works) generateWork(work);
}
/** elle permet de générer des projets par leur catégorie selon leur id avec affichage grace au generateWorks*/
function generateWorksFiltrees(id) {
  const worksFiltrees = works.filter(function (work) {
    if (id == 0) {
      return true;
    }
    return work.categoryId == id;
  });
  generateWorks(worksFiltrees);
}
/** elle permet de générer un seul bouton selon la catégorie, elle permet de cloner tous les éléments qui se trouve le template coder en  html  */
function generateFilterButton(categorie) {
  const clone = document
    .querySelector("#buttonCategories")
    .content.cloneNode(true);
  clone.querySelector(".btnFiltre").innerText = categorie.name;
  clone
    .querySelector(".btnFiltre")
    .addEventListener("click", () => generateWorksFiltrees(categorie.id));
  btnFiltres.appendChild(clone);
  console.log(categorie);
}
/** elle permet de générer tous les boutons des catégories existant dans l'api */
function generateFilterButtons(categories) {
  generateFilterButton({ id: 0, name: "Tous" });
  for (let categorie of categories) generateFilterButton(categorie);
}
/** le check permet de verifier le token, et de se connecter en tant que administrateur et avoir accès a des privlèges(créer supprmier etc) */
const logged = check();
console.log(logged);
if (logged) {
  document.querySelector("body").classList.add("isAdmin");
  console.log("connecté en tant que admin");
} else {
  document.querySelector("body").classList.add("isGuest");
  console.log("connecté en tant que guest");
}
document.querySelector(".logout--link").addEventListener("click", function () {
  setToken();
  if (setToken()) {
    document.querySelector("body").classList.remove("isAdmin");
    console.log("vous n'êtes plus connecté");
  } else {
    document.querySelector("body").classList.add("isGuest");
    document.querySelector("body").classList.remove("isAdmin");
    console.log("vous n'êtes plus connecté en tant que guest");
  }
  localStorage.clear();
});

generateWorks(works);
generateFilterButtons(categories);
export { createAppend };
