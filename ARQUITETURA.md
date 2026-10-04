# Arquitetura do OndeTem

## Princípio de separação

```text
[ Navegador ]
      |
      | HTTP/JSON + Cookie HttpOnly
      v
[ FRONTEND ]  :5173
      |
      | REST API
      v
[ BACKEND/API ] :3000
      |
      | camada de dados
      v
[ DATABASE ] SQLite
```

O navegador não acessa arquivos do banco. Toda regra de negócio passa pela API.

## Camadas

### Frontend
Responsável por apresentação, navegação, busca e interação.
Não contém senha de banco, SQL ou regra de autorização.

### Backend/API
Responsável por autenticação, autorização, validação, regras de negócio, respostas HTTP e auditoria.

### Database
Responsável por persistência. SQL de criação fica versionado em migrations; dados de demonstração ficam em seeds.

## Segurança

1. Hash de senha com `scrypt` + salt aleatório.
2. Sessão com token aleatório; somente o hash do token fica no banco.
3. Cookie `HttpOnly` e `SameSite=Lax`.
4. `Secure` ativado em produção.
5. Helmet.
6. CORS restrito à origem do frontend.
7. Rate limit.
8. Validação de entrada com Zod.
9. Prepared statements.
10. Controle de perfil ADMIN/OPERADOR/CLIENTE.

## Por que SQLite + sql.js?

SQLite é simples para um projeto local e acadêmico. `sql.js` usa WebAssembly e evita dependências nativas como `better-sqlite3`, reduzindo problemas entre Windows, Linux e macOS.

Para produção de grande escala, a camada de persistência pode ser substituída por PostgreSQL sem alterar a divisão frontend/API.
