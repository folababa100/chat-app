import React from 'react';
import { Messages } from "../api/messages";
import { withTracker } from "meteor/react-meteor-data";
import ChatList from './ChatList';
import PropTypes from 'prop-types'

const Chat = (props) => {
  return (
    <div>
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
  Meteor.subscribe('messages')
  return {
    messages: Messages.find().fetch().map((message) => {
      return {
        ...message
      }
    })
  }
})(Chat)
