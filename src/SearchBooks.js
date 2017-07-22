import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import BooksGrid from './BooksGrid';

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
  }

  updateQuery = (query) => {
    this.setState({ query });
  }

  getBooks(query) {
    BooksAPI.search(query).then((books) => books.length > 0 && this.setState({ books }));
  }

  render() {
    const { query, books } = this.state;
    const { shelves, onAddBook, booksInLibrary} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={(event) => {
              event.preventDefault();
              this.getBooks(query);
            }}>
              <input
                type="search"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={books.map((book) => {
              const bookInLibrary = booksInLibrary.find(b => b.id === book.id);
              if (bookInLibrary) {
                book.shelf = bookInLibrary.shelf;
              } else {
                book.shelf = '';
              }
              return book;
            })}
            shelves={shelves}
            markBooksInLibrary={true}
            onUpdateShelf={(book, shelfId) => onAddBook(book, shelfId)}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;