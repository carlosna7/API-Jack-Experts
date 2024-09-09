import openDb from '../database/sqliteConfig.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

openDb()
dotenv.config();

const secret = process.env.JWT_PASS;

const userRegister = async (user) => {
  const { name, email, password } = user;
  const db = await openDb();
  // verifica se o email já existe
  const userExist = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (userExist) {
    return { error: 'User already exists' };
  }

  const hashPass = await bcrypt.hash(password, saltRounds)

  await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashPass]);
  return { message: "User has been registered!"};
};

const userLogin = async (user) => {
  const { email, password } = user;
  const db = await openDb();

  const userExist = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (!userExist) {
    return { error: 'User not found' };
  }

  const match = await bcrypt.compare(password, userExist.password);
  if (!match) {
    return { error: 'Incorrect password' };
  }

  // const token = jwt.sign(userExist.id, secret, { expiresIn: '1h' });
  const token = jwt.sign({
    id: userExist.id,
    exp: Math.floor(Date.now() / 1000) + (1000),
    // exp: Math.floor(Date.now() / 1000) + (30),
  }, secret);
  return token
};

const getUser = async (id) => {
  const db = await openDb();
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
  return user.name;
};

export default {
  userRegister,
  userLogin,
  getUser
};