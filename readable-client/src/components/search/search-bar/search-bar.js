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
    searchCategory,
    toggleDropDown,
  } = props;

  return (
    <div className="search-bar">
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
        <Input onChange={handleInputChange} />
      </InputGroup>
    </div>
  );
};

SearchBar.propTypes = {
  dropdownOpen: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectSearchText: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
  toggleDropDown: PropTypes.func.isRequired,
};

export default SearchBar;
