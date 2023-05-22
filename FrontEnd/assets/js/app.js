const openModal = document.querySelector(`#open-modal`);
const closeModal = document.querySelector(`[data-modal-close]`);
const openModalAjout = document.querySelector("#ajout");
const modal = document.getElementById(`modal`);
const ajoutModal = document.getElementById(`ajout-modal`);

openModal.addEventListener(`click`, function () {
  modal.showModal();
});

closeModal.addEventListener(`click`, function () {
  modal.close();
});
openModalAjout.addEventListener(`click`, function () {
  ajoutModal.showModal();
});
