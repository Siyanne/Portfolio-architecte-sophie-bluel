import { fetchCategories } from "./api.js";
import { postNewWork } from "./api.js";
import { createAppend, generateWork } from "./main.js";
import { generateModalWork } from "./modalSupprimer.js";
import { close_modal } from "./app.js";

const imageDisplay = document.querySelector("#display-image");
const img_input = document.querySelector(`#image-input`);
const addForm = document.querySelector("#saved-form");
const disappear = document.querySelector(".disappear");
const error = document.querySelector("#error");

const categories = await fetchCategories();

let uploaded_img = ``;
/**fonction permettant de selectionner une catégorie*/
function selectCategorie(categorie) {
  const clone = document
    .querySelector("#categorieTemplate")
    .content.cloneNode(true);
  const options = clone.querySelector(".optionCategorie");
  options.innerText = categorie.name;
  options.value = categorie.id;
  document.querySelector("#workCategories").appendChild(clone);
}
function selectCategories(categories) {
  selectCategorie({ id: "", name: "" });
  for (let categorie of categories) selectCategorie(categorie);
}

/**code permettant le téléchargementd'un fichier*/
img_input.addEventListener(`change`, function () {
  const reader = new FileReader();

  reader.addEventListener(`load`, () => {
    uploaded_img = reader.result;
    imageDisplay.style.backgroundImage = `url(${uploaded_img})`;

    if (img_input.value) {
      disappear.style.opacity = `0`;
    }
  });

  reader.readAsDataURL(this.files[0]);
});

/**code permettant le drag&drop*/
function activeOn(e) {
  e.preventDefault();
  e.stopPropagation();
  imageDisplay.classList.add("active");
}
function activeOff(e) {
  e.preventDefault();
  e.stopPropagation();
  imageDisplay.classList.remove("active");
}

imageDisplay.addEventListener(
  "dragenter",
  (e) => {
    activeOn(e);
  },
  false
);
imageDisplay.addEventListener(
  "dragleave",
  (e) => {
    activeOff(e);
  },
  false
);
imageDisplay.addEventListener(
  "dragover",
  (e) => {
    activeOn(e);
  },
  false
);
imageDisplay.addEventListener(
  "drop",
  (e) => {
    activeOff(e);
    if (e.dataTransfer.files.length) {
      img_input.files = e.dataTransfer.files;
      updateThumbnail(imageDisplay, e.dataTransfer.files[0]);
    }
  },
  false
);
function updateThumbnail(imageDisplay, file) {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      imageDisplay.style.backgroundImage = `url('${reader.result}')`;
      disappear.style.opacity = `0`;
    };
  } else {
    imageDisplay.style.backgroundImage = null;
  }
}
/**fin drap&drop*/
/** Ajout des fichiers dans l'api, modal supprimer et sur l'affichage*/

addForm.addEventListener("submit", postWorks);

let errorMsgShown = false;

async function postWorks(ev) {
  ev.preventDefault();
  const body = new FormData(ev.target);
  if (body.get("category") === "") return;
  console.log(ev.target);
  const result = await postNewWork(body);
  if (!result.id) {
    if (!errorMsgShown) {
      const msgError = createAppend(error, "p");

      msgError.classList.add("msgErrorP");
      msgError.innerHTML = "";
      msgError.innerText = "Erreur, impossible d'ajouter le projet";

      errorMsgShown = true;
    }

    return;
  }
  console.log(result);
  generateWork(result);
  generateModalWork(result);
  close_modal("#modal1");
}

selectCategories(categories);
