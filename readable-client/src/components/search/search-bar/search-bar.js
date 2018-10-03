import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import '../../../App.css';


const SearchBar = (props) => {
  const {
    dropdownOpen,
    handleInputChange,
    handleSelectSearchText,
    searchTerm,
    searchCategory,
    toggleDropDown,
  } = props;

  return (
    <InputGroup>
      <InputGroupButtonDropdown
        addonType="prepend"
        isOpen={dropdownOpen}
        toggle={toggleDropDown}
        className="dropdown-button"
      >
        <DropdownToggle caret className="search-dropdown">
          {searchCategory}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => handleSelectSearchText('Title')}
          >
            Title
          </DropdownItem>
          <DropdownItem
            onClick={() => handleSelectSearchText('Author')}
          >
            Author
          </DropdownItem>
          <DropdownItem
            onClick={() => handleSelectSearchText('ISBN')}
          >
            ISBN
          </DropdownItem>
        </DropdownMenu>
      </InputGroupButtonDropdown>
      <Input onChange={handleInputChange} value={searchTerm} />
    </InputGroup>
  );
};


SearchBar.propTypes = {
  dropdownOpen: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectSearchText: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
  toggleDropDown: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default SearchBar;
