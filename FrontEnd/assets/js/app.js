function open_modal(modal, page) {
  // recuperer la modal et l'afficher
  document.querySelector(modal).classList.remove("hide");
  // recuperer toutes les pages de la modal et les cacher
  const sel_page = document.querySelector(`${modal} ${page}`);
  const pages = document.querySelectorAll(`${modal} .modal__page`);
  if (sel_page.classList.contains("modal__page"))
    for (const page of pages) page.classList.add("hide");

  // recuperer la page ciblée et l'afficher
  sel_page.classList.remove("hide");
}

function close_modal(modal) {
  // recuperer la modal et la cacher
  const modalElm = document.querySelector(modal);
  modalElm.classList.add("hide");
}

function button_modal(button, modal, page) {
  document
    .querySelector(button)
    .addEventListener("click", () => open_modal(modal, page));
}
function button_close_modal(button, modal) {
  document
    .querySelector(button)
    .addEventListener("click", () => close_modal(modal));
  const pages = document.querySelectorAll(`${modal}>*`);
  for (const page of pages) {
    page.addEventListener("click", (ev) => ev.stopPropagation());
  }
}
button_modal("#edition-modal", "#modal1", ".ajout-project-modal");
button_modal("#previous-page", "#modal1", ".delete-project-modal");
button_modal("#add-pic-modal", "#modal2", ".ajout-project-modal");
button_close_modal("#modal1", "#modal1");
button_close_modal("#modal2", "#modal2");
