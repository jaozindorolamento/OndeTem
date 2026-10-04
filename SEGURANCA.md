# Checklist de Segurança

- [x] Helmet para headers HTTP
- [x] CORS com origem configurável
- [x] Rate limit global
- [x] Validação de payloads
- [x] Senha com scrypt e salt aleatório
- [x] Sessão server-side
- [x] Token de sessão armazenado somente como SHA-256
- [x] Cookie HttpOnly
- [x] SameSite=Lax
- [x] Secure em produção
- [x] Controle de acesso por perfil
- [x] Prepared statements
- [x] Limite de tamanho do JSON
- [x] Frontend sem acesso direto ao banco
- [x] Segredos fora do código via `.env`

## Observação acadêmica

A segurança acima é apropriada para uma aplicação acadêmica/local e cria uma boa base. Em produção real ainda devem ser adicionados HTTPS obrigatório, gestão de segredos, observabilidade, backup externo, CSRF conforme estratégia de autenticação, política de senhas e revisão de dependências.
