import React, { Component } from 'react';
import './BooksGrid.css';
import Book from './Book';

class BooksGrid extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.length > 0 && this.props.books.map((book) => (
          <li 
            key={ book.id }
            className={this.props.selectedBooks.includes(book) ? 'is-selected' : ''}
          >

            <label htmlFor={ book.id }>
              <input
                id={ book.id }
                className="book-select"
                type="checkbox"
                onChange={(event) => {
                  this.props.onSelectBook(book);
                }}
                checked={this.props.selectedBooks && 
                         this.props.selectedBooks.includes(book)}
              />
              <span className="book-select-display"></span>
            </label>
            <Book
              title={ book.title }
              authors={ book.authors }
              imageUrl={book.imageLinks.smallThumbnail}
              isInLibrary={
                this.props.markBooksInLibrary &&
                book.shelf &&
                book.shelf !== 'none'}
              isSelected={this.props.selectedBooks.includes(book)}
              shelves={this.props.shelves}
              currentShelf={book.shelf}
              onUpdateShelf={(shelfId) => {
                this.props.onUpdateShelf(book, shelfId);
              }}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default BooksGrid;
