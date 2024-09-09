import usersModel from '../models/usersModel.js';

const userRegister = async (req, res) => {
  try {
    const registrationConfirmation = await usersModel.userRegister(req.body);
    res.status(201).json(registrationConfirmation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const token = await usersModel.userLogin(req.body);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user_id = req.query.id;
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const users = await usersModel.getUser(user_id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  userRegister,
  userLogin,
  getUser
};