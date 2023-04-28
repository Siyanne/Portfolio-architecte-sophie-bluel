import { fetchCategories, fetchWorks } from "./api.js";

const works = await fetchWorks();
const categories = await fetchCategories();

const galleryElm = document.querySelector(".gallery");
const btnFiltreesEverything = document.querySelector(".btn-trier-tous");
const btnFiltres = document.querySelector(".filtres");

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
  document.querySelector(".gallery").innerHTML = " ";
}

function generateAllCategories(works) {
  btnFiltreesEverything.addEventListener("click", function () {
    for (let work of works) generateWork(work);
  });
}

function createElmFiltres(classe, categorie) {
  const btnElm = createAppend(btnFiltres, "button");
  btnElm.classList.add(classe);
  btnElm.innerText = categorie;
}

createElmFiltres(".btn-objets", "Objets");
createElmFiltres(".btn-appartements", "Appartements");
createElmFiltres(".btn-hotelsRestaurants", "Hôtels & restaurants");
btnFiltres.addEventListener("click", function () {
  const categoriesFilter = works.filter(function (work) {
    if (1 === works.id) {
      return console.log(work.id);
    }
  });
});

/*function categoryObjets(categorie) {
  const btnElm = createAppend(btnFiltres, "button");
  const btnObjets = btnElm.classList.add("btn-objets");
  btnElm.innerText = categorie.name;
  btnObjets.addEventListener("click", function () {
    const categoriesFilter = works.filter(function (categorie) {
      return categorie.name === "Objets";
    });
  });
}*/
generateWorks(works);
generateAllCategories(works);
