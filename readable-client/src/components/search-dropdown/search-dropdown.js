import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';


export default class SearchDropdown extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    divider: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    header: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    toggle: PropTypes.bool, // default: true
  };

  state = {
    dropdownOpen: false,
    searchCategory: 'Search By'
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleItemClick = (name) => {
    this.setState({ searchCategory: name })
  }

  render() {
    const { searchCategory } = this.state;
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle className="search-dropdown">
          {searchCategory}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.handleItemClick('Title')}>
            Title
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => this.handleItemClick('Author')}>
            Author
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => this.handleItemClick('ISBN')}>
            ISBN
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
