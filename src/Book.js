import React, { Component } from 'react';
import './Book.css';

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
    const shelves = this.props.shelves.concat({ id: 'none', title: 'None'});

    return (
      <div className={`book ${this.props.className}`}>
        <div className="book-top">
          <div className="book-cover" style={{ width: this.state.dimensions.width, height: this.state.dimensions.height, backgroundImage: `url("${ this.props.imageUrl }")` }}></div>
          <div className="book-shelf-changer">
            <select
              value={ this.props.currentShelf || 'none' }
              onChange={(event) => this.props.onUpdateShelf(event.target.value) }
            >
              <option value="" disabled>Move to...</option>
              {shelves.map(shelf => (
                <option key={ shelf.id } value={ shelf.id }>
                  { shelf.title }
                </option>
              ))}
            </select>
          </div>
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