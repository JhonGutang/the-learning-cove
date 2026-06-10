import { Router, Request, Response } from 'express';
import { getDb, persistDb } from '~/db/client.js';
import { TABLES, type Blog } from '~/db/schema.js';

export const blogsRouter = Router();

blogsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const stmt = db.prepare(`SELECT * FROM ${TABLES.BLOGS} ORDER BY createdAt DESC`);
    const blogs: Blog[] = [];
    while (stmt.step()) {
      blogs.push(stmt.getAsObject() as Blog);
    }
    stmt.free();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

blogsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const stmt = db.prepare(`SELECT * FROM ${TABLES.BLOGS} WHERE id = ?`);
    stmt.bind([parseInt(id)]);

    let blog: Blog | undefined;
    if (stmt.step()) {
      blog = stmt.getAsObject() as Blog;
    }
    stmt.free();

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

blogsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, content = '', tags = '', category = '', status = 'draft', readTime = 0 } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const now = new Date().toISOString();
    const db = getDb();
    db.run(
      `INSERT INTO ${TABLES.BLOGS} (title, description, content, tags, category, status, readTime, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, content, tags, category, status, readTime, now, now]
    );

    // Get the newly created blog
    const stmt = db.prepare(`SELECT * FROM ${TABLES.BLOGS} ORDER BY id DESC LIMIT 1`);
    let blog: Blog | undefined;
    if (stmt.step()) {
      blog = stmt.getAsObject() as Blog;
    }
    stmt.free();

    persistDb();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

blogsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, content, tags, category, status, readTime } = req.body;
    const db = getDb();

    // Check if blog exists
    const checkStmt = db.prepare(`SELECT * FROM ${TABLES.BLOGS} WHERE id = ?`);
    checkStmt.bind([parseInt(id)]);
    const exists = checkStmt.step();
    checkStmt.free();

    if (!exists) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const now = new Date().toISOString();
    db.run(
      `UPDATE ${TABLES.BLOGS}
       SET title = ?, description = ?, content = ?, tags = ?, category = ?, status = ?, readTime = ?, updatedAt = ?
       WHERE id = ?`,
      [title, description, content, tags, category, status, readTime, now, parseInt(id)]
    );

    // Get the updated blog
    const stmt = db.prepare(`SELECT * FROM ${TABLES.BLOGS} WHERE id = ?`);
    stmt.bind([parseInt(id)]);
    let updated: Blog | undefined;
    if (stmt.step()) {
      updated = stmt.getAsObject() as Blog;
    }
    stmt.free();

    persistDb();
    res.json(updated);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

blogsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDb();

    // Check if blog exists
    const checkStmt = db.prepare(`SELECT * FROM ${TABLES.BLOGS} WHERE id = ?`);
    checkStmt.bind([parseInt(id)]);
    const exists = checkStmt.step();
    checkStmt.free();

    if (!exists) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    db.run(`DELETE FROM ${TABLES.BLOGS} WHERE id = ?`, [parseInt(id)]);
    persistDb();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});
