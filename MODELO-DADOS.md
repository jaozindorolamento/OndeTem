# Modelo de Dados

- **usuarios**: identidade e perfil de acesso.
- **sessoes**: sessões autenticadas dos usuários.
- **lojas**: estabelecimentos cadastrados.
- **categorias**: classificação dos produtos.
- **produtos**: catálogo, preço e estoque.
- **produto_imagens**: URLs das imagens dos produtos.
- **auditoria**: trilha de ações administrativas.

Relacionamentos:

```text
usuarios 1 ─── N sessoes
lojas    1 ─── N produtos
categorias 1 ─ N produtos
produtos 1 ─── N produto_imagens
usuarios 1 ─── N auditoria
```
