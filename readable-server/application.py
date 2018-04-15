"""Readable Server Application Controller."""

from flask import Flask
from oto.adaptors.flask import flaskify
from oto import response

from models import book_model


application = Flask(__name__)
application.debug=True


@application.route('/', methods=['GET'])
def health_check():
    return flaskify(response.Response('all is well that begins well'))

@application.route("/books", methods=['GET'])
def get_books():
    all_books_response = book_model.get_books()
    return flaskify(all_books_response, encoder="utf-8", )

if __name__ == '__main__':
    application.run(host='0.0.0.0')
