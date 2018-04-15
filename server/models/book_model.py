from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from oto.adaptors.flask import flaskify
from oto import response

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Integer

import mysql_connector


class Book(mysql_connector.BaseModel):

    __tablename__ = 'BOOKS'

    book_id = Column(
        Integer, primary_key=True, autoincrement=True, nullable=False)
    title = Column(String)
    author = Column(String)
    image_url = Column(String)
    isbn = Column(String)

    def to_dict(self):
        return {
            'book_id': self.book_id,
            'title': self.title,
            'author': self.author,
            'image_url': self.image_url,
            'isbn': self.isbn
        }


def get_books():
    with mysql_connector.db_session() as session:
        # import pdb; pdb.set_trace()
        books = session.query(Book).all()
        books_list = []
        for book in books:
            books_list.append(book.to_dict())
    return response.Response(message=books_list)

def get_book_by_id(book_id):
    with mysql_connector.db_session() as session:
        book_result = session.query(Book).get(book_id)
        if not book_result:
            return response.create_not_found_response()
        book = book_result.to_dict()
    return response.Response(message=book)

def update_book(book_id, book_data):
    with mysql_connector.db_session() as session:
        existing_book = session.query(Book).get(book_id)
        if not existing_book:
            return response.create_not_found_response()
        # import pdb; pdb.set_trace()
        existing_book.title = book_data.get("title")
        session.merge(existing_book)
        updated_book = existing_book.to_dict()
    return response.Response(updated_book)

def create_a_book(book_data):
    book = Book(**book_data) #unpack data
    with mysql_connector.db_session() as session:
        session.add(book)
        session.flush()
        return response.Response(message=book.to_dict(), status=201) #status for new item

def search_a_book(book_data):
    book = Book(**book_data)
    with mysql_connector.db_session() as session:
        session.filter(book)
        session.flush()
        return response.Response(message=book.to_dict())