"""Readable Server Controller."""
from flask import request
from oto import response
from oto.adaptors.flask import flaskify

from readable.api import application
from readable.models import book_model
from readable.models import library_book_model


@application.route('/', methods=['GET'])
def health_check():
    """Health check for application

    Return:
        response.Response, a health message
    """
    return flaskify(response.Response('all is well that begins well'))


@application.route('/books', methods=['GET'])
def get_books():
    """Return all books in database."""
    return flaskify(book_model.get_books())


@application.route('/book/<int:book_id>', methods=['PUT'])
def update_book_by_id(book_id):
    """Update a book."""
    book_data = request.get_json()  # dict of key value pairs
    return flaskify(book_model.update_book(book_id, book_data))


@application.route('/book', methods=['POST'])
def create_book():
    """Create a new book."""
    book_data = request.get_json()
    return flaskify(book_model.create_book(book_data))


@application.route('/book/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    """Delete a book."""
    return flaskify(book_model.delete_book(book_id))


@application.route('/library-book/<int:book_id>', methods=['GET'])
def get_book_from_library(book_id):
    """Fetch a book from the book library by id."""
    return flaskify(library_book_model.get_book_by_id(book_id))


@application.route('/library-book/search', methods=['GET'])
def search_for_books():
    """Fetch a book from the book library by id."""
    search_term = request.args.get('term')
    search_category = request.args.get('category').lower()
    return flaskify(library_book_model.search_for_books(
        search_term, search_category))
