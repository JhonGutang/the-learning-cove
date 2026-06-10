import { getDb, persistDb } from '~/db/client.js';
import { TABLES } from '~/db/schema.js';

export async function getHealthStatus() {
  const timestamp = new Date().toISOString();

  try {
    const db = getDb();
    db.run(`INSERT INTO ${TABLES.HEALTH_LOGS} (status, timestamp) VALUES (?, ?)`, ['ok', timestamp]);
    persistDb();

    return {
      status: 'ok',
      timestamp,
      version: '0.1.0',
      message: 'Backend is running',
    };
  } catch (error) {
    return {
      status: 'error',
      timestamp,
      version: '0.1.0',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
