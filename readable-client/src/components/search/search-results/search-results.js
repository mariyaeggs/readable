import React from 'react';
import { Media } from 'reactstrap';
import PropTypes from 'prop-types';
import '../../../App.css';


const SearchResults = (props) => {
  const { searchResults, handleResultClick } = props;

  const imgStyle = {
    height: '108px',
    width: '100px',
  };

  return (
    <div>
      { searchResults.slice(0, 5).map(book => (
        <Media
          key={book.book_id}
          className="search-result"
          onClick={() => handleResultClick(book.book_id)}
        >
          <Media left href="#">
            <Media
              className="search-result-img"
              style={imgStyle}
              object
              src={book.image_url}
              alt="Book cover image."
            />
          </Media>
          <Media className="search-result-body" body>
            <Media className="search-result-heading" heading>
              {book.title}
            </Media>
            {book.author}
          </Media>
        </Media>
        ))
      }
    </div>
  );
};


SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleResultClick: PropTypes.func.isRequired,
};

export default SearchResults;
