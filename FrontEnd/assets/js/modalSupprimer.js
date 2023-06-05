import { fetchDeleteWorks } from "./api.js";
import { works } from "./works.js";
const projetsDiv = document.querySelector(".projets-modal");

function generateModalWork(work) {
  console.log("generateModalWork", work);
  const clone = document
    .querySelector("#galleries-modal")
    .content.cloneNode(true);
  clone.querySelector(".titreProjet").innerText = "editer";
  clone.querySelector(".img-projet").src = work.imageUrl;
  const removePhotoBtn = document.querySelector("#remove-photo");
  removePhotoBtn.addEventListener("click", function () {
    cloneTrashBtn.style.display = "flex";
  });

  const projet = clone.querySelector(".modal-projet");
  const cloneTrashBtn = clone.querySelector(".trashBtn");
  cloneTrashBtn.addEventListener("click", async () => {
    await fetchDeleteWorks(work.id);

    projet.remove();
  });

  projetsDiv.appendChild(clone);
}
function generateModalWorks(works) {
  for (let work of works) generateModalWork(work);
}

generateModalWorks(works);
