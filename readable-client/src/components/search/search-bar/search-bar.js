import React from 'react';
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';
import '../../../App.css';
import PropTypes from 'prop-types'

export default class SearchBar extends React.Component {
  static propTypes = {
    dropdownOpen: PropTypes.bool,
    handleInputChange: PropTypes.func,
    handleSelectSearchText: PropTypes.func,
    searchCategory: PropTypes.string,
    toggleDropDown: PropTypes.func,
  };


  render() {
    const {
      dropdownOpen,
      handleInputChange,
      handleSelectSearchText,
      searchCategory,
      toggleDropDown,
    } = this.props;

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
          <Input onChange={handleInputChange}/>
        </InputGroup>
      </div>
    );
  }
}
