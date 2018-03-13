const express        = require('express');
const path           = require('path');
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const BookRepository = require('./src/book/book-repository');
const connection     = require('./database/connection');
const BookFactory    = require('./src/book/book-factory');
const Searcher       = require('./src/search-services/searcher');
const nunjucks       = require('nunjucks');
const index = require('./routes/index');

const app   = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join('public')));

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.set('books.repo', new BookRepository(connection));

app.set('book.searcher', new Searcher(connection, new BookFactory()));


app.use('/', index);

module.exports = app;
