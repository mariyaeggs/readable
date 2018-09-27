import React from 'react';
import { Media } from 'reactstrap';
import PropTypes from 'prop-types'
import '../../App.css';


export default class SearchResult extends React.Component {
    static propTypes = {
    body: PropTypes.bool,
    bottom: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    heading: PropTypes.bool,
    left: PropTypes.bool,
    list: PropTypes.bool,
    middle: PropTypes.bool,
    object: PropTypes.bool,
    right: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    top: PropTypes.bool,
  };



  render() {
    // const { searchResult } = this.props;
    const searchResult = {
      "book_id": 492,
      "image_url": "http://images.amazon.com/images/P/0812523385.01.LZZZZZZZ.jpg",
      "isbn": "0812523385",
      "author": "Emily Dickinson",
      "title": "Selected Poems of Emily Dickinson"
    }

    var imgStyle = {
      height: '100px',
      width: '100px'
    };

    return (
      <Media className="search-result">
        <Media left href="#">
          <Media className="search-result-img" style={imgStyle} object src={searchResult.image_url} alt="Book cover image." />
        </Media>
        <Media className="search-result-body" body>
          <Media className="search-result-heading" heading>
            {searchResult.title}
          </Media>
            {searchResult.author}
        </Media>
      </Media>
    );
  };
};

