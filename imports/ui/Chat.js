import React from 'react';
import { Messages } from "../api/messages";
import { withTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import ChatList from './ChatList';
import PropTypes from 'prop-types';
import ChatEmpty from './ChatEmpty';
import PrivateHeader from './PrivateHeader'

export class Chat extends React.Component {
  scrollToBottom() {
    return this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }
  render() {
    return (
      <div>
        <PrivateHeader/>
        {this.props.messages.length === 0 ? <ChatEmpty /> : undefined}
        {this.props.messages.map((message) => {
          return <ChatList key={message._id} message={message} />
        })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}
        >
        </div>
      </div>
    )
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired
}

export default withTracker(() => {
  const selectedMessageId = Session.get('selectedMessageId')
  Meteor.subscribe('messages')
  return {
    messages: Messages.find().fetch().map((message) => {
      return {
        ...message,
        selected: message._id === selectedMessageId
      }
    })
  }
})(Chat)
