import { fetchLogin } from "./api.js";
import { setToken } from "./auth.js";

const msgError = document.querySelector(".errorMsg");
const loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", loginInfo);

async function loginInfo(ev) {
  ev.preventDefault();
  const body = Object.fromEntries(new FormData(ev.target));
  const result = await fetchLogin(body);

  console.log(result.token);

  if (!result.token) return loginError();
  setToken(result.token);
  redirectToHome();
}

function redirectToHome() {
  document.location.replace("index.html");
}

function loginError() {
  const errorElm = document.createElement("p");
  errorElm.classList.add("msgErreur");
  errorElm.innerText = "Erreur dans l’identifiant ou le mot de passe";

  msgError.appendChild(errorElm);
}
export { redirectToHome };
