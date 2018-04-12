import React from 'react';
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import { Messages } from "../api/messages";

export default class StarMessages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showStarredMessages: false
    }
  }
  componentDidMount() {
    this.MessagesStarTracker = Tracker.autorun(() => {
      Session.get()
    })
  }
  componentWillUnmount() {
    this.MessagesStarTracker.stop()
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}