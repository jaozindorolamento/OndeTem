# Estrutura para apresentação

```text
OndeTem/
│
├── backend/                 # SERVIDOR / API
│   ├── src/
│   │   ├── config/          # conexão e persistência
│   │   ├── middleware/      # autenticação e tratamento de erros
│   │   ├── routes/          # endpoints REST
│   │   ├── services/        # espaço para regras de negócio
│   │   ├── utils/           # segurança e utilitários
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/                # INTERFACE
│   ├── src/
│   │   ├── services/        # cliente HTTP da API
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   └── main.js
│   ├── index.html
│   └── package.json
│
├── database/                # PERSISTÊNCIA
│   ├── migrations/
│   ├── seeds/
│   ├── scripts/
│   ├── data/
│   │   └── ondetem.db
│   └── README.md
│
└── docs/                    # DOCUMENTAÇÃO
```

### Regra de dependência

`Frontend -> API -> Database`.

Nunca `Frontend -> Database`.
