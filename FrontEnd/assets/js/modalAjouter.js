import { works } from "./works.js";
import { fetchCategories } from "./api.js";
const projetsDiv = document.querySelector(".projets-modal");
const categories = await fetchCategories();
function selectCategoriesModal(categorie) {
  const selectCategories = document.querySelector("#workCategories");
  selectCategories.addEventListener("click", (categorie) => {
    for (let categorie of categories) {
      selectCategories.innerText = categorie.name;
    }
  });
}

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
      document.querySelector(`.disappear`).style.opacity = `0`;
      document.querySelector(`.picture`).style.opacity = `0`;
      document.querySelector(`.conseil`).style.opacity = `0`;
    }
  });

  reader.readAsDataURL(this.files[0]);
});
document.querySelectorAll(".drop-zone-input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");
  dropZoneElement.classList.add("drop-zone-over");
});

async function postWorkTitlte(ev) {
  ev.preventDefault();
  const body = Object.fromEntries(new FormData(ev.target));
  const result = await postNewWork(body);
  const work = await result.json();
}
selectCategoriesModal(categories);
