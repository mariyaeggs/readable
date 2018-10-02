import React from 'react';
import PropTypes from 'prop-types';

export default class BookTile extends React.Component {
  static propTypes = {
    book: PropTypes.shape({
      bookId: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
    removeBook: PropTypes.func.isRequired,
    moveBook: PropTypes.func.isRequired,
    shelfNumber: PropTypes.number.isRequired,
  };

  handleMoveBooksFromShelf = (event) => {
    const { moveBook } = this.props;
    const splitArray = event.target.value.split(',');
    const shelf = Number(splitArray[0]);
    const bookId = splitArray[1];
    moveBook(bookId, shelf);
  }

  render() {
    const { book, removeBook, shelfNumber } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageUrl})`,
              backgroundSize: 'cover',
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={this.handleMoveBooksFromShelf}
              defaultValue={[shelfNumber, book.bookId]}
            >
              <option value="none" disabled>Move to...</option>
              <option value={[1, book.bookId]}>Currently Reading</option>
              <option value={[2, book.bookId]}>Want to Read</option>
              <option value={[3, book.bookId]}>Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {book.author}
        </div>
        <button
          onClick={() => removeBook(book.bookId)}
          className="book-remove"
        />
      </div>
    );
  }
}
