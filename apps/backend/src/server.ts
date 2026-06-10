import 'dotenv/config';
import { app } from './app.js';
import { initDb } from './db/client.js';

const PORT = process.env.PORT || 3000;

await initDb();

app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
});
