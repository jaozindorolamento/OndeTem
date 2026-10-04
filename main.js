import './styles/main.css';
import {api} from './services/api.js';

const app=document.querySelector('#app');
let state={products:[],categories:[],stores:[],user:null};
const money=v=>(Number(v)/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

async function load(){
  const [p,c,s]=await Promise.all([api.products(),api.categories(),api.stores()]);state.products=p.data;state.categories=c.data;state.stores=s.data;
  try{state.user=(await api.me()).user}catch{}
  render();
}
function render(){app.innerHTML=`<header class="top"><div class="wrap nav"><a class="brand" href="#">OndeTem<span>.</span></a><nav><a href="#produtos">Produtos</a><a href="#lojas">Lojas</a>${state.user?`<button id="logout" class="ghost">Sair</button>`:`<button id="login" class="ghost">Entrar</button>`}</nav></div></header>
<main><section class="hero"><div class="wrap"><div class="eyebrow">CATÁLOGO LOCAL</div><h1>Descubra <span>onde tem</span><br>o que você procura.</h1><p>Encontre produtos, categorias e lojas em um só lugar.</p><div class="search"><input id="search" placeholder="Buscar produto..."/><button id="searchBtn">Pesquisar</button></div></div></section>
<section id="produtos" class="section wrap"><div class="section-head"><div><small>CATÁLOGO</small><h2>Produtos disponíveis</h2></div><select id="cat"><option value="">Todas as categorias</option>${state.categories.map(c=>`<option value="${c.id}">${c.nome}</option>`).join('')}</select></div><div id="grid" class="grid">${cards(state.products)}</div></section>
<section id="lojas" class="section alt"><div class="wrap"><div class="section-head"><div><small>PARCEIROS</small><h2>Lojas</h2></div></div><div class="stores">${state.stores.map(s=>`<article class="store"><div class="store-icon">⌂</div><div><h3>${esc(s.nome)}</h3><p>${esc(s.cidade||'')} ${esc(s.estado||'')}</p><span>${esc(s.descricao||'Loja parceira OndeTem')}</span></div></article>`).join('')}</div></div></section></main><footer><div class="wrap">OndeTem · Arquitetura Full Stack · ${new Date().getFullYear()}</div></footer>`;
  document.querySelector('#searchBtn').onclick=search;document.querySelector('#search').onkeydown=e=>{if(e.key==='Enter')search()};document.querySelector('#cat').onchange=search;
  document.querySelector('#logout')?.addEventListener('click',async()=>{await api.logout();state.user=null;render()});document.querySelector('#login')?.addEventListener('click',login);
}
function cards(list){return list.length?list.map(p=>`<article class="card"><div class="thumb">${p.categoria?.slice(0,1)||'P'}</div><div class="card-body"><span class="tag">${esc(p.categoria)}</span><h3>${esc(p.nome)}</h3><p>${esc(p.descricao||'Produto disponível')}</p><div class="meta"><strong>${money(p.preco_centavos)}</strong><span>${esc(p.loja)}</span></div></div></article>`).join(''):`<div class="empty">Nenhum produto encontrado.</div>`}
async function search(){const q=document.querySelector('#search').value;const c=document.querySelector('#cat').value;const p=await api.products(q,c);document.querySelector('#grid').innerHTML=cards(p.data)}
async function login(){const email=prompt('E-mail');if(!email)return;const senha=prompt('Senha');if(!senha)return;try{state.user=(await api.login(email,senha)).user;render()}catch(e){alert(e.message)}}
function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
load().catch(e=>{app.innerHTML=`<main class="error"><h1>Não foi possível conectar à API</h1><p>${esc(e.message)}</p><p>Verifique se o backend está rodando em <b>http://localhost:3000</b>.</p></main>`});
