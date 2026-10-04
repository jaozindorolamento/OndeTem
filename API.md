# API REST

Base: `/api`

| Método | Endpoint | Acesso |
|---|---|---|
| GET | /health | público |
| POST | /auth/register | público |
| POST | /auth/login | público |
| POST | /auth/logout | autenticado |
| GET | /auth/me | autenticado |
| GET | /categorias | público |
| POST | /categorias | ADMIN |
| GET | /lojas | público |
| POST | /lojas | ADMIN |
| GET | /produtos | público |
| POST | /produtos | ADMIN/OPERADOR |
| PATCH | /produtos/:id | ADMIN/OPERADOR |
| DELETE | /produtos/:id | ADMIN |
