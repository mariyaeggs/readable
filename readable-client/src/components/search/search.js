import React from 'react';
import SearchBar from './search-bar/search-bar'
import SearchResults from './search-results/search-results'
import '../../App.css';
import * as BooksAPI from '../../utils/BooksAPI';

export default class Search extends React.Component {
  state = {
    dropdownOpen: false,
    searchCategory: 'Search By',
    searchResults: [],
  };

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleSelectSearchText = category => {
    this.setState({searchCategory: category})
  }

  handleInputChange = event => {
    const searchTerm = event.target.value;
    if (searchTerm === '') {
      this.setState({searchResults: []})
      return
    }

    const { searchCategory } = this.state;

    BooksAPI.search(searchTerm, searchCategory).then((results) => {
      if (results.length) {
        this.setState({searchResults: results})
      } else {
        this.setState({searchResults: [{title: 'Try another search term', book_id: 1}]})
      }
    })
  }


  render() {
    const { searchCategory, searchResults, dropdownOpen } = this.state;
    return (
      <div>
        <SearchBar
          dropdownOpen={dropdownOpen}
          handleInputChange={this.handleInputChange}
          handleSelectSearchText={this.handleSelectSearchText}
          searchCategory={searchCategory}
          toggleDropDown={this.toggleDropDown}
        />
        <SearchResults searchResults={searchResults} />
      </div>
    );
  }
}
