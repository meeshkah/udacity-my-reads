import React from 'react';
import PropTypes from 'prop-types';
import './BooksGrid.css';
import Book from './Book';

const BooksGrid = (props) => {
  return (
    <ol className="books-grid">
      {props.books.length > 0 && props.books.map((book) => (
        <li 
          key={ book.id }
          className={props.selectedBooks.includes(book) ? 'is-selected' : ''}
        >

          <label htmlFor={ book.id }>
            <input
              id={ book.id }
              className="book-select"
              type="checkbox"
              onChange={(event) => {
                props.onSelectBook(book);
              }}
              checked={props.selectedBooks && 
                       props.selectedBooks.includes(book)}
            />
            <span className="book-select-display"></span>
          </label>
          <Book
            title={book.title}
            authors={book.authors}
            imageUrl={book.imageLinks.smallThumbnail}
            isInLibrary={
              props.markBooksInLibrary &&
              book.shelf &&
              book.shelf !== 'none'}
            isSelected={props.selectedBooks.includes(book)}
            shelves={props.shelves}
            currentShelf={book.shelf}
            onUpdateShelf={(shelfId) => {
              props.onUpdateShelf(book, shelfId);
            }}
          />
        </li>
      ))}
    </ol>
  );
}

BooksGrid.PropTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  selectedBooks: PropTypes.array,
  onSelectBook: PropTypes.func,
  onUpdateShelf: PropTypes.func,
}

export default BooksGrid;
