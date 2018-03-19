const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const BookRepository = require('./src/book/book-repository');
const connection     = require('./database/connection');
const BookFactory    = require('./src/book/book-factory');
const Searcher       = require('./src/search-services/searcher');
const nunjucks       = require('nunjucks');
const index = require('./routes');

const app   = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static(path.join('public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('books.repo', new BookRepository(connection));

app.set('book.searcher', new Searcher(connection, new BookFactory()));


app.use(index.router);

app.listen(8080,function () {
    console.log("Running port 8080")
});

module.exports = app;
