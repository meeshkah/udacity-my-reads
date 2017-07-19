import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './BooksAPI';

import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  render() {
    const { query, books } = this.state;
    const { shelves, onAddBook, booksInLibrary} = this.props;
    let showingBooks;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter((book) => (match.test(book.title) || 
                                             match.test(book.authors) 
                                            ));
    } else {
      showingBooks = books;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="search"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => {
              const bookInLibrary = booksInLibrary.find(b => b.id === book.id);
              return (
                <li key={book.id}>
                  <Book
                    title={book.title}
                    authors={book.authors}
                    imageUrl={book.imageLinks.smallThumbnail}
                    shelves={shelves}
                    currentShelf={bookInLibrary && bookInLibrary.shelf}
                    onUpdateShelf={(shelfId) => {
                      onAddBook(book, shelfId);
                    }}
                  />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;