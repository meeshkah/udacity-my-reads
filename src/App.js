import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

import Book from './Book';
import SearchBooks from './SearchBooks';

const shelves = [
  { id: 'currentlyReading', title: 'Currently Reading'},
  { id: 'wantToRead', title: 'Want To Read'},
  { id: 'read', title: 'Read'},
];

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  getBooksOnShelf(shelfId) {
    return this.state.books.filter(book => book.shelf === shelfId);
  }

  putBookOnShelf(book, shelfId) {
    this.setState((state) => {
      const bookToChange = state.books.find(b => b.id === book.id);
      if (bookToChange) {
        bookToChange.shelf = shelfId;
        return {
          books: state.books.filter(b => b.id !== book.id).concat([ bookToChange ]),
        }
      } else {
        book.shelf = shelfId;
        return {
          books: state.books.concat([ book ]),
        }
      }
    });
  }

  render() {
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
              <div className="list-books-content">
                <div>
                {shelves.map((shelf) => (
                  <div key={shelf.id} className="bookshelf">
                    <h2 className="bookshelf-title">{ shelf.title }</h2>
                    <div className="bookshelf-books">
                      {this.getBooksOnShelf(shelf.id) && this.getBooksOnShelf(shelf.id).length ? (
                        <ol className="books-grid">
                          {this.getBooksOnShelf(shelf.id).map((book) => (
                            <li key={ book.id }>
                              <Book
                                title={ book.title }
                                authors={ book.authors }
                                imageUrl={book.imageLinks.smallThumbnail}
                                shelves={shelves}
                                currentShelf={book.shelf}
                                onUpdateShelf={(shelfId) => {
                                  this.putBookOnShelf(book, shelfId);
                                }}
                              />
                            </li>
                          ))}
                        </ol>
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
              shelves={shelves}
              onAddBook={(book, shelfId) => {
                this.putBookOnShelf(book, shelfId);
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
