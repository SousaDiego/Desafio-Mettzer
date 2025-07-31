import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/noticias')
      .then(response => {
        setNews(response.data); 
      })
      .catch(error => {
        console.error('Erro ao buscar notícias:', error);
      });
  }, []);

  return (
    <div>
      <div className='flex justify-center mb-8 mt-8 p-5 bg-violet-900 text-white'> <h1 className='text-2xl'>Notícias</h1> <a href='/login'> Login </a> </div>
      
      <div className='m-8 grid-cols-3 grid gap-8'>
        {news.map((item, index) => (
          <div className='mb-8' key={index}>

            <img
                src={item.urlToImage}
                alt={item.title}
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />

              <h1 className='text-lg font-bold'>{item.title}</h1>
                  <spam className='italic text-sm m-5 grid'> {item.author} </spam> 
                  <li>{item.description}</li> 
          </div> 
        ))}
      </div>
    </div>
  );
}

export default Home;
