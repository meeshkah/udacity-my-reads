import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';

import BooksGrid from './BooksGrid';
import SearchBooks from './SearchBooks';
import SearchBooksBulkWidget from './SearchBooksBulkWidget';

const shelves = [
  { id: 'currentlyReading', title: 'Currently Reading'},
  { id: 'wantToRead', title: 'Want To Read'},
  { id: 'read', title: 'Read'},
];

class BooksApp extends React.Component {
  state = {
    books: [],
    selectedBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  getBooksOnShelf(shelfId) {
    return this.state.books.filter(book => book.shelf === shelfId);
  }

  putBookOnShelf(book, shelfId) {
    BooksAPI.update(book, shelfId).then((shelves) => {
      this.setState((state) => {
        const bookToChange = state.books.find(b => b.id === book.id);
        let updatedBooks;

        if (bookToChange) {
          bookToChange.shelf = shelfId;
          updatedBooks = state.books.filter(b => b.id !== book.id).concat([ bookToChange ]);
        } else {
          book.shelf = shelfId;
          updatedBooks = state.books.concat([ book ]);
        }

        return { books: updatedBooks };
      });
    });
  }

  selectBook(book) {
    this.setState((state) => ({
      selectedBooks: state.selectedBooks.includes(book) ? 
                     state.selectedBooks.filter((b) => b.id !== book.id) :
                     state.selectedBooks.concat([ book ]),
    }));
  }

  render() {
    const shelvesWithNone = shelves.concat([{ id: 'none', title: 'None'}]);

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {this.state.selectedBooks.length > 0 && (
                <SearchBooksBulkWidget 
                  shelves={shelvesWithNone}
                  numberOfBooks={this.state.selectedBooks.length}
                  onClearFilter={() => this.setState({ selectedBooks: [] })}
                  onUpdateBooks={(shelfId) => {
                    this.state.selectedBooks.forEach((book) => this.putBookOnShelf(book, shelfId));
                    this.setState({
                      selectedBooks: [],
                    });
                  }}
                />
              )}
              <div className="list-books-content">
                <div>
                {shelves.map((shelf) => (
                  <div key={shelf.id} className="bookshelf">
                    <h2 className="bookshelf-title">{ shelf.title }</h2>
                    <div className="bookshelf-books">
                      {this.getBooksOnShelf(shelf.id) && this.getBooksOnShelf(shelf.id).length ? (
                        <BooksGrid
                          books={this.getBooksOnShelf(shelf.id)}
                          shelves={shelvesWithNone}
                          selectedBooks={this.state.selectedBooks}
                          onSelectBook={(book) => this.selectBook(book)}
                          onUpdateShelf={(book, shelfId) => this.putBookOnShelf(book, shelfId)}
                        />
                      ) : (
                        <div>This shelf is dusty, add some books to it</div>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={(history) => (
            <SearchBooks
              shelves={shelvesWithNone}
              onAddBook={(book, shelfId) => this.putBookOnShelf(book, shelfId)}
              onAddBooks={(books, shelfId) => {
                books.forEach((book) => this.putBookOnShelf(book, shelfId));
              }}
              booksInLibrary={this.state.books}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
