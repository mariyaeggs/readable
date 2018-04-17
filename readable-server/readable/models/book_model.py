"""Book model."""

from oto import response
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from readable.models import mysql_connector


class Book(mysql_connector.BaseModel):

    __tablename__ = 'BOOKS'

    book_id = Column(
        Integer, primary_key=True, autoincrement=True, nullable=False)
    title = Column(String)
    author = Column(String)
    image_url = Column(String)
    isbn = Column(String)
    shelf = Column(Integer)

    def to_dict(self):
        return {
            'book_id': self.book_id,
            'title': self.title,
            'author': self.author,
            'image_url': self.image_url,
            'isbn': self.isbn,
            'shelf': self.shelf
        }


def get_books():
    with mysql_connector.db_session() as session:
        # import pdb; pdb.set_trace()
        books = session.query(Book).all()
        books_list = []
        for book in books:
            books_list.append(book.to_dict())
    return response.Response(message=books_list)


def update_book(book_id, book_data):
    with mysql_connector.db_session() as session:
        existing_book = session.query(Book).get(book_id)
        if not existing_book:
            return response.create_not_found_response()
        for book_prop in book_data:
            setattr(existing_book, book_prop, book_data.get(book_prop))
        session.merge(existing_book)
        updated_book = existing_book.to_dict()
    return response.Response(updated_book)


def create_book(book_data):
    book = Book(**book_data)  # unpack data
    with mysql_connector.db_session() as session:
        session.add(book)
        session.flush()
        # send a 201 status for item created vs default of 200
        return response.Response(message=book.to_dict(), status=201)


def delete_book(book_id):
    with mysql_connector.db_session() as session:
        existing_book_result = session.query(Book).get(book_id)
        if not existing_book_result:
            return response.create_not_found_response()
        session.delete(existing_book_result)
        session.commit()
    return response.Response(
        message='Successfully deleted book: {}'.format(
            existing_book_result.title))
