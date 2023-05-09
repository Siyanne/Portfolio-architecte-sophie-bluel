console.log("helllo");
//import { createAppend } from "./main.js";
const emailInput = document.querySelector(".email");
const pswInput = document.querySelector(".password");
const logInBtn = document.querySelector(".connexion");
const logoutLink = document.querySelector(".logout--link");
const loginLink = document.querySelector(".login--link");

async function fetchLogin() {
  const userInfo = {
    email: emailInput.value,
    password: pswInput.value,
  };
  console.log(userInfo);
  const reponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userInfo),
  });
  const result = await reponse.json(); // problème au niveau du result
  window.localStorage.setItem("admin", JSON.parse(result));
  console.log(result);
  const error = false;
  if (result == true) {
    window.sessionStorage.setItem("connected", true);
    adminConnected();
    navEdition();
  } else {
    loginError();
  }
}
function toLogIn() {
  logInBtn.addEventListener("click", () => fetchLogin());
}
function adminConnected() {
  console.log("ça marche");
  document.location.replace("index.html");
  /*logoutBtn();
  navEdition();*/
}

function navEdition() {
  const editingMenu = document.querySelector(".editing");
  editingMenu.classList.toggle("displayEdit");
}
/*function logoutBtn() {
  loginLink.style.display === "none";
  logoutLink.style.display === "block";
}*/
const msgError = document.querySelector(".errorMsg");

function loginError() {
  const errorElm = document.createElement("p");
  errorElm.classList.add("msgErreur");
  errorElm.innerText = "Erreur dans l’identifiant ou le mot de passe";
  msgError.appendChild(errorElm);
}
/*import { fetchLogin } from "./api.js";
import { createAppend } from "./main.js";*/
/*console.log(fetchLogin);
console.log("hello");
const login = await fetchLogin();
console.log(login);
const logInBtn = document.querySelector(".connexion");
const email = document.querySelector(".email");
const psw = document.querySelector(`.password`);
const msgError = document.querySelector(".errorMsg");
const loginMenu = document.querySelector(".login--link");
const logout = document.querySelector(".logout--link");
const errorElm = createAppend(msgError, ".errorMsg");
const editingMenu = document.querySelector(".editing");
const userInfo = { email: email.value, password: psw.value };
logInBtn.addEventListener("click", function () {
  trTogIn();
});
console.log(userInfo);
console.log(login);
async function logInStorage() {
  window.localStorage.setItem("admin", JSON.stringify(login));
  console.log(login);

  const error = false;

  if (login === true) {
    window.localStorage.setItem("connected", true);
    adminConnected();
  } else {
    loginError();
  }
}
function tryToLogIn() {
  if (userInfo.email === login.email && userInfo.password === login.password) {
    adminConnected();
  } else {
    errorElm.innerText = "“Erreur dans l’identifiant ou le mot de passe";
  }
}
function adminConnected() {
  document.location.replace("index.html");
  logoutBtn();
  navEdition();
}

function navEdition() {
  editingMenu.style.display = "block";
}
function logoutBtn() {
  login.style.display = "none";
  logout.style.display = "block";
}
/*function logout() {
  const logoutLink = document.querySelector(".logout--link");
  logoutLink.addEventListener("click", function () {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace("index.html");
  });
}*/
/*logInStorage();
tryToLogIn()*/
//loginError();
toLogIn();
adminConnected();
navEdition();
