"""Readable Server Controller."""
from flask import request
from oto import response
from oto.adaptors.flask import flaskify

from readable.api import application
from readable.models import book_model


@application.route('/', methods=['GET'])
def health_check():
    return flaskify(response.Response('all is well that begins well'))


@application.route('/books', methods=['GET'])
def get_books():
    return flaskify(book_model.get_books())


@application.route('/book/<int:book_id>', methods=['PUT'])
def update_book_by_id(book_id):
    book_data = request.get_json()  # dict of key value pairs
    return flaskify(book_model.update_book(book_id, book_data))


@application.route('/book', methods=['POST'])
def create_book():
    book_data = request.get_json()
    book_created_response = book_model.create_book(book_data)
    return flaskify(book_created_response)
