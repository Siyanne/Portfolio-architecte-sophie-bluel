import { works } from "./works.js";
import { generateWorksFiltrees } from "./main.js";
import { fetchCategories } from "./api.js";
import { postNewWork } from "./api.js";

const imageDisplay = document.querySelector("#display-image");
const img_input = document.querySelector(`#image-input`);
const projetsDiv = document.querySelector(".projets-modal");
const categories = await fetchCategories();
//const newWork = await postNewWork(result);

function selectCategorie(categorie) {
  const clone = document
    .querySelector("#categorieTemplate")
    .content.cloneNode(true);
  clone.querySelector(".optionCategorie").innerText = categorie.name;
  clone
    .querySelector(".optionCategorie")
    .addEventListener("click", () => generateWorksFiltrees(categorie.id));
  document.querySelector("#workCategories").appendChild(clone);
  console.log(categorie);
}
function selectCategories(categories) {
  for (let categorie of categories) selectCategorie(categorie);
}

let uploaded_img = ``;

img_input.addEventListener(`change`, function () {
  const reader = new FileReader();

  reader.addEventListener(`load`, () => {
    uploaded_img = reader.result;
    imageDisplay.style.backgroundImage = `url(${uploaded_img})`;

    if (img_input.value) {
      document.querySelector(`.disappear`).style.opacity = `0`;
      document.querySelector(`.picture`).style.opacity = `0`;
      document.querySelector(`.conseil`).style.opacity = `0`;
    }
  });

  reader.readAsDataURL(this.files[0]);
});

imageDisplay.addEventListener(
  "dragenter",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    imageDisplay.classList.add("active");
  },
  false
);
imageDisplay.addEventListener(
  "dragleave",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    imageDisplay.classList.remove("active");
  },
  false
);
imageDisplay.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    imageDisplay.classList.add("active");
  },
  false
);
imageDisplay.addEventListener(
  "drop",
  (e) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    imageDisplay.classList.remove("active");
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
      document.querySelector(`.disappear`).style.opacity = `0`;
      document.querySelector(`.picture`).style.opacity = `0`;
      document.querySelector(`.conseil`).style.opacity = `0`;
    };
  } else {
    imageDisplay.style.backgroundImage = null;
  }
}
async function postWorkTitlte(ev) {
  ev.preventDefault();
  const body = Object.fromEntries(new FormData(ev.target));
  const result = await postNewWork(body);
  const work = await result.json();
}
selectCategories(categories);
