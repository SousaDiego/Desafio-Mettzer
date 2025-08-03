import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import News from './pages/news.jsx';
import SavedArticles from './pages/savedArticles.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  <ToastContainer/>
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
          <Route path="/news" element={<News />}/>
          <Route path="/savedArticles" element={<SavedArticles />}/>
      </Routes>
    </Router>
    
  );
}
export default App;