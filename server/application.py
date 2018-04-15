from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from oto.adaptors.flask import flaskify
from flask import request
from oto import response
from flask_cors import CORS

from models import book_model

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Integer



from flask import Flask
application = Flask(__name__)
CORS(application)

@application.route("/")
def main():
    return "Welcome!"

@application.route("/books", methods=['GET'])
def get_books():
    all_books_response = book_model.get_books()
    return flaskify(all_books_response)

@application.route("/book/<int:book_id>", methods=['GET'])
def get_book_by_id(book_id):
    book_response = book_model.get_book_by_id(book_id)
    return flaskify(book_response)

@application.route("/book/<int:book_id>", methods=['PUT'])
def update_book_by_id(book_id):
    book_data = request.get_json() #dict of key value pairs
    update_book_response = book_model.update_book(book_id, book_data)
    return flaskify(update_book_response)

@application.route("/book", methods=['POST'])
def create_book():
    book_data = request.get_json()
    book_created_response = book_model.create_a_book(book_data)
    return flaskify(book_created_response)

@application.route("/search", methods=['GET'])
def search_book():
    book_search_attribute = request.args.get("attribute")
    book_search_value = request.args.get("value")
    import pdb; pdb.set_trace()
    book_search_response = book_model.search_a_book(book_data)
    return flaskify(book_search_response)

if __name__ == "__main__":
    application.run(debug=True) #autorestart