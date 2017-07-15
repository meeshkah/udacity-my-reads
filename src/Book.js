import React, { Component } from 'react';

class Book extends Component {
  render() {
    const dimensions = {
      width: 128,
      height: 193,
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: dimensions.width, height: dimensions.height, backgroundImage: `url("${ this.props.imageUrl }")` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              {this.props.shelves.map(shelve => <option key={ shelve.id } value={ shelve.id }>{ shelve.title }</option>)}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ this.props.title }</div>
        <div className="book-authors">{ this.props.author }</div>
      </div>
    )
  }
}

export default Book;