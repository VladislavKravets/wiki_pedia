const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./database');
const Page = require('./models/Page');
const authenticateToken = require('./middleware/auth');
const pagesRouter = require("./routes/pagesRouter");
const authRouter = require("./routes/authRouter");
const generateToken = require("./utils/auth");
const cors = require("cors");

require('dotenv').config();

app.use(express.json());
app.use(cors());

// Подключение к базе данных
sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((err) => {
    console.error('Ошибка подключения к базе данных:', err);
  });

app.use('/api/articles', pagesRouter);
app.use('/api/auth', authRouter);
// app.use('/api/generateToken', generateToken(1));


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
