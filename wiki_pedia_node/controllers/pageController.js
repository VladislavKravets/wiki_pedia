const Page = require('../models/Page');

const jwt = require('jsonwebtoken');

exports.getPages = async (req, res) => {
  const title = req.params.title;
  try {
    const pages = await Page.findAll();
    res.json(pages);
  } catch (error) {
    res.status(500).json({error: 'Ошибка сервера', message: error.message});
  }
};

exports.getPage = async (req, res) => {
  const title = req.params.title
  try {
    const page = await Page.findOne({where: {title}});
    res.json(page);
  } catch (error) {
    res.status(500).json({error: 'Ошибка сервера', message: error.message});
  }
};

exports.createPage = async (req, res) => {
  const {title, content} = req.body;
  const token = req.headers.authorization.split(' ')[1];

  // Проверяем наличие токена
  if (!token) {
    return res.status(401).json({error: 'Отсутствует токен авторизации.'});
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Проверяем наличие прав доступа
    if (!decodedToken || !decodedToken.admin) {
      return res.status(403).json({error: 'У вас недостаточно прав доступа.'});
    }

    const newPage = await Page.create({title, content});
    res.json({title: newPage.title, status: "Успішно створенно."});
  } catch (error) {
    res.status(500).json({error: 'Ошибка сервера', errorMessage: error.message});
  }
};

exports.updatePage = async (req, res) => {
  const oldTitle = req.params.title
  const {title, content} = req.body;
  const token = req.headers.authorization.split(' ')[1];

  // Проверяем наличие токена
  if (!token) {
    return res.status(401).json({error: 'Отсутствует токен авторизации.'});
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Проверяем наличие прав доступа
    if (!decodedToken || !decodedToken.admin) {
      return res.status(403).json({error: 'У вас недостаточно прав доступа.'});
    }

    const page = await Page.findOne({where: {title: oldTitle}});

    if (!page) {
      return res.status(404).json({error: 'Страница не найдена'});
    }

    page.title = title;
    page.content = content;
    page.updatedBy = userId;
    await page.save();

    res.status(200).json({title: page.title, status: 'Успішно оновлено.'});
  } catch (error) {
    console.error(error);
    res.status(500).json({errorMessage: error.message, error: 'Ошибка сервера'});
  }
};
