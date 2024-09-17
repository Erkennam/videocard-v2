import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import { authenticateToken } from "./authMidleware.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким именем пользователя или адресом электронной почты уже существует' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error('ошибка регистрации', error);
    res.status(500).json({ message: 'Ошибка регистрации', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Неправильный пароль' });
    }
    const token = jwt.sign({ userId: user._id }, 'my_secret_key');
    res.status(200).json({ token, message: 'пользователь авторизирован', user });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера при входе пользователя' });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
