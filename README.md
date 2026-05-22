# 🛒 byList — API

API RESTful da aplicação byList, uma lista de compras com autenticação via refresh token.

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Redis](https://redis.io/)

---

## 🏗️ Arquitetura

A aplicação segue uma arquitetura em camadas, garantindo separação de responsabilidades e fácil manutenção:

```
Routes → Middlewares → Controllers → Services → Repositories
```

| Camada          | Responsabilidade                                                      |
|-----------------|-----------------------------------------------------------------------|
| **Routes**      | Definição dos endpoints e agrupamento de rotas                        |
| **Middlewares** | Validações, autenticação e tratamento de erros antes dos controllers  |
| **Controllers** | Recebe as requisições HTTP, chama os serviços e retorna as respostas  |
| **Services**    | Contém as regras de negócio da aplicação                              |
| **Repositories**| Acesso e manipulação dos dados via Prisma ORM                        |

### Diretórios auxiliares

| Diretório      | Descrição                                                         |
|----------------|-------------------------------------------------------------------|
| **DTOs**       | Objetos de transferência de dados entre as camadas                |
| **Models**     | Tipagens e modelos de domínio da aplicação                        |
| **Exceptions** | Classes de erros customizados utilizados nas camadas de serviço   |

---

## 🔐 Autenticação

A autenticação é implementada com a estratégia de **Refresh Token**:

- O login retorna um `access_token` (curta duração) e um `refresh_token` (longa duração).
- O `access_token` é usado para autenticar as requisições protegidas.
- Quando o `access_token` expira, o cliente usa o `refresh_token` para obter um novo par de tokens.
- Os refresh tokens são armazenados e gerenciados via **Redis**, garantindo invalidação eficiente e performance.

---

## 📦 Instalação

### Pré-requisitos

- Node.js `>= 18`
- npm ou yarn
- PostgreSQL (ou outro banco suportado pelo Prisma)
- Redis

### Passos

```bash
# Clone o repositório
git clone https://github.com/WeslleyFelixAlmeida/byListApi.git

# Acesse o diretório
cd byListApi

# Instale as dependências
npm install
# ou
yarn install
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de dados (Prisma)
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bylist"

# JWT
JWT_SECRET=seu_secret_aqui
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=seu_refresh_secret_aqui
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Servidor
PORT=3333
```

---

## 🗄️ Banco de Dados

```bash
# Rodar as migrations
npx prisma migrate dev

# Visualizar o banco com Prisma Studio (opcional)
npx prisma studio
```

---

## ▶️ Rodando o projeto

```bash
# Modo de desenvolvimento
npm run dev
# ou
yarn dev
```

A API estará disponível em: [http://localhost:3333](http://localhost:3333)

```bash
# Build para produção
npm run build
npm start
```

---

## 📁 Estrutura do Projeto

```
byListApi/
├── src/
│   ├── routes/          # Definição das rotas da API
│   ├── middlewares/     # Middlewares de autenticação e validação
│   ├── controllers/     # Handlers das requisições HTTP
│   ├── services/        # Regras de negócio
│   ├── repositories/    # Acesso ao banco via Prisma
│   ├── dtos/            # Objetos de transferência de dados
│   ├── models/          # Tipagens e modelos de domínio
│   └── exceptions/      # Erros customizados
├── prisma/
│   ├── schema.prisma    # Schema do banco de dados
│   └── migrations/      # Histórico de migrations
├── .env                 # Variáveis de ambiente (não versionado)
└── tsconfig.json        # Configuração do TypeScript
```

---

## 🔗 Frontend

Este projeto é consumido pelo [byListFront](https://github.com/WeslleyFelixAlmeida/byListFront).

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
