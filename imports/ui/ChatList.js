import React from "react";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { Messages } from "../api/messages";
import FlipMove from 'react-flip-move'
import Ionicon from 'react-ionicons'

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }
  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.MessagesTracker = Tracker.autorun(() => {
      Meteor.subscribe('messages');
      const messages = Messages.find().fetch();
      this.setState({ messages });
    })
    this.scrollToBottom()
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.MessagesTracker.stop()
  }
  renderChatMessages() {
    return this.state.messages.map((message) => {
      return (
        <div key={message._id} className="card">
          <div className="card-body">
            <div className="stat2" onDragEnter={true}>
              <Ionicon icon="ios-arrow-down" fontSize="2rem" />
            </div>
            <div className="stat1">
              <p className="card-text">{message.text}</p>
            </div>
            <div className="stat">
              <p className="card-recieved">{message.whenMessageRecievied}</p>
              <p className="card-username">{Meteor.user().username}</p>
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderChatMessages()}
        </FlipMove>
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}
        >
        </div>
      </div>
    )
  }
}
