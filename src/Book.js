import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Book.css';

import BookShelfChanger from './BookShelfChanger';

class Book extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageUrl: PropTypes.string.isRequired,
    shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    isInLibrary: PropTypes.bool,
    isSelected: PropTypes.bool,
    currentShelf: PropTypes.string,
  }

  state = {
    dimensions: {
      width: 135,
      height: 200,
    }
  }

  componentDidMount() {
    const coverImage = new Image();
    coverImage.src = this.props.imageUrl;
    coverImage.addEventListener('load', (event) => {
      if (event.returnValue) {
        this.setState((state) => {
          if (state.dimensions.height / state.dimensions.width >
              event.path[0].naturalHeight / event.path[0].naturalWidth) {
            return {
              dimensions: {
                width: state.dimensions.width,
                height: event.path[0].naturalHeight * state.dimensions.width / event.path[0].naturalWidth,
              }
            }
          } else {
            return {
              dimensions: {
                width: event.path[0].naturalWidth * state.dimensions.height / event.path[0].naturalHeight,
                height: state.dimensions.height,
              }
            }
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
