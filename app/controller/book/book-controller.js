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

   /* detail(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then((books) => {
                if (!books.length) {
                    throw  new Error('no book');
                }
                response.render('detail.njk', {book: books[0]})
            }).catch(next)
    }
*/
    renderBook(request, response, next) {
        let publisherProvider = new PublisherProvider(Connection);
        publisherProvider.allPublisher()
            .then(publishers => response.render('add-new.njk', {publishers: publishers}))
            .catch(next)
    }

    renderBookEdit(request, response, next) {
        let publisherProvider = new PublisherProvider(Connection);
        publisherProvider.allPublisher().then(publishers => {
            request.app.get('book.searcher').search(request.condition).then(books => {
                response.render('detail.njk', {book : books[0], publishers :publishers})
            })
        }).catch(next)

    }

    updateBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.edit(request.book).then(function () {
            response.json({message :'success'})
        }).catch(next)
    }

    deleteBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.remove(request.params.id).then(function () {
            response.render('home.njk');
        }).catch(next);
    }
    createBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.add(request.book)
            .then(function () {
                response.render('home.njk');
            }).catch(next)
    }
}
module.exports = BookController;