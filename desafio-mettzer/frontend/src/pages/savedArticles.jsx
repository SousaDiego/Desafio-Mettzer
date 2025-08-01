import { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './components/logoutButton';

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

  return (
    <div>
      
      <div className="flex items-center justify-between mb-8 mt-8 p-5 bg-violet-900 text-white">
        <h1 className="text-2xl flex-1 text-center">Artigos Salvos</h1>
        <div className="flex gap-4">
          <a
            href="/news"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
          >
            Voltar
          </a>
          <LogoutButton />
        </div>
      </div>


      <div className="m-8">
        {savedArticles.length === 0 ? (
          <p className="text-gray-600 text-center">Você ainda não salvou nenhum artigo.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {savedArticles.map((article) => (
                
              <div key={article.id} className="border border-gray-200 p-4 rounded shadow hover:shadow-lg transition">
                

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
