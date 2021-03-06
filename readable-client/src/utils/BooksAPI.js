/**
 * @file BooksAPI - all endpoints in use by application.
 */
import fetch from 'isomorphic-fetch';


// API Constant
const api = 'http://readable-server-dev.us-east-1.elasticbeanstalk.com/';
// const api = 'http://localhost:5000';

// Headers to be included with each request
const headers = {
  Accept: 'application/json',
};

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json());

export const updateShelf = (bookId, shelf) =>
  fetch(`${api}/book/${bookId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  }).then(res => res.json());

export const removeBook = bookId =>
  fetch(`${api}/book/${bookId}`, { method: 'DELETE', headers, 'Content-Type': 'application/json' });

export const createBook = bookData =>
  fetch(`${api}/book`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  }).then(res => res.json());


export const search = (searchTerm, searchCategory) =>
  fetch(`${api}/library-book/search?term=${searchTerm}&category=${searchCategory}`, { headers })
    .then(res => res.json());
