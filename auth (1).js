import { queryOne, execute } from '../config/database.js';
import { sha256 } from '../utils/security.js';

export async function optionalAuth(req, _res, next) {
  try {
    const token = req.cookies?.ondetem_session;
    if (!token) return next();
    const session = await queryOne(`SELECT s.id AS sessao_id, s.expira_em, u.id, u.nome, u.email, u.perfil, u.ativo
      FROM sessoes s JOIN usuarios u ON u.id=s.usuario_id
      WHERE s.token_hash=:hash AND s.expira_em > CURRENT_TIMESTAMP AND u.ativo=1`, {':hash':sha256(token)});
    if (session) {
      req.user = session;
      await execute('UPDATE sessoes SET ultimo_acesso_em=CURRENT_TIMESTAMP WHERE id=:id', {':id':session.sessao_id});
    }
  } catch {}
  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({error:'Autenticação necessária'});
  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({error:'Autenticação necessária'});
    if (!roles.includes(req.user.perfil)) return res.status(403).json({error:'Acesso negado'});
    next();
  };
}
