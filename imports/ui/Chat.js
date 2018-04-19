import React from 'react';
import { Messages } from "../api/messages";
import { withTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import ChatList from './ChatList';
import PropTypes from 'prop-types';
import ChatEmpty from './ChatEmpty';

const Chat = (props) => {
  return (
    <div>
      { props.messages.length === 0 ? <ChatEmpty/> : undefined }
      {props.messages.map((message) => {
        return <ChatList key={message._id} message={message}/>
      })}
    </div>
  )
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
