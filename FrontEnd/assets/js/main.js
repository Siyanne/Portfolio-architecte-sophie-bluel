import { fetchCategories, fetchWorks } from "./api.js";

const works = await fetchWorks();
const categories = await fetchCategories();

const galleryElm = document.querySelector(".gallery");
const btnFiltreesEverything = document.querySelector(".btn-trier-tous");
const btnFiltres = document.querySelector(".filtres");
galleryElm.classList.add(".gallery-show");
const showWorks = document.querySelector(".gallery-show");
galleryElm.classList.add(".gallery-zero");

const btnObjets = document.querySelector(".btn-objets");
const btnAppartements = document.querySelector(".btn-appartements");
const btnHoAndResto = document.querySelector(".btn-hotelsRestaurants");
const galleryZero = document.querySelector(".galleryZero");
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
  for (let work of works) generateWork(work);
  //document.querySelector(".gallery").innerHTML = " ";
}

let isOpen = true;
function generateAllCategories(works) {
  for (let work of works) generateWork(work);
  isOpen = true;
}

function generateAllCategoriesZero() {
  document.querySelector(".gallery-zero").innerHTML = " ";
  isOpen = false;
}
btnFiltreesEverything.addEventListener("click", function () {
  if (isOpen == true) {
    generateAllCategories(works);
  } else {
    generateAllCategoriesZero;
  }
});
// => je voulais faire un toggle pour ouvrir et fermer
function createElmFiltres(classe, categorie) {
  const btnElm = createAppend(btnFiltres, "button");
  btnElm.classList.add(classe);
  btnElm.innerText = categorie;
}

btnObjets.addEventListener("click", function () {
  const worksFiltrees = works.filter(function (work) {
    return work.categoryId == 1;
  });
  console.log(worksFiltrees);
});
/*createElmFiltres("btn-appartements", "Appartements");
btnAppartements.addEventListener("click", function () {
  const worksFiltrees = works.filter(function (work) {
    return work.categoryId == 2;
  });
  console.log(worksFiltrees);
});
/*createElmFiltres("btn-hotelsRestaurants", "Hôtels & restaurants");
btnHoAndResto.addEventListener("click", function () {
  const worksFiltrees = works.filter(function (work) {
    return work.categoryId == 3;
  });
});*/

generateWorks(works);
