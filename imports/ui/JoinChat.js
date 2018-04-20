import React from 'react';
import { Groups } from "../api/groups";
import { Tracker } from 'meteor/tracker'

export default class JoinChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    }
  }
  componentDidMount() {
    this.GroupsTrackerList = Tracker.autorun(() => {
      Meteor.subscribe('groups');
      const groups = Groups.find().fetch();
      this.setState({ groups })
    })
  }
  componentWillUnmount() {
    this.GroupsTrackerList.stop()
  }
  renderGroupList() {
    return this.state.groups.map((group) => {
      return (
        <div key={group._id}>
          <div>
            <p>{group.description}</p>
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        {this.renderGroupList()}
      </div>
    )
  }
}
