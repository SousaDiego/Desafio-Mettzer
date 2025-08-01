import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "./components/logoutButton";
import SearchButton from "./components/searchButton";

export default function News() {
  const [news, setNews] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.warn("Nenhum token encontrado. Faça login primeiro.");
    }
    fetchNews();
  }, []);

  const fetchNews = (query = "technology") => {
    axios
      .get("http://localhost:8000/api/noticias", {
        params: { q: query },
      })
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar notícias:", error);
      });
  };

  const handleSave = async (article) => {
    if (!token) {
      console.error("Token não encontrado. Faça login.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/articles/save",
        {
          title: article.title,
          url: article.url,
          source: article.source?.name || "Unknown",
          description: article.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Artigo salvo com sucesso!");
      alert("Artigo salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar artigo:", error.response?.data || error);
      alert("Erro ao salvar artigo. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-5 items-center mb-8 mt-8 p-5 bg-violet-900 text-white">
        {/* Esquerda vazia (coluna 1) para alinhar centro */}
        <div>
          <SearchButton onSearch={fetchNews} /></div>

        {/* Título central (colunas 2-4) */}
        <div className="col-span-3 text-center">
          <h1 className="text-2xl font-bold text-white">Notícias</h1>
        </div>

        {/* Controles à direita (coluna 5) */}
        <div className="flex gap-4 justify-end">
          <a
            href="/savedArticles"
            className="bg-violet-700 hover:bg-violet-800 px-3 py-2 rounded text-sm"
          >
            Artigos Salvos
          </a>
          <LogoutButton />
        </div>
      </div>


      <div className="m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 flex flex-col"
          >
            {item.urlToImage && (
              <img
                src={item.urlToImage}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-bold text-violet-900 mb-2">
                {item.title}
              </h2>
              <span className="italic text-xs text-gray-500 mb-2">
                {item.author}
              </span>
              <p className="text-sm text-gray-700 flex-1">{item.description}</p>

              <button
                onClick={() => handleSave(item)}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-violet-900 font-bold px-4 py-2 rounded transition duration-200"
              >
                Salvar Artigo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
