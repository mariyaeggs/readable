import React from 'react';
import findIndex from 'lodash.findindex';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';
import { BookShelf, Search } from './components';


class Readable extends React.Component {
  state = {
    allBooks: [],
    title: '',
    author: '',
    imageUrl: '',
    shelf: 3,
    showForm: false,
    modal: false,
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ allBooks: books });
    });
  }
  moveBooksFromShelf = (bookId, shelf) => {
    const { allBooks } = this.state;
    BooksAPI.updateShelf(bookId, shelf).then((updatedBook) => {
      const index = findIndex(allBooks, { bookId: updatedBook.bookId });
      allBooks.splice(index, 1, updatedBook);
      this.setState({ allBooks });
    });
  }
  removeBook = (bookId) => {
    // Change state based on current state
    const { allBooks } = this.state;
    const filterBookObject = allBooks.filter(bookItem => bookItem.bookId !== bookId);
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

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
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
              <Search toggleModal={this.toggleModal} />
              <BookShelf
                books={allBooks.filter(book => book.shelf === 1)}
                shelfTitle="Reading"
                shelfNumber={1}
                removeBook={this.removeBook}
                moveBook={this.moveBooksFromShelf}
              />
              <BookShelf
                books={allBooks.filter(book => book.shelf === 2)}
                shelfTitle="What to Read"
                shelfNumber={2}
                removeBook={this.removeBook}
                moveBook={this.moveBooksFromShelf}
              />
              <BookShelf
                books={allBooks.filter(book => book.shelf === 3)}
                shelfTitle="Read"
                shelfNumber={3}
                removeBook={this.removeBook}
                moveBook={this.moveBooksFromShelf}
              />
            </div>
          </div>

          <button className="open-search" onClick={this.toggleModal} />

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
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className="modal-container"
          >
            <ModalHeader toggle={this.toggle}>
              Mariya&apos;s Tiiiiight vag
            </ModalHeader>
            <ModalBody>
              This is where you might describe how wet it is
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleModal}>Get in There</Button>{' '}
              <Button
                color="secondary"
                onClick={this.toggleModal}
              >
                Wish you were in there already
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

    );
  }
}
export default Readable;
