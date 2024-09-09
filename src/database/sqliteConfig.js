import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Função para abrir o banco de dados
export default async function openDb() {
  return open({
    filename: './src/database/database.db',
    driver: sqlite3.Database
  });
}

// Função para criar uma tabela
const createTable = async () => {
  const db = await openDb();

  // comandos SQL
  const createTableUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  const createTableTasks = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

  // execução dos comandos SQL
  await db.run(createTableUsers);
  // console.log('Tabela users criada com sucesso!');
  await db.run(createTableTasks);
  // console.log('Tabela tasks criada com sucesso!');
}

// cria a tabela
createTable().catch(error => console.error('Erro ao criar tabela:', error));