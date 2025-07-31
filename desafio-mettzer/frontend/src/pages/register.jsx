import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow rounded">
        <h2 className="text-3xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
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
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Já tem conta?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
