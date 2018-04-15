import React from 'react';
import PropTypes from 'prop-types';
//import ListBooks from './ListBooks';
import * as BooksAPI from './utils/BooksAPI';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import filter from 'lodash.filter';
import findIndex from 'lodash.findindex';
import './App.css';

class Readable extends React.Component {
  static propTypes = {
    onDeleteBook: PropTypes.func.isRequired,
  }
  state = {
    books: { currentlyReading: [], wantToRead: [], read: [] },
    showSearchPage: false,
    allBooks: [],
    query: '',
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const organizedBooks = this.organizeBooksByShelf(books);
      this.setState({ books: organizedBooks });
      this.setState({ allBooks: books });
    });
  }
  moveBooksFromShelf = (event) => {
    const { allBooks } = this.state;
    const splitArray = event.target.value.split(',');
    const shelf = Number(splitArray[0]);
    const bookId = splitArray[1];
    BooksAPI.updateShelf(bookId, shelf).then((updatedBook) => {
      const index = findIndex(allBooks, { book_id: updatedBook.book_id });
      allBooks.splice(index, 1, updatedBook);
      this.setState({ allBooks });
    });
  }
  removeBook = (bookId) => {
    // Change state based on current state
    const { allBooks } = this.state;
    const filterBookObject = allBooks.filter(bookItem => bookItem.book_id !== bookId);
    BooksAPI.removeBook(bookId).then(() => {
      this.setState({ allBooks: filterBookObject });
    });
  }

  organizeBooksByShelf = (books) => {
    const currentlyReading = filter(books, { shelf: 1 });
    const wantToRead = filter(books, { shelf: 2 });
    const read = filter(books, { shelf: 3 });
    const organizedBooks = { currentlyReading, wantToRead, read };
    return organizedBooks;
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }


  render() {
    const { allBooks } = this.state;
    const { books, onDeleteBook } = this.props;
    const { query } = this.state;
    let showSearchPage;
    if(query) {
      const matchBook = new RegExp(escapeRegExp(this.state.query), 'i');
      showSearchPage = books.filter(book => matchBook.test(book.title));
    } else {
      showSearchPage = books;
    }
    //showSearchPage.sort(sortBy('title'));
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {}
                <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={event => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Readable</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { allBooks.filter(book => book.shelf === 1).map(book => (
                        <li key={book.book_id}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${book.image_url})`,
                                  backgroundSize: 'cover' }}
                              />
                              <div className="book-shelf-changer">
                                <select onChange={this.moveBooksFromShelf} value={this.state.value}>
                                  <option
                                    value="none"
                                    disabled
                                  >
                                    Move to...
                                  </option>
                                  <option
                                    selected
                                    value={[1, book.book_id]}

                                  >
                                    Currently Reading
                                  </option>
                                  <option value={[2, book.book_id]}>Want to Read</option>
                                  <option value={[3, book.book_id]}>Read</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">
                              { book.title }
                            </div>
                            <div className="book-authors">
                              { book.author }
                            </div>
                            <div>
                              { book.shelf }
                            </div>
                            <button onClick={() => this.removeBook(book.book_id)} className="book-remove">
                            removeBook</button>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want To Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { allBooks.filter(book => book.shelf === 2).map(book => (
                        <li key={book.book_id}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${book.image_url})`,
                                  backgroundSize: 'cover' }}
                              />
                              <div className="book-shelf-changer">
                                <select onChange={this.moveBooksFromShelf} value={this.state.value}>
                                  <option
                                    value="none"
                                    disabled
                                  >
                                    Move to...
                                  </option>
                                  <option
                                    value={[1, book.book_id]}

                                  >
                                    Currently Reading
                                  </option>
                                  <option selected value={[2, book.book_id]}>Want to Read</option>
                                  <option value={[3, book.book_id]}>Read</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">
                              { book.title }
                            </div>
                            <div className="book-authors">
                              { book.author }
                            </div>
                            <div>
                              { book.shelf }
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                       { allBooks.filter(book => book.shelf === 3).map(book => (
                        <li key={book.book_id}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${book.image_url})`,
                                  backgroundSize: 'cover' }}
                              />
                               <div className="book-shelf-changer">
                                <select onChange={this.moveBooksFromShelf} value={this.state.value}>
                                  <option
                                    value="none"
                                    disabled
                                  >
                                    Move to...
                                  </option>
                                  <option
                                    value={[1, book.book_id]}

                                  >
                                    Currently Reading
                                  </option>
                                  <option value={[2, book.book_id]}>Want to Read</option>
                                  <option selected value={[3, book.book_id]}>Read</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">
                              { book.title }
                            </div>
                            <div className="book-authors">
                              { book.author }
                            </div>
                            <div>
                              { book.shelf }
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Readable

