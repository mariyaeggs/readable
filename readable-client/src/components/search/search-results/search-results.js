import React from 'react';
import { Media } from 'reactstrap';
import PropTypes from 'prop-types'
import '../../../App.css';


export default class SearchResult extends React.Component {
  static propTypes = {
    searchResults: PropTypes.array
  };

  render() {
    const { searchResults } = this.props;

    const imgStyle = {
      height: '108px',
      width: '100px'
    };

    return (
      <div>
        { searchResults.slice(0,5).map(book => (
          <Media key={book.book_id} className="search-result">
            <Media left href="#">
              <Media className="search-result-img" style={imgStyle} object src={book.image_url} alt="Book cover image." />
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
};

