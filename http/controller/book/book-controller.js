const PublisherProvider = require('../../../src/publisher/publisher-provider');
const Connection        = require('../../../database/connection');
class BookController {

    constructor() {

    }

    searchBook(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then((foundBook) => response.render('home.njk', {books: foundBook})
            ).catch(next)
    }

    detail(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then((books) => {
                if (!books.length) {
                    throw  new Error('no book');
                }
                response.render('detail.njk', {book: books[0]})
            }).catch(next)
    }

    renderBook(request, response, next) {
        let publisherProvider = new PublisherProvider(Connection);
        publisherProvider.allPublisher()
            .then(publishers => response.render('add-new.njk', {publishers: publishers}))
            .catch(next)
    }

/*    createBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.add(request.book)
            .then(function (book) {
                response.render('add-new.njk', {book: book});
            }).catch(next)
    }*/
}
module.exports = BookController;