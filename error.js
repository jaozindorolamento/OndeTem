export function notFound(_req, res) { res.status(404).json({error:'Rota não encontrada'}); }
export function errorHandler(err, _req, res, _next) {
  console.error(err);
  res.status(err.statusCode || 500).json({error: process.env.NODE_ENV === 'production' ? 'Erro interno do servidor' : err.message});
}
