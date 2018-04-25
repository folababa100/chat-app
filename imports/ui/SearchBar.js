import React from 'react';
import Ionicon from 'react-ionicons';
import { Messages } from "../api/messages";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  onChange(e) {
    e.preventDefault()

  }
  render() {
    return (
      <div>
        <form className="boxed-view__form1">
            <input type="search" placeholder="Search for chat"/>
        </form>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('messages')
  return {
    messages: Messages.find().fetch()
  }
})(SearchBar)
