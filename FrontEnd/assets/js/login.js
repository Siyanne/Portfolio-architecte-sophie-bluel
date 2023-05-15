import { fetchLogin } from "./api.js";

console.log("helllo");

//import { createAppend } from "./main.js";
const emailInput = document.querySelector(".email");
const pswInput = document.querySelector(".password");
const logInBtn = document.querySelector(".connexion");
const logoutLink = document.querySelector(".logout--link");
const loginLink = document.querySelector(".login--link");
const msgError = document.querySelector(".errorMsg");
const loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", loginInfo);

async function loginInfo(ev) {
  ev.preventDefault();
  const body = Object.fromEntries(new FormData(ev.target));
  const result = await fetchLogin(body);

  console.log(result.token);

  if (!result.token) return loginError();
  window.localStorage.setItem("token", result.token);
  redirectToHome();
  // navEdition();
}

function redirectToHome() {
  document.location.replace("index.html");
}

/*
function logoutBtn() {
  loginLink.style.display === "none";
  logoutLink.style.display === "flex";
}*/

function loginError() {
  const errorElm = document.createElement("p");
  errorElm.classList.add("msgErreur");
  errorElm.innerText = "Erreur dans l’identifiant ou le mot de passe";
  msgError.appendChild(errorElm);
}
export { redirectToHome };
