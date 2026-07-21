const API_URL = "https://gnews.io/api/v4/top-headlines?token=40ad0da34aaed04884fd41e341e16af1&lang=es&country=mx";
const newsContainer = document.getElementById("newsContainer");
const refreshBtn = document.getElementById("refreshBtn");

// Función para cargar noticias
async function loadNews() {
  try {
    newsContainer.innerHTML = "<p>Cargando noticias...</p>";
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener noticias");

    const data = await response.json();
    newsContainer.innerHTML = "";

    if (data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No hay noticias disponibles.</p>";
      return;
    }

    data.articles.forEach(article => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");

      newsItem.innerHTML = `
        <h2 onclick="window.open('${article.url}', '_blank')">${article.title}</h2>
        <p>${article.description || "Sin descripción disponible."}</p>
      `;

      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    newsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Evento para refrescar noticias
refreshBtn.addEventListener("click", loadNews);

// Cargar noticias al inicio
loadNews();
