import React from 'react';
import Ionicon from 'react-ionicons';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <form className="boxed-view__form1">
            <Ionicon className="icon__search" icon="ios-search" fontSize="35px" color="#C9C9C9"/>
            <input type="search" placeholder="Search for chat"/>
        </form>
      </div>
    )
  }
}
