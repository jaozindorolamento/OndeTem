import { Router } from 'express';
import { z } from 'zod';
import { execute, queryOne } from '../config/database.js';
import { addDays, hashPassword, randomToken, sha256, verifyPassword } from '../utils/security.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const credentials = z.object({email:z.string().email().max(160), senha:z.string().min(8).max(100)});
const registerSchema = credentials.extend({nome:z.string().trim().min(2).max(100)});
const cookieOptions = () => ({httpOnly:true, sameSite:'lax', secure:process.env.NODE_ENV==='production', maxAge:Number(process.env.SESSION_DAYS||7)*86400000, path:'/'});

router.post('/register', async (req,res,next)=>{try{
  const data=registerSchema.parse(req.body); const existing=await queryOne('SELECT id FROM usuarios WHERE email=:email',{':email':data.email});
  if(existing) return res.status(409).json({error:'E-mail já cadastrado'});
  await execute('INSERT INTO usuarios(nome,email,senha_hash,perfil) VALUES(:nome,:email,:hash,\'CLIENTE\')',{':nome':data.nome,':email':data.email,':hash':hashPassword(data.senha)});
  res.status(201).json({message:'Usuário criado com sucesso'});
}catch(e){next(e)}});

router.post('/login', async (req,res,next)=>{try{
  const data=credentials.parse(req.body); const user=await queryOne('SELECT * FROM usuarios WHERE email=:email',{':email':data.email});
  if(!user || !user.ativo || !verifyPassword(data.senha,user.senha_hash)) return res.status(401).json({error:'Credenciais inválidas'});
  const token=randomToken(); await execute('INSERT INTO sessoes(usuario_id,token_hash,expira_em) VALUES(:uid,:hash,:exp)',{':uid':user.id,':hash':sha256(token),':exp':addDays(Number(process.env.SESSION_DAYS||7))});
  res.cookie('ondetem_session',token,cookieOptions()).json({user:{id:user.id,nome:user.nome,email:user.email,perfil:user.perfil}});
}catch(e){next(e)}});

router.post('/logout', requireAuth, async (req,res,next)=>{try{const token=req.cookies?.ondetem_session;if(token) await execute('DELETE FROM sessoes WHERE token_hash=:hash',{':hash':sha256(token)});res.clearCookie('ondetem_session',{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/'}).json({message:'Sessão encerrada'});}catch(e){next(e)}});
router.get('/me', requireAuth, (req,res)=>res.json({user:{id:req.user.id,nome:req.user.nome,email:req.user.email,perfil:req.user.perfil}}));
export default router;
