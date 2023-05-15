let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];

const openModal = function (e) {
  e.preventDefault();
  const modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal, true");
  modal.addEventListener("click", closeModal);
  modal
    .querySelector(".edition-js-modal-close")
    .addEventListener("click", closeModal);
  modal
    .querySelector(".edition-js-modal-stop")
    .addEventListener("click", stopPropagation);
};
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".edition-js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".edition-js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const focusInModal = function (e) {
  e.preventDefault();
  //console.log(focusables);
};
document.querySelectorAll(".edition-js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

const stopPropagation = function (e) {
  e.stopPropagation();
};
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});
if (e.key === "tab" && modal !== null) {
  focusInModal(e);
}
