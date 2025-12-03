import express from "express";
import cursos from "./routes/cursos.js";
import alunos from "./routes/alunos.js";

const app = express();
app.use(express.json());

app.use("/cursos", cursos);
app.use("/alunos", alunos);

app.listen(3000, () => console.log("API rodando na porta 3000"));
