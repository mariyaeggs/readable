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


def search_for_books(search_term):
    """Search for a book."""
    with mysql_connector.db_session() as session:
        isbn_books = session.query(
            LibraryBook).filter(LibraryBook.ISBN.contains(
                search_term)).limit(20)
        title_books = session.query(
            LibraryBook).filter(LibraryBook.BOOK_TITLE.contains(
                search_term)).limit(20)
        author_books = session.query(
            LibraryBook).filter(LibraryBook.BOOK_AUTHOR.contains(
                search_term)).limit(20)

        isbn_results = []
        for book in isbn_books:
            isbn_results.append(book.to_dict())

        title_results = []
        for book in title_books:
            title_results.append(book.to_dict())

        author_results = []
        for book in author_books:
            author_results.append(book.to_dict())

        result_count = len(title_results) + len(author_results) + len(isbn_results)
        payload = {
            'results_found': result_count,
            'title_results': title_results,
            'author_results': author_results,
            'isbn_results': isbn_results
        }
        return response.Response(payload)
