import { fetchCategories, fetchWorks } from "./api.js";

const works = await fetchWorks();
const categories = await fetchCategories();

const galleryElm = document.querySelector(".gallery");
const boutonFiltrees = document.querySelector(".btn-trier-categories");

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
}

boutonFiltrees.addEventListener("click", function () {
  document.querySelector(".filtres");
  generateWorks(
    fetchCategories.filter(function (categories) {
      return categories.name;
    })
  );
});
generateWorks(works);
