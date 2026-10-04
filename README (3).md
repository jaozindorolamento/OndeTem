# Banco de dados

O banco é SQLite e fica em `data/ondetem.db` depois da inicialização.

A estrutura é criada pela migration SQL e os dados demonstrativos pelo seed.

Para reinicializar em desenvolvimento, apague `data/ondetem.db` e rode `npm run db:init` no backend.
