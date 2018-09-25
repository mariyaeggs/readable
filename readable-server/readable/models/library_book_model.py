"""Book model."""

from oto import response
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from readable.models import mysql_connector


class LibraryBook(mysql_connector.BaseModel):

    __tablename__ = 'BX_BOOKS'

    index = Column(
        Integer, primary_key=True, autoincrement=True, nullable=False)
    ISBN = Column(String)
    BOOK_TITLE = Column(String)
    BOOK_AUTHOR = Column(String)
    PUBLICATION_YEAR = Column(String)
    PUBLISHER = Column(Integer)
    IMAGE_URL_S = Column(String)
    IMAGE_URL_M = Column(String)
    IMAGE_URL_L = Column(String)

    def to_dict(self):
        return {
            'book_id': self.index,
            'title': self.BOOK_TITLE,
            'author': self.BOOK_AUTHOR,
            'image_url': self.IMAGE_URL_L,
            'isbn': self.ISBN
        }


def get_book_by_id(book_id):
    """Fetch a book from library by id."""
    with mysql_connector.db_session() as session:
        book = session.query(LibraryBook).get(book_id)
        book_data = book.to_dict()
        return response.Response(book_data)


def search_for_books(search_term, search_category):
    """Search for a book."""
    with mysql_connector.db_session() as session:
        if search_category == 'isbn':
            results = session.query(
                LibraryBook).filter(LibraryBook.ISBN.contains(
                    search_term)).limit(20)
        elif search_category == 'title':
            results = session.query(
                LibraryBook).filter(LibraryBook.BOOK_TITLE.contains(
                    search_term)).limit(20)
        elif search_category == 'author':
            results = session.query(
                LibraryBook).filter(LibraryBook.BOOK_AUTHOR.contains(
                    search_term)).limit(20)
        else:
            return response.create_error_response(
                400, 'Invalid Search Category')

        results_data = []
        for book in results:
            results_data.append(book.to_dict())

        return response.Response(results_data)
