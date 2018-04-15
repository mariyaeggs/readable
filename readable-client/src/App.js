import React from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
import * as BooksAPI from './utils/BooksAPI';
import filter from 'lodash.filter';
import './App.css';

class Readable extends React.Component {
  state = {
    books: { currentlyReading: [], wantToRead: [], read: [] },
    showSearchPage: true,
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log('books', books);
      const organizedBooks = this.organizeBooksByShelf(books);
      this.setState({ books: organizedBooks });
    });
  }

  organizeBooksByShelf = (books) => {
    const currentlyReading = filter(books, { shelf: 1 });
    const wantToRead = filter(books, { shelf: 2 });
    const read = filter(books, { shelf: 3 });
    const organizedBooks = { currentlyReading, wantToRead, read };
    console.log('organized books', organizedBooks);
    return organizedBooks;
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { books.currentlyReading.map(book => (
                        <li key={book.id}>
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
                                <select>
                                  <option value="none" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
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
                  <h2 className="bookshelf-title">Want To Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { books.wantToRead.map(book => (
                        <li key={book.id}>
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
                                <select>
                                  <option value="none" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
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
                      { books.read.map(book => (
                        <li key={book.id}>
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
                                <select>
                                  <option value="none" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
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

