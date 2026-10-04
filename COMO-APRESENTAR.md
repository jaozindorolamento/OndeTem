# Como apresentar o projeto

> "O sistema foi dividido em três camadas independentes: frontend, backend/API e banco de dados. O frontend nunca acessa o banco diretamente; ele consome endpoints REST do backend. O backend concentra autenticação, autorização, validação e regras de negócio. O banco possui migrations e seeds versionados."

## Demonstração sugerida

1. Iniciar a API.
2. Mostrar `GET /api/health`.
3. Abrir o frontend.
4. Pesquisar produto.
5. Filtrar categoria.
6. Mostrar lojas.
7. Fazer login como administrador.
8. Explicar que a sessão está em cookie HttpOnly.
9. Mostrar `database/migrations/001_initial.sql`.
10. Mostrar o relacionamento loja -> produto -> categoria.

## Diferencial

A arquitetura evita o problema do projeto antigo em que frontend, servidor e banco ficavam misturados. Também evita módulos nativos do SQLite, melhorando a portabilidade entre Windows, Linux e macOS.
