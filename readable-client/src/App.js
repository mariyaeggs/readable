import React from 'react';
import findIndex from 'lodash.findindex';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';


class Readable extends React.Component {
  state = {
    allBooks: [],
    title: '',
    author: '',
    imageUrl: '',
    shelf: 3,
    showForm: false,

  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
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

  createBook = (bookData) => {
    const { allBooks } = this.state;
    BooksAPI.createBook(bookData).then((createdBook) => {
      allBooks.push(createdBook);
      this.setState({ allBooks });
      window.scrollTo(0, 0);
    });
    this.setState({
      showForm: false, shelf: 3, imageUrl: '', author: '', title: '', isbn: '',
    });
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value });
  }

  handleSelectShelf = (event) => {
    this.setState({ shelf: Number(event.target.value) });
  }

  handleUrlChange = (event) => {
    this.setState({ imageUrl: (event.target.value) });
  }

  render() {
    const {
      allBooks, title, shelf, author, isbn, imageUrl,
    } = this.state;

    return (
      <div className="app">
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
                                backgroundSize: 'cover',
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                onChange={this.moveBooksFromShelf}
                                value={this.state.value}
                              >
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
                          <button
                            onClick={() => this.removeBook(book.book_id)}
                            className="book-remove"
                          />
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
                                backgroundSize: 'cover',
                              }}
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
                          <button
                            onClick={() => this.removeBook(book.book_id)}
                            className="book-remove"
                          />
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
                                backgroundSize: 'cover',
                              }}
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
                          <button
                            onClick={() => this.removeBook(book.book_id)}
                            className="book-remove"
                          />
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <button className="open-search" onClick={() => this.showForm()} />

          <div>
            { this.state.showForm &&
            <form >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.handleTitleChange}
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={author}
                onChange={this.handleAuthorChange}
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={imageUrl}
                onChange={this.handleUrlChange}
              />
              <select onChange={this.handleSelectShelf}>
                <option
                  value="none"
                  disabled
                  selected
                >
                  Move to...
                </option>
                <option
                  value={1}
                >
                  Currently Reading
                </option>
                <option value={2}>Want to Read</option>
                <option value={3}>Read</option>
              </select>
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                }}
              />

              <button
                onClick={
                  () => this.createBook({
                    shelf, title, author, isbn, image_url: imageUrl,
                  })
                }
              >
                create book
              </button>
            </form>
          }
          </div>
        </div>
      </div>
    );
  }
}
export default Readable;
