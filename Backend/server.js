import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import "./db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/store", storeRoutes);

app.get("/", (req, res) => {
  res.send("Servidor backend rodando com sucesso!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("========================================");
  console.log("Backend iniciado com sucesso!");
  console.log(` Acesse: http://localhost:${PORT}`);
  console.log(" Rotas principais:");
  console.log(`   → /api/auth`);
  console.log(`   → /api/users`);
  console.log(`   → /api/store`);
  console.log("========================================");
});
