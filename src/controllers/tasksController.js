import tasksModel from '../models/tasksModel.js';

const getAll = async (req, res) => {
  try {
    const user_id = req.query.id;
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const tasks = await tasksModel.getAll(user_id);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao obter tarefas.' });
  }
};

const createTask = async (req, res) => {
  const createdTask = await tasksModel.createTask(req.body);
  return res.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.body;
  const deletedTask = await tasksModel.deleteTask(id);
  return res.status(201).json(deletedTask);
};

const completeTask = async (req, res) => {
  const completedTask = await tasksModel.completeTask(req.body);
  return res.status(201).json(completedTask);
}

export default {
  getAll,
  createTask,
  deleteTask,
  completeTask
};