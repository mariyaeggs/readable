import React from 'react';
import PropTypes from 'prop-types'
import { BookTile } from '../../components';

class BookShelf extends React.Component {
  static propTypes = {
    shelfTitle: PropTypes.string,
    books: PropTypes.array,
    removeBook: PropTypes.func,
    moveBook: PropTypes.func,
    shelfNumber: PropTypes.number,
  };


  render() {
    const {
      shelfTitle, books, removeBook, moveBook, shelfNumber
    } = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map(book => (
              <li key={book.book_id}>
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
    )
  }
}

export default BookShelf;
