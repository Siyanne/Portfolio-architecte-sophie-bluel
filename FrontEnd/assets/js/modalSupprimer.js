import { fetchDeleteWorks } from "./api.js";
import { works } from "./works.js";
/** elle permet d'afficher un seul projet dans la modal qui sert à supprimer   */
export function generateModalWork(work) {
  const clone = document
    .querySelector("#galleries-modal")
    .content.cloneNode(true);
  clone.querySelector(".titreProjet").innerText = "editer";
  clone.querySelector(".img-projet").src = work.imageUrl;

  const projet = clone.querySelector(".modal-projet");
  clone.querySelector(".trashBtn").addEventListener("click", async () => {
    await fetchDeleteWorks(work.id);

    projet.remove();
    document.querySelector(`.gallery figure[data-id="${work.id}"]`).remove();
  });
  const projetsDiv = document.querySelector(".projets-modal");
  projetsDiv.appendChild(clone);
}
/** elle permet d'afficher tous les projets dans la modal qui sert à supprimer */
function generateModalWorks(works) {
  for (let work of works) generateModalWork(work);
}

generateModalWorks(works);
