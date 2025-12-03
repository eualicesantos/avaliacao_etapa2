import { Router } from "express";
import db from "../config/banco.js";

const router = Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM alunos", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: "Erro interno" });
    res.status(200).json(rows);
  });
});

router.get("/:id", (req, res) => {
  db.get("SELECT * FROM alunos WHERE id=?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ erro: "Erro interno" });
    if (!row) return res.status(404).json({ erro: "Não encontrado" });
    res.status(200).json(row);
  });
});

router.post("/", (req, res) => {
  const { nome, email, cursos_id } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  db.run(
    "INSERT INTO alunos (nome, email, cursos_id) VALUES (?, ?, ?)",
    [nome, email, cursos_id],
    function () {
      res.status(201).json({
        id: this.lastID,
        nome,
        email,
        cursos_id
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const { nome, email, cursos_id } = req.body;

  db.run(
    "UPDATE alunos SET nome=?, email=?, cursos_id=? WHERE id=?",
    [nome, email, cursos_id, req.params.id],
    function () {
      if (this.changes === 0) {
        return res.status(404).json({ erro: "Não encontrado" });
      }
      res.status(200).json({
        id: req.params.id,
        nome,
        email,
        cursos_id
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM alunos WHERE id=?", [req.params.id], function () {
    if (this.changes === 0) {
      return res.status(404).json({ erro: "Não encontrado" });
    }
    res.status(200).json({ mensagem: "Aluno deletado" });
  });
});

export default router;
