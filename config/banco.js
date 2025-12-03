import sqlite3 from "sqlite3";

const db = new sqlite3.Database("banco.db");

db.run(`
  CREATE TABLE IF NOT EXISTS cursos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT,
    horas INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    cursos_id INTEGER,
    FOREIGN KEY (cursos_id) REFERENCES cursos(id)
  )
`);

export default db;
