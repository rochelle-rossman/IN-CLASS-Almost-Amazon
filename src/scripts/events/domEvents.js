import { getSingleAuthor } from '../../api/authorData';
import { deleteBook, getSingleBook } from '../../api/bookData';
import { showBooks } from '../components/pages/books';
import { showAuthors } from '../components/pages/authors';
import viewBook from '../components/pages/viewBook';
import { deleteAuthorBooks, viewAuthorDetails, viewBookDetails } from '../../api/mergedData';
import viewAuthor from '../components/pages/viewAuthor';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObject) => addBookForm(bookObject));
    }

    // CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      viewBookDetails(firebaseKey).then((bookAuthorObject) => viewBook(bookAuthorObject));
    }

    // VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      viewAuthorDetails(firebaseKey).then((authorBooksObject) => viewAuthor(authorBooksObject));
    }

    // CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooks(firebaseKey).then((newAuthorsArray) => showAuthors(newAuthorsArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }

    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObject) => addAuthorForm(authorObject));
    }
  });
};

export default domEvents;
