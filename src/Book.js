import React, { Component } from 'react';

class Book extends Component {
  render() {
    const dimensions = {
      width: 128,
      height: 193,
    };
    const shelves = this.props.shelves.concat({ id: 'none', title: 'None'});

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: dimensions.width, height: dimensions.height, backgroundImage: `url("${ this.props.imageUrl }")` }}></div>
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