const BASE_URL = "https://api.currentsapi.services/v1/latest-news?language=es&page_size=5";
const API_KEY = "UzPELL7F1LYoAc-TjDLpWSXb-Fi_ci2Tf_lN2SGwFApowph_"; // reemplaza con tu clave real
const newsContainer = document.getElementById("newsContainer");
const refreshBtn = document.getElementById("refreshBtn");

async function loadNews() {
  try {
    newsContainer.innerHTML = "<p>Cargando noticias...</p>";
    const response = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    if (!response.ok) throw new Error("Error al obtener noticias");

    const data = await response.json();
    newsContainer.innerHTML = "";

    if (!data.news || data.news.length === 0) {
      newsContainer.innerHTML = "<p>No hay noticias disponibles.</p>";
      return;
    }

    data.news.forEach(article => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");

      newsItem.innerHTML = `
        <h2 onclick="window.open('${article.url}', '_blank')">${article.title}</h2>
        <p>${article.description || "Sin descripción disponible."}</p>
        <small>${article.published}</small>
      `;

      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    newsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

refreshBtn.addEventListener("click", loadNews);
loadNews();
