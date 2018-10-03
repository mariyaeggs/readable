import React from 'react';
import findIndex from 'lodash.findindex';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';
import { BookShelf, Search } from './components';


class Readable extends React.Component {
  state = {
    allBooks: [],
    title: '',
    author: '',
    imageUrl: '',
    isbn: '',
    shelf: 3,
    modal: false,
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ allBooks: books });
    });
  }

  setSearchResultToCreateForm = (book) => {
    const newBook = book;
    newBook.shelf = 1;
    this.setState({
      title: newBook.title,
      author: newBook.author,
      isbn: newBook.isbn,
      imageUrl: newBook.imageUrl,
      shelf: newBook.shelf,
    });
  }

  createBookFromModal = () => {
    const {
      title, shelf, author, isbn, imageUrl,
    } = this.state;

    const newBook = {
      title, shelf, author, isbn, imageUrl,
    };
    this.createBook(newBook);
    this.toggleModal();
  }

  createBook = (bookData) => {
    const { allBooks } = this.state;
    BooksAPI.createBook(bookData).then((createdBook) => {
      allBooks.push(createdBook);
      this.setState({ allBooks });
      window.scrollTo(0, 0);
    });
    this.setState({
      shelf: 3, imageUrl: '', author: '', title: '', isbn: '',
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

  moveBooksFromShelf = (bookId, shelf) => {
    const { allBooks } = this.state;
    BooksAPI.updateShelf(bookId, shelf).then((updatedBook) => {
      const index = findIndex(allBooks, { bookId: updatedBook.bookId });
      allBooks.splice(index, 1, updatedBook);
      this.setState({ allBooks });
    });
  }

  handleISBNChange = (event) => {
    this.setState({ isbn: event.target.value });
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

  setBlankCreateForm = () => {
    this.setState ({
      title: '',
      shelf: 1,
      author: '',
      isbn: '',
      imageUrl: '',
    });
    this.toggleModal();
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
              <Search
                toggleModal={this.toggleModal}
                setSearchResultToCreateForm={this.setSearchResultToCreateForm}
              />
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

          <button className="open-search" onClick={this.setBlankCreateForm} />
        </div>
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className="modal-container"
          >
            <ModalHeader toggle={this.toggle}>
              Add a book
            </ModalHeader>
            <ModalBody>
              <Form className="modal-form">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    placeholder="Book Title"
                    onChange={this.handleTitleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Author</Label>
                  <Input
                    type="text"
                    name="author"
                    id="author"
                    value={author}
                    placeholder="Book Author"
                    onChange={this.handleAuthorChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Image URL</Label>
                  <Input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={imageUrl}
                    placeholder="Book Image URL"
                    onChange={this.handleUrlChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>ISBN</Label>
                  <Input
                    type="text"
                    name="isbn"
                    id="isbn"
                    value={isbn}
                    placeholder="Book ISBN"
                    onChange={this.handleISBNChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label >Shelf</Label>
                  <Input
                    type="select"
                    name="shelf"
                    id="shelf"
                    value={shelf}
                    onChange={this.handleSelectShelf}
                  >
                    <option value={1}>Reading</option>
                    <option value={2}>Want to Read</option>
                    <option value={3}>Read</option>
                  </Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={this.createBookFromModal}
              >
                Add Book
              </Button>
              <Button
                color="secondary"
                onClick={this.toggleModal}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

    );
  }
}
export default Readable;
