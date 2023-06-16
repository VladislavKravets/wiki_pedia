const express = require('express');
const pagesRouter = express.Router();
const pageController = require('../controllers/pageController');
const authenticateToken = require("../middleware/auth");

pagesRouter.get('/:title', pageController.getPage);
pagesRouter.get('', pageController.getPages);
pagesRouter.post('', authenticateToken, pageController.createPage);
pagesRouter.put('/:title', authenticateToken, pageController.updatePage);

module.exports = pagesRouter;
