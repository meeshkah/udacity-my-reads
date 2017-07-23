import React from 'react';

const BookShelfChanger = (props) => (
    <div className="book-shelf-changer">
      <select
        value={ props.currentShelf || 'none' }
        onChange={(event) => props.onUpdateShelf(event.target.value) }
      >
        <option value="" disabled>Move to...</option>
        {props.shelves.map(shelf => (
          <option key={ shelf.id } value={ shelf.id }>
            { shelf.title }
          </option>
        ))}
      </select>
    </div>
);

export default BookShelfChanger;