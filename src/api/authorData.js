import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// GET ALL AUTHORS
const getAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// CREATE AUTHOR
const createAuthor = (authorObject) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObject)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload).then(() => {
        getAuthors(authorObject.uid).then(resolve);
      });
    }).catch((error) => reject(error));
});

// GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors().then(resolve);
    })
    .catch(reject);
});

// SHOW FAVE AUTHORS
const favoriteAuthor = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// FIXME: UPDATE AUTHOR
const updateAuthor = (authorObject) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/authors/${authorObject.firebaseKey}.json`, authorObject)
    .then(() => getAuthors(authorObject))
    .then(resolve)
    .catch(reject);
});

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${authorId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
  favoriteAuthor
};
