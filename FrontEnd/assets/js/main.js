import { fetchCategories, fetchWorks, fetchDeleteWorks } from "./api.js";
import { check, setToken } from "./auth.js";

const works = await fetchWorks();
const categories = await fetchCategories();
const deleteWorks = await fetchDeleteWorks();
console.log(deleteWorks);
const galleryElm = document.querySelector(".gallery");
const btnFiltres = document.querySelector(".filtres");

const galleries = document.querySelector(".galleries-photos");

function createAppend(elm, tag) {
  return elm.appendChild(document.createElement(tag));
}

function generateWork(work) {
  const figureElm = createAppend(galleryElm, "figure");

  const imageElm = createAppend(figureElm, "img");
  imageElm.src = work.imageUrl;

  const figcaptionElm = createAppend(figureElm, "figcaption");
  figcaptionElm.innerText = work.title;
}

function generateWorks(works) {
  galleryElm.innerHTML = "";
  for (let work of works) generateWork(work);
}

function generateWorksFiltrees(id) {
  const worksFiltrees = works.filter(function (work) {
    if (id == 0) {
      return true;
    }
    return work.categoryId == id;
  });
  generateWorks(worksFiltrees);
}

function generateFilterButtons(categories) {
  generateFilterButton({ id: 0, name: "Tous" });
  for (let categorie of categories) generateFilterButton(categorie);
}

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
  localStorage.removeItem("token");
});

function generateProject(work) {
  const figureElm = createAppend(galleries, "figure");
  const lienIcon = createAppend(figureElm, "button");
  lienIcon.classList.add("trashBtn");
  lienIcon.setAttribute("type", "button");
  lienIcon.innerText = '<i class="fa-regular fa-trash"></i>';
  /*const trashIcon = createAppend(lienIcon, "i");
  trashIcon.classList.add("fa-regular", "fa-trash", "trashIcon");*/
  const imageElm = createAppend(figureElm, "img");
  imageElm.src = work.imageUrl;

  const figcaptionElm = createAppend(figureElm, "figcaption");
  figcaptionElm.innerText = "éditer";
  return work.id;
}

function generateGalleries(works) {
  console.log("why?");
  for (let work of works) generateProject(work);
}

const trashBtn = document.querySelector("trashBtn");
trashBtn.addEventListener("click", () => {
  const projet = works.id;
  console.log(projet);
});
generateWorks(works);
generateFilterButtons(categories);
generateGalleries(works);
export { createAppend };
