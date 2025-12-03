import { Router } from "express";
import db from "../config/banco.js";

const router = Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM cursos", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: "Erro interno" });
    res.status(200).json(rows);
  });
});

router.get("/:id", (req, res) => {
  db.get("SELECT * FROM cursos WHERE id=?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ erro: "Erro interno" });
    if (!row) return res.status(404).json({ erro: "Não encontrado" });
    res.status(200).json(row);
  });
});


router.post("/", (req, res) => {
  const { descricao, horas } = req.body;

  if (!descricao || !horas) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  db.run(
    "INSERT INTO cursos (descricao, horas) VALUES (?, ?)",
    [descricao, horas],
    function () {
      res.status(201).json({ id: this.lastID, descricao, horas });
    }
  );
});

router.put("/:id", (req, res) => {
  const { descricao, horas } = req.body;

  db.run(
    "UPDATE cursos SET descricao=?, horas=? WHERE id=?",
    [descricao, horas, req.params.id],
    function () {
      if (this.changes === 0) {
        return res.status(404).json({ erro: "Não encontrado" });
      }
      res.status(200).json({ id: req.params.id, descricao, horas });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM cursos WHERE id=?", [req.params.id], function () {
    if (this.changes === 0) {
      return res.status(404).json({ erro: "Não encontrado" });
    }
    res.status(200).json({ mensagem: "Curso deletado" });
  });
});

export default router;
