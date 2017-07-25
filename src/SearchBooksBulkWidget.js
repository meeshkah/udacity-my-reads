import React from 'react';
import PropTypes from 'prop-types';
import './SearchBooksBulkWidget.css';

const SearchBooksBulkWidget = (props) => {
  return (
    <div className="search-books-bulk-widget">
      <div className="search-books-bulk-widget-text">
        Move {props.numberOfBooks} book{props.numberOfBooks > 1 && 's'}
        <a onClick={() => props.onClearFilter()}>Clear filter</a>
      </div>
      <div className="book-shelf-changer">
        <select
          value="empty"
          onChange={(event) => props.onUpdateBooks(event.target.value)}
        >
          <option value="empty" disabled>Move to...</option>
          {props.shelves.map(shelf => (
            <option key={ shelf.id } value={ shelf.id }>
              { shelf.title }
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

SearchBooksBulkWidget.PropTypes = {
  shelves: PropTypes.array.isRequired,
  onClearFilter: PropTypes.func.isRequired,
  onUpdateBooks: PropTypes.func.isRequired,
  numberOfBooks: PropTypes.number,
}

export default SearchBooksBulkWidget;
