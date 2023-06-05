import { works } from "./works.js";
import { fetchCategories } from "./api.js";
import { postNewWork } from "./api.js";

const imageDisplay = document.querySelector("#display-image");
const img_input = document.querySelector(`#image-input`);
const projetsDiv = document.querySelector(".projets-modal");
const categories = await fetchCategories();
const newWork = await postNewWork();
console.log(newWork);

function selectCategorie(categorie) {
  const clone = document
    .querySelector("#categorieTemplate")
    .content.cloneNode(true);
  clone.querySelector(".optionCategorie").innerText = categorie.name;
  document.querySelector("#workCategories").appendChild(clone);

  console.log(categorie);
}
function selectCategories(categories) {
  selectCategorie({ id: 0, name: "" });
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
/*
const formElm = document.querySelector("form");
const formData = new formData = new FormData(formElm);
const request = new XMLHttpRequest();
request.open("POST", " modalAjouter.js");
formData.append("serialnumber", serialNumber++);
request.send(formData);*/
const addForm = document.querySelector("#saved-form");

addForm.addEventListener("submit", postWorks);

async function postWorks(ev) {
  ev.preventDefault();
  const body = Object.fromEntries(new FormData(ev.target));
  const result = await postNewWork(body);
  console.log(result);
  //const work = await result.json();
}

selectCategories(categories);
