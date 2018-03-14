const express                  = require('express');
const router                   = express.Router();
const BookController           = require('../app/controller/book/book-controller');
const check                    = require('../app/middlerware');
const IdSearchCondition        = require('../src/search-services/id-search-condition');
const UndeletedSearchCondition = require('../src/search-services/undeleted-search-condition');
const SearchAdvance            = require('../src/search-services/advance-search-condition');
const SearchBasic              = require('../src/search-services/keyword-search-condition');

let bookController = new BookController();

router.get('/books',function (req, res, next) {
    req.condition = new UndeletedSearchCondition();
    next();
}, bookController.searchBook);

router.get('/edit/:id',function (req, res, next) {
    req.condition = new IdSearchCondition(req.params.id);
    next();
},bookController.renderBookEdit);

router.get('/add', bookController.renderBook);

router.get('/books/:id', bookController.deleteBook);

router.post('/book', check.bookRequest, bookController.createBook);

router.post('/update/:id', check.bookRequest, bookController.updateBook);

router.get('/search-advance',function (req, res, next) {
    req.condition = new SearchAdvance(req.query.title, req.query.author ,req.query.publisher );
    next();
}, bookController.searchBook);

router.get('/search-basic', function (req, res, next) {
    req.condition = new SearchBasic(req.query.keyword);
    next();
}, bookController.searchBook);

module.exports = router;
