import React from 'react';
import SearchBar from './search-bar/search-bar';
import SearchResults from './search-results/search-results';
import '../../App.css';
import * as BooksAPI from '../../utils/BooksAPI';

export default class Search extends React.Component {
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
    console.log('clicked');
    console.log(bookId);
    this.setState({ searchResults: [] });
  }

  handleInputChange = (event) => {
    const { searchCategory } = this.state;
    if (searchCategory === 'Search By') {
      return;
    }
    this.setState({ searchTerm: event.target.value });
    const { searchTerm } = this.state;

    if (searchTerm === '') {
      this.setState({ searchResults: [] });
      return;
    }

    BooksAPI.search(searchTerm, searchCategory).then((results) => {
      if (results.length) {
        this.setState({ searchResults: results });
      } else {
        this.setState({
          searchResults: [{
            title: 'Try another search term',
            book_id: 1,
            image_url: '../../../public/book_not_found.png',
          }]
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
        <SearchResults searchResults={searchResults} handleResultClick={this.handleResultClick} />
      </div>
    );
  }
}
