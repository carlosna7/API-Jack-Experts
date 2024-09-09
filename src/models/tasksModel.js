import openDb from '../database/sqliteConfig.js';

openDb()

const getAll = async (user_id) => {
  const db = await openDb();
  const tasks = await db.all('SELECT * FROM tasks WHERE user_id = ?', [user_id]);
  return tasks;
};

const createTask = async (task) => {
  const { title, description, status, user_id } = task;
  const db = await openDb();
  const newTask = await db.run(
    'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
    [title, description, status, user_id]
  );
  return { id: newTask.lastID, ...task }; 
};

const deleteTask = async (id) => {
  const db = await openDb();
  const deletedTask = await db.run('DELETE FROM tasks WHERE id = ?', [id]);
  return deletedTask;
};

const completeTask = async (task) => {
  const { id } = task;
  const status = 'completed';
  const db = await openDb();
  const completeTask = await db.run(
    'UPDATE tasks SET status = ? WHERE id = ?',
    [status, id]
  );
  return task
};

export default {
  getAll,
  createTask,
  deleteTask,
  completeTask
};