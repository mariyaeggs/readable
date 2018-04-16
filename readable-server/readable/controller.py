"""Readable Server Controller."""
from oto import response
from oto.adaptors.flask import flaskify

from readable.api import application
from readable.models import book_model


@application.route('/', methods=['GET'])
def health_check():
    return flaskify(response.Response('all is well that begins well'))


@application.route('/books', methods=['GET'])
def get_books():
    all_books_response = book_model.get_books()
    return flaskify(all_books_response)
