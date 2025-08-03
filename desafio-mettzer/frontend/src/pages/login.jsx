import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Login realizado com sucesso!");
      navigate("/news");
    } catch (error) {
      console.error("Erro ao logar:", error);
      toast.error("Erro ao logar. Verifique seu e-mail e senha.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("src/assets/news-background.png")`,
      }}
    >
      <ToastContainer />

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-violet-900">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-violet-900 focus:ring-1 focus:ring-violet-900 transition duration-200"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:border-violet-900 focus:ring-1 focus:ring-violet-900 transition duration-200"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-violet-900 font-bold py-3 rounded-md transition-colors duration-200"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-700">
          Não tem conta?{" "}
          <Link to="/register" className="text-yellow-600 hover:underline font-bold transition-colors duration-200">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}