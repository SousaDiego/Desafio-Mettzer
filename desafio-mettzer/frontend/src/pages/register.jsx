import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("src/assets/news-background.png")`,
      }}
    >
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow">
          Registro
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-white/50 rounded mb-4 bg-transparent text-white placeholder-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-white/50 rounded mb-4 bg-transparent text-white placeholder-white"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-white/50 rounded mb-6 bg-transparent text-white placeholder-white"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white">
          Já tem conta?{" "}
          <Link to="/" className="text-yellow-300 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
