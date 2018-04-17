//const api = "mysql+pymysql://mariyaeggs:readable@dbreadable.czp7awvfoore.us-east-1.rds.amazonaws.com/dbreadable"
const api = 'http://localhost:5000';
// Generate a unique token for storing bookshelf data on the backend server
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())

export const updateShelf = (bookId, shelf) =>
  fetch(`${api}/book/${bookId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json());

export const removeBook = bookId =>
  fetch(`${api}/book/${bookId}`, { method: 'DELETE', headers });

export const createBook = bookData =>
  fetch(`${api}/book`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookData),
  }).then(res => res.json());