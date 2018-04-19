import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";

export class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }
  onChange(e) {
    this.setState({
      description: e.target.value
    })
  }
  render() {
    return (
      <div className="sidebar__content">
        <form>
          <input type="text" placeholder="Type a group subject" onChange={this.onChange}/>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    call: Meteor.call
  }
})
