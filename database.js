import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import initSqlJs from 'sql.js';
import { hashPassword } from '../utils/security.js';
import 'dotenv/config';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');
const DB_DIR = path.join(ROOT, 'database', 'data');
const DB_FILE = path.join(DB_DIR, 'ondetem.db');
const MIGRATION = path.join(ROOT, 'database', 'migrations', '001_initial.sql');
const SEED = path.join(ROOT, 'database', 'seeds', '001_demo.sql');

let db;
let SQL;
const require = createRequire(import.meta.url);

export async function getDb() {
  if (db) return db;
  SQL = await initSqlJs({ locateFile: f => path.join(path.dirname(require.resolve('sql.js/package.json')), 'dist', f) });
  await fs.mkdir(DB_DIR, { recursive: true });
  try {
    const data = await fs.readFile(DB_FILE);
    db = new SQL.Database(data);
  } catch {
    db = new SQL.Database();
  }
  await migrate();
  return db;
}

export async function persist() {
  if (!db) return;
  const data = db.export();
  await fs.writeFile(DB_FILE, Buffer.from(data));
}

async function migrate() {
  const migration = await fs.readFile(MIGRATION, 'utf8');
  db.run(migration);
  const row = db.exec('SELECT COUNT(*) AS total FROM usuarios')[0]?.values?.[0]?.[0] ?? 0;
  if (Number(row) === 0) {
    const seed = await fs.readFile(SEED, 'utf8');
    db.run(seed);
  }
  const admin = db.exec("SELECT id FROM usuarios WHERE email = 'admin@ondetem.local' LIMIT 1");
  if (!admin[0]?.values?.length) {
    const email = process.env.ADMIN_EMAIL || 'admin@ondetem.local';
    const password = process.env.ADMIN_PASSWORD || 'TroqueEstaSenha@2026';
    const stmt = db.prepare('INSERT INTO usuarios(nome,email,senha_hash,perfil) VALUES(?,?,?,?)');
    stmt.run(['Administrador', email, hashPassword(password), 'ADMIN']);
    stmt.free();
  }
  await persist();
}

export async function queryAll(sql, params = {}) {
  const database = await getDb();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

export async function queryOne(sql, params = {}) {
  const rows = await queryAll(sql, params);
  return rows[0] ?? null;
}

export async function execute(sql, params = {}) {
  const database = await getDb();
  database.run(sql, params);
  await persist();
}

if (process.argv.includes('--init')) {
  await getDb();
  console.log(`Banco criado: ${DB_FILE}`);
}
