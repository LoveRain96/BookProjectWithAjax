const express = require('express');
const router = express.Router();
const BookController = require('../http/controller/book/book-controller');
const check = require('../http/middlerware');
const IdSearchCondition = require('../src/search-services/id-search-condition');

let bookController = new BookController();

router.get('/books', check.searchCondition, bookController.searchBook);

router.get('/edit/:id',function (req, res, next) {
    req.condition = new IdSearchCondition(req.params.id);
    next();
},bookController.detail);

router.get('/add', bookController.renderBook);

//router.post('/book', bookController.createBook);

router.get('/search-advance', check.searchCondition, bookController.searchBook);

router.get('/search-basic', check.searchCondition, bookController.searchBook);

module.exports = router;
