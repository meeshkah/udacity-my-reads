import React, { Component } from 'react';
import './Book.css';

import BookShelfChanger from './BookShelfChanger';

class Book extends Component {
  state = {
    dimensions: {
      width: 128,
      height: 193,
    }
  }

  componentDidMount() {
    const coverImage = new Image();
    coverImage.src = this.props.imageUrl;
    coverImage.addEventListener('load', (event) => {
      if (event.returnValue) {
        this.setState({ 
          dimensions: {
            width: event.path[0].naturalWidth,
            height: event.path[0].naturalHeight,
          }
        });
      } 
    });
  }

  render() {
    return (
      <div className={`book ${this.props.isInLibrary ? 'is-in-library' : ''}`}>
        <div className="book-top">
          <div 
            className="book-cover" 
            style={{ width: this.state.dimensions.width, height: this.state.dimensions.height, backgroundImage: `url("${ this.props.imageUrl }")` }}
          >
          </div>
          <BookShelfChanger
            currentShelf={this.props.currentShelf}
            shelves={this.props.shelves}
            onUpdateShelf={(shelfId) => this.props.onUpdateShelf(shelfId)}
          />
        </div>
        <div className="book-title">{ this.props.title }</div>
        <div className="book-authors">
          { this.props.authors && this.props.authors.map((author, i) => <div key={i}>{ author }</div>) }
        </div>
      </div>
    )
  }
}

export default Book;