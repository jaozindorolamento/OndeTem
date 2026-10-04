import 'dotenv/config';
import { app } from './app.js';
import { getDb } from './config/database.js';
const port=Number(process.env.PORT||3000);
await getDb();
app.listen(port,()=>console.log(`OndeTem API: http://localhost:${port}`));
