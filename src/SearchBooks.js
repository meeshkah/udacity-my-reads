import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBooks.css';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import BooksGrid from './BooksGrid';
import SearchBooksBulkWidget from './SearchBooksBulkWidget';

class SearchBooks extends Component {
  static propTypes = {
    shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAddBook: PropTypes.func.isRequired,
    onAddBooks: PropTypes.func.isRequired,
    booksInLibrary: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    query: '',
    books: [],
    selectedBooks: [],
  }

  updateQuery = (query) => {
    this.setState({ query });
  }

  getBooks(query) {
    BooksAPI.search(query).then((books) => books.length > 0 && this.setState({ books }));
  }

  selectBook(book) {
    this.setState((state) => ({
      selectedBooks: state.selectedBooks.includes(book) ?
                     state.selectedBooks.filter((b) => b.id !== book.id) :
                     state.selectedBooks.concat([ book ]),
    }));
  }

  render() {
    const { query, books, selectedBooks } = this.state;
    const { shelves, onAddBook, onAddBooks, booksInLibrary} = this.props;

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
        {selectedBooks.length > 0 && (
          <SearchBooksBulkWidget
            shelves={shelves}
            numberOfBooks={selectedBooks.length}
            onClearFilter={() => this.setState({ selectedBooks: [] })}
            onUpdateBooks={(shelfId) => {
              onAddBooks(selectedBooks, shelfId);
              this.setState({
                selectedBooks: [],
              });
            }}
          />
        )}
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
            selectedBooks={selectedBooks}
            shelves={shelves}
            markBooksInLibrary={true}
            onSelectBook={(book) => this.selectBook(book)}
            onUpdateShelf={(book, shelfId) => onAddBook(book, shelfId)}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
