import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
  }

  updateQuery = (query) => {
    this.setState({ query });
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
              BooksAPI.search(query).then((books) => {
                this.setState({ books });
              });
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
          <ol className="books-grid">
            {books.length > 0 && (books.map((book) => {
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
            }))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;