import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './search-bar/search-bar';
import SearchResults from './search-results/search-results';
import '../../App.css';
import * as BooksAPI from '../../utils/BooksAPI';

class Search extends React.Component {
  state = {
    dropdownOpen: false,
    searchCategory: 'Search By',
    searchResults: [],
    searchTerm: 'Please Select a Category to Search By',
  };

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleSelectSearchText = (category) => {
    this.setState({ searchCategory: category, searchTerm: '' });
  }

  handleResultClick = (bookId) => {
    const { toggleModal } = this.props;
    this.setState({ searchResults: [], searchTerm: '' });
    toggleModal();
  }

  handleInputChange = (event) => {
    const { searchCategory } = this.state;
    if (searchCategory === 'Search By') {
      return;
    }
    this.setState({ searchTerm: event.target.value });
    this.callSearch(event.target.value);
  }

  callSearch = (searchTerm) => {
    const { searchCategory } = this.state;
    if (searchTerm === '') {
      this.setState({ searchResults: [] });
      return;
    }

    const baseUrl = 'http://andrewcmaxwell.com';

    BooksAPI.search(searchTerm, searchCategory).then((results) => {
      if (results.length) {
        this.setState({ searchResults: results });
      } else {
        this.setState({
          searchResults: [{
            title: 'Try another search',
            book_id: 1,
            image_url: `${baseUrl}/wp-content/themes/acm_2014/images/book_not_found.png`,
            author: 'No results found for this search term',
          }],
        });
      }
    });
  }


  render() {
    const {
      searchCategory, searchResults, dropdownOpen, searchTerm,
    } = this.state;

    return (
      <div>
        <SearchBar
          dropdownOpen={dropdownOpen}
          handleInputChange={this.handleInputChange}
          handleSelectSearchText={this.handleSelectSearchText}
          searchCategory={searchCategory}
          searchTerm={searchTerm}
          toggleDropDown={this.toggleDropDown}
        />
        <SearchResults
          searchResults={searchResults}
          handleResultClick={this.handleResultClick}
        />
      </div>
    );
  }
}

Search.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default Search;
