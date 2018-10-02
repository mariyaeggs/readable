import React from 'react';
import PropTypes from 'prop-types';
import { BookTile } from '../../components';

const BookShelf = (props) => {
  const {
    shelfTitle, books, removeBook, moveBook, shelfNumber,
  } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ shelfTitle }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map(book => (
            <li key={book.bookId}>
              <BookTile
                book={book}
                removeBook={removeBook}
                moveBook={moveBook}
                shelfNumber={shelfNumber}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeBook: PropTypes.func.isRequired,
  moveBook: PropTypes.func.isRequired,
  shelfNumber: PropTypes.number.isRequired,
};

export default BookShelf;
