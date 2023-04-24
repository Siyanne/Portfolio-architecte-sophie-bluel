function check() {}

const link = "http://localhost:5678";

export async function apiFetch(method, url, body, options = {}) {
  const headers = { ...options.headers };

  // Gestion de l'authentification
  const token = check();
  if (token) headers.Authorization = `Bearer ${token}`;

  // Gestion du body
  if (body instanceof FormData) {
  } else if (typeof body === "object") {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  console.log(`${method} ${url}`);

  // Appel a fetch
  const response = await fetch(`${link}${url}`, {
    ...options,
    method,
    body,
    headers,
  });

  // Gestion de la réponse
  let data = await response.text();
  try {
    data = JSON.parse(data);
  } catch (error) {}

  console.groupCollapsed(`${method} ${url}`);

  console.log("headers", headers);
  console.log("body", body);
  console.log("response", response);
  console.log("data", data);
  console.groupEnd();

  return data;
}

export const fetchWorks = () => apiFetch("GET", `${link}/api/works`);
export const fetchCategories = () => apiFetch("GET", `${link}/api/categories`);
const projets = await fetchCategories.json();

function generateGalleries(projets) {
  for (let i = 0; i < projets.length; i++) {
    const projet = projets[i];
    const sectionGalleries = document.querySelector(".gallery");
    const galleryElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = projet.title;

    sectionGalleries.appendChild(galleryElement);
    galleryElement.appendChild(imageElement, figcaptionElement);
  }
}

const boutonFiltrees = document.querySelector(".btn-trier-categories");
boutonFiltrees.addEventListener("click", function () {
  const categoriesFiltrees = fetchCategories.filter(function (gallery) {
    return gallery.name;
  });
  document.querySelector(".filtres");
  generateGalleries(categoriesFiltrees);
});
