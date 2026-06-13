import { Router, Request, Response } from 'express';
import { getDb, persistDb } from '~/db/client.js';
import { TABLES, type ReactionType } from '~/db/schema.js';

export const reactionsRouter = Router({ mergeParams: true });

const VALID_TYPES: ReactionType[] = ['heart', 'wow'];

reactionsRouter.get('/:id/reactions', (req: Request, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const db = getDb();
    const stmt = db.prepare(
      `SELECT type, count FROM ${TABLES.REACTIONS} WHERE blogId = ?`
    );
    stmt.bind([blogId]);

    const counts: Record<ReactionType, number> = { heart: 0, wow: 0 };
    while (stmt.step()) {
      const row = stmt.getAsObject() as { type: ReactionType; count: number };
      counts[row.type] = row.count;
    }
    stmt.free();

    res.json(counts);
  } catch (error) {
    console.error('Error fetching reactions:', error);
    res.status(500).json({ error: 'Failed to fetch reactions' });
  }
});

reactionsRouter.post('/:id/reactions/:type', (req: Request, res: Response) => {
  try {
    const blogId = parseInt(req.params.id);
    const type = req.params.type as ReactionType;
    const delta: number = req.body.delta === -1 ? -1 : 1;

    if (!VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: 'Invalid reaction type' });
    }

    const db = getDb();

    db.run(
      `INSERT INTO ${TABLES.REACTIONS} (blogId, type, count)
       VALUES (?, ?, MAX(0, ?))
       ON CONFLICT(blogId, type) DO UPDATE SET count = MAX(0, count + ?)`,
      [blogId, type, delta, delta]
    );

    const stmt = db.prepare(
      `SELECT type, count FROM ${TABLES.REACTIONS} WHERE blogId = ?`
    );
    stmt.bind([blogId]);

    const counts: Record<ReactionType, number> = { heart: 0, wow: 0 };
    while (stmt.step()) {
      const row = stmt.getAsObject() as { type: ReactionType; count: number };
      counts[row.type] = row.count;
    }
    stmt.free();

    persistDb();
    res.json(counts);
  } catch (error) {
    console.error('Error toggling reaction:', error);
    res.status(500).json({ error: 'Failed to toggle reaction' });
  }
});
