import { fetchDeleteWorks } from "./api.js";

const projetsDiv = document.querySelector(".projets-modal");
function generateModalWork(work) {
  const clone = document
    .querySelector("#galleries-modal")
    .content.cloneNode(true);
  clone.querySelector(".titreProjet").innerText = "editer";
  clone.querySelector(".img-projet").src = work.imageUrl;

  // ajout des parenthèses autour de la fonction fléchée
  clone.querySelector(".trashBtn").addEventListener("click", async () => {
    const deleteWorks = await fetchDeleteWorks(work.id);
    console.log(deleteWorks);
    removeModalWork();
    console.log(deleteWorks.status);
  });

  //generateWorks(work);

  projetsDiv.appendChild(clone);
  //console.log(work);
}

const trashBtn = document.querySelector(".trashBtn");
const figureElement = document.querySelector(".modal-projet");

function removeModalWork() {
  if (deleteWorks.id && deleteWorks.status === 200) {
    const parentElement = figureElement.parentNode;
    parentElement.removeChild(figureElement);
  }
}
/*trashBtn.addEventListener("click", () => {
    removeModalWork;
    console.log(deleteWorks.status);
  });*/
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
//generateModalWork(works);

const img_input = document.querySelector(`#image-input`);
let uploaded_img = ``;

img_input.addEventListener(`change`, function () {
  const reader = new FileReader();

  reader.addEventListener(`load`, () => {
    uploaded_img = reader.result;
    document.querySelector(
      `#display-image`
    ).style.backgroundImage = `url(${uploaded_img})`;

    if (img_input.value) {
      document.querySelector(`.disappear`).style.display = `none`;
      document.querySelector(`.picture`).style.display = `none`;
      document.querySelector(`.conseil`).style.display = `none`;
    }
  });

  reader.readAsDataURL(this.files[0]);
});
