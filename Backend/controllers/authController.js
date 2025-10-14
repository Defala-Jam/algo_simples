import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbPromise from "../db.js";

console.log("✅ authController carregado!");

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = await dbPromise;

    const existing = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (existing) return res.status(400).json({ message: "Email já registrado" });

    const hashed = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashed]);

    res.json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await dbPromise;

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({
      message: "Login bem-sucedido",
      token,
      user: { id: user.id, name: user.name, email: user.email, diamonds: user.diamonds, xp: user.xp },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
