const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const generateToken = require('../utils/auth');
const Page = require("../models/Page");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким же именем пользователя
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким именем уже существует' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const newUser = await User.create({ username, password: hashedPassword, admin: false });

    // Генерируем токен для нового пользователя
    const token = generateToken(newUser.id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Находим пользователя по имени пользователя
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Проверяем правильность пароля
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    // Генерируем токен для пользователя
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.profile = async (req, res) => {
  const { username } = req.query;
  const token = req.headers.authorization.split(' ')[1];


  if (!token) {
    return res.status(401).json({error: 'Отсутствует токен авторизации.'});
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken && !decodedToken.username === username) {
      return res.status(403).json({error: 'Invalid Token'});
    }

    // Знаходимо користувача за іменем користувача
    const user = await User.findOne({ where: { username } });

    return res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, error: 'Помилка сервера' });
  }
};
