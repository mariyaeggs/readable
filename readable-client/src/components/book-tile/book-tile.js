import React from 'react';
import PropTypes from 'prop-types'

export default class BookTile extends React.Component {
  static propTypes = {
    book: PropTypes.object,
    removeBook: PropTypes.func,
    moveBook: PropTypes.func,
    shelfNumber: PropTypes.number,
  };

  handleMoveBooksFromShelf = (event) => {
    const { moveBook } = this.props;
    const splitArray = event.target.value.split(',');
    const shelf = Number(splitArray[0]);
    const bookId = splitArray[1];
    moveBook(bookId, shelf)
  }

  render() {
    const { book, removeBook, shelfNumber } = this.props;

    return(
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.IMAGE_URL_L})`,
              backgroundSize: 'cover',
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={this.handleMoveBooksFromShelf}
              defaultValue={[shelfNumber, book.book_id]}
            >
              <option value="none" disabled>Move to...</option>
              <option value={[1, book.book_id]}>Currently Reading</option>
              <option value={[2, book.book_id]}>Want to Read</option>
              <option value={[3, book.book_id]}>Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.BOOK_TITLE}
        </div>
        <div className="book-authors">
          {book.BOOK_AUTHOR}
        </div>
        <button
          onClick={() => removeBook(book.book_id)}
          className="book-remove"
        />
      </div>
    )
  }
}
