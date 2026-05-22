# 🛒 byList — Frontend

Aplicação web de lista de compras com gerenciamento de itens e perfil de usuário.

---

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## ✨ Funcionalidades

- ✅ Adicionar itens à lista
- ✏️ Editar itens existentes
- 🗑️ Excluir itens da lista
- 👤 Alterar nome de usuário
- 🔒 Alterar senha do usuário
- ❌ Deletar conta do usuário

---

## 📦 Instalação

### Pré-requisitos

- Node.js `>= 18`
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/WeslleyFelixAlmeida/byListFront.git

# Acesse o diretório
cd byListFront

# Instale as dependências
npm install
# ou
yarn install
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as variáveis necessárias:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

> Ajuste a URL conforme o endereço da [byListApi](https://github.com/WeslleyFelixAlmeida/byListApi).

---

## ▶️ Rodando o projeto

```bash
# Modo de desenvolvimento
npm run dev
# ou
yarn dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

```bash
# Build para produção
npm run build
npm start
```

---

## 📁 Estrutura do Projeto

```
byListFront/
├── app/               # Rotas e páginas (App Router do Next.js)
├── components/        # Componentes reutilizáveis
├── public/            # Arquivos estáticos
├── styles/            # Estilos globais
├── .env.local         # Variáveis de ambiente (não versionado)
└── tailwind.config.js # Configuração do Tailwind CSS
```

---

## 🔗 Backend

Este projeto consome a API [byListApi](https://github.com/WeslleyFelixAlmeida/byListApi). Certifique-se de que ela está em execução antes de iniciar o frontend.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
