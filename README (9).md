# OndeTem — Arquitetura Full Stack

Projeto acadêmico estruturado com **Frontend + Backend/API + Banco de Dados** separados.

## Arquitetura

```text
OndeTem/
├── backend/       # API REST, autenticação, regras de negócio e segurança
├── frontend/      # Interface do usuário, sem acesso direto ao banco
├── database/      # Schema, migrations, seeds e scripts do banco
├── docs/          # documentação técnica e arquitetura
└── README.md
```

## Tecnologias

- Frontend: Vite + JavaScript ES Modules + HTML5 + CSS3
- Backend: Node.js + Express 5
- Banco: SQLite + sql.js (WebAssembly, sem módulos nativos)
- Segurança: Helmet, CORS configurável, rate limit, validação, cookies HttpOnly, hash de senha com scrypt e sessão server-side

## Requisitos

Node.js 20+ e npm 10+.

## Instalação

### 1. Backend

```bash
cd backend
npm install
copy .env.example .env   # Windows
# cp .env.example .env   # Linux/macOS
npm run db:init
npm run dev
```

API: http://localhost:3000

### 2. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

O frontend conversa **somente com a API**. Ele nunca abre o banco diretamente.

## Conta inicial

O seed cria:

- E-mail: `admin@ondetem.local`
- Senha: `TroqueEstaSenha@2026`

Troque a senha após o primeiro acesso.

## Banco

O arquivo é criado em `database/data/ondetem.db`.

As definições estão em:

- `database/migrations/001_initial.sql`
- `database/seeds/001_demo.sql`

## Modelo de dados

Principais entidades:

- usuarios
- sessoes
- lojas
- categorias
- produtos
- produto_imagens
- auditoria

Relacionamentos principais:

- loja 1:N produtos
- categoria 1:N produtos
- usuario 1:N sessoes
- produto 1:N produto_imagens

## API principal

- `GET /api/health`
- `GET /api/lojas`
- `GET /api/categorias`
- `GET /api/produtos`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/lojas` (ADMIN)
- `POST /api/categorias` (ADMIN)
- `POST /api/produtos` (ADMIN/OPERADOR)
- `PATCH /api/produtos/:id` (ADMIN/OPERADOR)
- `DELETE /api/produtos/:id` (ADMIN)

## Segurança

- Senhas nunca são armazenadas em texto puro.
- Sessões usam token aleatório e hash do token no banco.
- Cookie de sessão é `HttpOnly`, `SameSite=Lax` e `Secure` em produção.
- CORS permite somente a origem configurada.
- Helmet adiciona headers de segurança.
- Rate limit reduz abuso da API.
- Dados recebidos são validados antes de chegar ao serviço.
- SQL usa prepared statements.
- Frontend é incapaz de acessar o SQLite diretamente.

## Scripts

Backend:

```bash
npm run check
npm run db:init
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
```
