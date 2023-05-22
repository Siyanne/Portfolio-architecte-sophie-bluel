import { fetchCategories, fetchWorks, fetchDeleteWorks } from "./api.js";
import { check, setToken } from "./auth.js";

const works = await fetchWorks();
const categories = await fetchCategories();
const deleteWorks = await fetchDeleteWorks();
console.log(deleteWorks);
const galleryElm = document.querySelector(".gallery");
const btnFiltres = document.querySelector(".filtres");
const projetsDiv = document.querySelector(".projets-modal");

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
  localStorage.clear();
});
/*function generateModal(work){
const figureElm = createAppend(galleries, "figure");
  const lienIcon = createAppend(figureElm, "button");
  const trashClass = lienIcon.classList.add("trashBtn");
  lienIcon.setAttribute("type", "button");
  lienIcon.innerText = '<i class="fa-regular fa-trash"></i>';
  const trashIcon = createAppend(lienIcon, "i");
  trashIcon.classList.add("fa-regular", "fa-trash", "trashIcon");
  const imageElm = createAppend(figureElm, "img");
  imageElm.src = work.imageUrl;

  const figcaptionElm = createAppend(figureElm, "figcaption");
  figcaptionElm.classList.add("projet");
  figcaptionElm.innerText = "éditer";
  console.log(work.id, trashClass);
  return work.id, trashClass;
}
function generateModals(works) {
  console.log("why?");
  for (let work of works) generateModal(work);
}*/
function generateModal(works) {
  const clone = document
    .querySelector("#galleries-modal")
    .content.cloneNode(true);
  clone.querySelector(".modal-projet").innerText = "editer";
  //clone.querySelector(".imgProjet").src = work.imageUrl;
  // clone.querySelector(".trashBtn").innerText = '<i class="fa-solid fa-xmark">';
  generateWorks(works);
  projetsDiv.appendChild(clone);
  console.log(works);
}

const trashBtn = document.querySelector(".trashBtn");
const figureElement = document.querySelector(".modal-projet");

function removeModalWork(work) {
  if (deleteWorks.id && deleteWorks.status === 200) {
    const parentElement = figcaptionElement.parentNode;
    parentElement.removeChild(figcaptionElement);
  }
}
trashBtn.addEventListener("click", () => {
  removeModalWork;
  console.log(deleteWorks.status);
});
const newElm = document.createElement("figure");
newElm.innerText = "test";
newElm.setAttribute("class", "new-projet");
projetsDiv.appendChild(newElm);

const selectCategories = document.querySelector("#workCategories");
selectCategories.addEventListener("click", (categories) => {
  for (let categorie of categories) {
    selectCategories.innerText = categorie.name;
  }
});
generateModal;
generateWorks(works);
generateFilterButtons(categories);
generateModal(works);
export { createAppend };
