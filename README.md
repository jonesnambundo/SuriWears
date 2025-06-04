# Sunshine Store ☀️🛍️

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?logo=tailwindcss)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.x-764ABC?logo=redux)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

Aplicativo de loja virtual moderno desenvolvido com **React + Vite**, **TypeScript**, **Redux Toolkit**, **Tailwind CSS**, **React Hook Form** e **Zod**.  
Permite busca de produtos, filtragem por categorias, visualização de detalhes, gerenciamento de carrinho e checkout com opções de pagamento via boleto ou cartão de crédito.

🔗 **Deploy na Vercel:**  
👉 [shine-lyart.vercel.app](https://shine-lyart.vercel.app/)

![Home](https://github.com/user-attachments/assets/b57905f6-7c2f-48a6-8751-b83f5ce25a29)

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│ ├── Footer.tsx
│ ├── Header.tsx
│ ├── ProductCard.tsx
│ └── ProductList.tsx
├── pages/
│ ├── Home.tsx
│ ├── ProductDetails.tsx
│ ├── CartPage.tsx
│ └── Checkout.tsx
└── store/
├── CartSlice.ts
└── Store.ts
```

---

## 🔍 Funcionalidades

### 🏠 Home Page
- Header com logotipo, links de navegação, campo de busca e carrinho.
- Lista de categorias disponíveis.
- Cards de produtos com imagem, título, descrição e preço.
- Busca com **autocomplete** por nome ou categoria.
- Filtro por 4 categorias distintas.
- Clicando na imagem ou em "Visualizar Detalhes", o usuário é levado à página de detalhes do produto.

![Categorias e Produtos](https://github.com/user-attachments/assets/55beda07-c204-4056-8d3e-7d3af834e1a7)

---

### 🧾 Página de Detalhes do Produto
- Exibe todas as informações do produto selecionado:
  - Nome, Imagem, Descrição, Preço, Categoria
- Botão para adicionar ao carrinho.
- Botão para voltar a pagina de lista de produtos

![Image](https://github.com/user-attachments/assets/c8a28509-af32-4bd9-9891-8cf27a149221)

---

### 🛒 Carrinho de Compras
- Lista de produtos adicionados com nome, preço e quantidade.
- Permite:
  - Aumentar ou diminuir a quantidade.
  - Remover produtos do carrinho.

![Carrinho](https://github.com/user-attachments/assets/cec393eb-4a7b-4a98-8fcb-f79b8e920d75)

---

### 💳 Checkout
- Resumo do pedido.
- Formulário de validação de pagamento:
  - Ano de validade (2 dígitos).
  - CVV (4 dígitos).
  - Verificação de e-mails iguais.
  - Validação de CPF com **InputMask**.
  - Exibição de mensagens de erro caso alguma validação falhe.

![Checkout](https://github.com/user-attachments/assets/22b6c5ff-65bf-47c7-9db2-f0ff5a4e4634)

---

### ✅ Confirmação de Compra
- Página de agradecimento com:
  - Número do pedido.
  - Forma de pagamento utilizada.

![Confirmação](https://github.com/user-attachments/assets/b5011de7-2045-4d77-9e68-c37836400325)

---

## 🛠️ Tecnologias Utilizadas

- ⚛️ **React + Vite + TypeScript**  
- 🛒 **Redux Toolkit** — Gerenciamento global do estado do carrinho  
- 🎨 **Tailwind CSS** — Estilização moderna, responsiva e mobile-friendly  
- 📋 **React Hook Form + Zod** — Validação e controle de formulários  

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/jonesnambundo/SuriWears.git
cd SuriWears
npm install
# ou
yarn install
npm run dev
