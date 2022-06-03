import { createAuthor, getAuthors, updateAuthor } from '../../api/authorData';
import { createBook, updateBook } from '../../api/bookData';
import { showAuthors } from '../components/pages/authors';
import { showBooks } from '../components/pages/books';

const formEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        uid
      };
      createBook(bookObject, uid).then((authorArr) => {
        showBooks(authorArr);
      });
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        firebaseKey,
        uid
      };
      updateBook(bookObject, uid).then(showBooks);
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const authorObject = {
        email: document.querySelector('#email').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        favorite: document.querySelector('#favorite').checked,
        uid
      };
      createAuthor(authorObject, uid).then(showAuthors);
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      // eslint-disable-next-line no-shadow
      const [, firebaseKey] = e.target.id.split('--');
      const authorObject = {
        email: document.querySelector('#email').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        firebaseKey,
        uid
      };
      updateAuthor(authorObject, uid).then(() => {
        getAuthors(uid).then((authorArr) => showAuthors(authorArr));
      });
    }
  });
};

export default formEvents;
