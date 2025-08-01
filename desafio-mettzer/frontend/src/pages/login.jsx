import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/news");
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-opacity-25 bg-cover bg-center"
      style={{
        backgroundImage: `url("src/assets/news-background.png")`, // ajuste o caminho para onde você salvou a imagem
      }}
    >
      <div className="bg-white bg-opacity-25 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-violet-900">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-6"
          />
          <button
            type="submit"
            className="w-full bg-violet-900 hover:bg-violet-800 text-white py-3 rounded"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Não tem conta?{" "}
          <Link to="/register" className="text-violet-900 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
