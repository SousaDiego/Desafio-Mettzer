# Desafio Técnico — Desenvolvedor Júnior

## 📌 Descrição do Projeto

Este projeto foi desenvolvido como parte do processo seletivo para vaga de **Desenvolvedor Júnior**.  
O objetivo principal foi demonstrar habilidades práticas de:

- Autenticação de usuários (registro, login e logout);
- Consumo de **API externa** que fornece dados em **JSON**;
- Criação de interfaces simples, responsivas e funcionais;
- Aplicação de design **MVC** (Laravel + React);
- Persistência de dados em banco relacional (MySQL);
- Organização do código de forma **clara, manutenível e versionada** com **Git**.

## ⚙️ Tecnologias Utilizadas

- **Backend:** PHP + Laravel 
- **Frontend:** React + Vite + TailwindCSS
- **Banco de Dados:** MySQL
- **Autenticação:** Laravel Sanctum (API Tokens)
- **API Externa:** [NewsAPI.org](https://newsapi.org/)

---

## 🎯 Por que PHP + React?

O desafio original solicitava **Ruby on Rails**. Porém, refleti sobre a proposta e decidi que implementar a solução utilizando tecnologias que me sinto mais seguro seria uma boa forma de demonstrar interesse, proatividade e comprometimento com a qualidade da entrega.

Para garantir o **primor da entrega** dentro do prazo proposto, trabalhei com as ferramentas listadas anteriormente garantindo assim um código funcional, limpo e dentro das **boas práticas de API RESTful**.

Reforço minha **disponibilidade e interesse em aprender sobre Ruby on Rails** com rapidez e dedicação.

---

## 🚀 Funcionalidades

- ✅ Registro e Login de usuários;
- ✅ Geração de **Token JWT** para autenticação via API;
- ✅ Busca de notícias em tempo real;
- ✅ Filtro por palavra-chave;
- ✅ Salvamento de artigos favoritos (persistência no banco);
- ✅ Listagem de artigos salvos para leitura posterior;
- ✅ Botão para **logout**;
- ✅ Interface responsiva com **TailwindCSS**.

---

## 🌐 Link para API Externa

Para busca de notícias, utilizei a **[NewsAPI](https://newsapi.org/)**.

---

## 💻 Como executar localmente

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/sousa-diego/desafio-mettzer.git
cd desafio-mettzer
```

### 2️⃣ Backend (Laravel)

# Instalar dependências
composer install

# Copiar arquivo .env
cp .env.example .env

# Gerar chave da aplicação
php artisan key:generate

# Configurar .env com suas credenciais do banco de dados e NewsAPI Key

# Rodar migrações
php artisan migrate

# Rodar servidor
php artisan serve

### 3️⃣ Frontend (React)

# Instalar dependências
npm install

# Rodar aplicação React
npm run dev


