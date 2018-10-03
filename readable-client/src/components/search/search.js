import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './search-bar/search-bar';
import SearchResults from './search-results/search-results';
import '../../App.css';
import * as BooksAPI from '../../utils/BooksAPI';

const DEFAULT_SEARCH_TERM = 'Please select a term to search by';
const DEFAULT_SEARCH_CATEGORY = 'Search By';

class Search extends React.Component {
  state = {
    dropdownOpen: false,
    searchCategory: DEFAULT_SEARCH_CATEGORY,
    searchResults: [],
    searchTerm: DEFAULT_SEARCH_TERM,
  };

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleResultClick = (bookId) => {
    const { toggleModal, setSearchResultToCreateForm } = this.props;
    const { searchResults } = this.state;
    const searchBook = searchResults.filter(book => book.bookId === bookId)[0];
    this.setState({ searchResults: [], searchTerm: '' });
    setSearchResultToCreateForm(searchBook);
    toggleModal();
  }

  handleSelectSearchText = (category) => {
    this.setState({ searchCategory: category, searchTerm: '' });
  }

  handleInputChange = (event) => {
    const { searchCategory } = this.state;
    if (searchCategory === DEFAULT_SEARCH_CATEGORY) {
      return;
    }

    const searchTerm = event.target.value;
    this.setState({ searchTerm });
    if (searchTerm === '') {
      this.setState({ searchResults: [] });
      return;
    }

    const baseUrl = 'http://andrewcmaxwell.com/wp-content';

    BooksAPI.search(searchTerm, searchCategory).then((results) => {
      if (results.length) {
        this.setState({ searchResults: results });
      } else {
        this.setState({
          searchResults:
            [
              {
                title: 'Try another search term',
                bookId: 1,
                imageUrl: `${baseUrl}/themes/acm_2014/images/book_not_found.png`,
              },
            ],
        });
      }
    });
  }


  render() {
    const {
      searchCategory, searchResults, searchTerm, dropdownOpen,
    } = this.state;


    return (
      <div className="search-bar">
        <SearchBar
          dropdownOpen={dropdownOpen}
          handleInputChange={this.handleInputChange}
          handleSelectSearchText={this.handleSelectSearchText}
          searchTerm={searchTerm}
          searchCategory={searchCategory}
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
  setSearchResultToCreateForm: PropTypes.func.isRequired,
};

export default Search;
