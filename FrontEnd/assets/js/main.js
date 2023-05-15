import { fetchCategories, fetchWorks } from "./api.js";
import { redirectToHome } from "./login.js";

const works = await fetchWorks();
const categories = await fetchCategories();

const galleryElm = document.querySelector(".gallery");
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

if (redirectToHome) {
  const bodyElm = document.getElementsByTagName("body");
  bodyElm.classList.add("admin");
}
const admin = document.querySelector(".admin");

if (admin) {
  navAndEdition();
  logoutBtn();
}
function navAndEdition() {
  const editingMenu = document.querySelector(".editing");
  editingMenu.style.display = null; // ou .add mais ça ne marche pas
}
function logoutBtn() {
  loginLink.style.display = "none";
  logoutLink.style.display = "null";
}

navAndEdition();
//logoutBtn();
generateWorks(works);
generateFilterButtons(categories);
export { createAppend };
