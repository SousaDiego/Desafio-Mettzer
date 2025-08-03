import { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './components/logoutButton';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from 'lucide-react';

export default function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token não encontrado. Faça login.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/articles/saved', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSavedArticles(response.data); 
      } catch (error) {
        console.error('Erro ao buscar artigos salvos:', error);
      }
    };

    fetchSavedArticles();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado. Faça login.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Artigo removido com sucesso!");
      setSavedArticles((prev) => prev.filter((a) => a.id !== id));

    } catch (error) {
      console.error("Erro ao remover artigo:", error);
      toast.error("Erro ao remover artigo. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <ToastContainer /> 
      <header className="fixed top-0 left-0 w-full flex items-center p-5 bg-violet-900 text-white z-50">
        <div className="flex-1"></div>
        <h1 className="text-2xl">Artigos Salvos</h1>
        <div className="flex-1 flex justify-end gap-4">
          <a
            href="/news"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Voltar
          </a>
          <LogoutButton />
        </div>
      </header>

      <div className="pt-24 m-8">
        {savedArticles.length === 0 ? (
          <p className="text-gray-600 text-center">Você ainda não salvou nenhum artigo.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {savedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-gray-200 p-4 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col justify-between h-full"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                
                <div>
                  <h3 className="text-lg font-bold mb-2 text-violet-900">{article.title}</h3>
                  <p className="text-sm italic mb-2 text-gray-600">{article.source}</p>
                  <p className="text-gray-800">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-700 underline block mt-4"
                  >
                    Ler artigo
                  </a>
                </div>

                <button
                  onClick={() => handleDelete(article.id)}
                  className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl transition duration-200 self-end mt-4"
                >
                  <Trash2 size={16} />
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}