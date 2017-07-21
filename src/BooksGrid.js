import React, { Component } from 'react';
import Book from './Book';

class BooksGrid extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.length > 0 && this.props.books.map((book) => (
          <li key={ book.id }>
            <Book
              title={ book.title }
              authors={ book.authors }
              imageUrl={book.imageLinks.smallThumbnail}
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
