const BASE_URL = "https://api.currentsapi.services/v1/search";
const API_KEY = "UzPELL7F1LYoAc-TjDLpWSXb-Fi_ci2Tf_lN2SGwFApowph_"; 
const newsContainer = document.getElementById("newsContainer");
const refreshBtn = document.getElementById("refreshBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");

let currentPage = 1;

// Función genérica de fetch
async function fetchData(url) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  if (!response.ok) throw new Error("Error al obtener noticias");
  return await response.json();
}

// Renderizar noticias
function renderNews(articles) {
  newsContainer.innerHTML = "";
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = "<p>No hay noticias disponibles.</p>";
    return;
  }
  articles.forEach(article => {
    const item = document.createElement("div");
    item.classList.add("news-item");
    item.innerHTML = `
      <h2 onclick="window.open('${article.url}', '_blank')">${article.title}</h2>
      <p>${article.description || "Sin descripción disponible."}</p>
      <small>${article.published}</small>
    `;
    newsContainer.appendChild(item);
  });
}

// Función principal para cargar noticias
async function loadNews(query = "", category = "", page = 1) {
  try {
    newsContainer.innerHTML = "<p>Cargando noticias...</p>";
    let url = `${BASE_URL}?language=es&page_size=5&page=${page}`;
    if (query) url += `&keywords=${encodeURIComponent(query)}`;
    if (category) url += `&category=${category}`;

    const data = await fetchData(url);
    renderNews(data.news);
  } catch (error) {
    newsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Eventos
refreshBtn.addEventListener("click", () => {
  currentPage = 1;
  loadNews(searchInput.value.trim(), categorySelect.value, currentPage);
});

searchBtn.addEventListener("click", () => {
  currentPage = 1;
  loadNews(searchInput.value.trim(), categorySelect.value, currentPage);
});

categorySelect.addEventListener("change", () => {
  currentPage = 1;
  loadNews(searchInput.value.trim(), categorySelect.value, currentPage);
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  loadNews(searchInput.value.trim(), categorySelect.value, currentPage);
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadNews(searchInput.value.trim(), categorySelect.value, currentPage);
  }
});

// Cargar noticias al inicio
loadNews();
