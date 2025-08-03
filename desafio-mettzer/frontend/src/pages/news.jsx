import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "./components/logoutButton";
import SearchButton from "./components/searchButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bookmark } from 'lucide-react'; 
export default function News() {
  const [news, setNews] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.warn("Nenhum token encontrado. Faça login primeiro.");
      toast.warning("Você não está logado. Faça login para salvar artigos!");
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
        toast.error("Erro ao buscar notícias!");
      });
  };

  const handleSave = async (article) => {
    if (!token) {
      console.error("Token não encontrado. Faça login!");
      toast.error("Token não encontrado. Faça login!");
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
      toast.success("Artigo salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar artigo:", error.response?.data || error);
      toast.error("Erro ao salvar artigo. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      <header className="fixed top-0 left-0 w-full flex items-center p-5 bg-violet-900 text-white z-50">
        <div className="flex-1">
          <SearchButton onSearch={fetchNews} />
        </div>
        <h1 className="text-2xl font-bold">Notícias</h1>
        <div className="flex-1 flex justify-end gap-4">
          <a
            href="/savedArticles"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Artigos Salvos
          </a>
          <LogoutButton />
        </div>
      </header>

      <div className="pt-24 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
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
              <span className="italic text-xs text-gray-500 mb-2">{item.author}</span>
              <p className="text-sm text-gray-700 flex-1">{item.description}</p>

              <button
                onClick={() => handleSave(item)}
                className="mt-4 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-violet-900 font-bold px-4 py-2 rounded transition-colors duration-200"
              >
                <Bookmark size={16} /> 
                Salvar Artigo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}