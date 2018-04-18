import React from "react";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { Messages } from "../api/messages";
import { withTracker } from "meteor/react-meteor-data";
import FlipMove from 'react-flip-move';
import Ionicon from 'react-ionicons';
import Modal from 'react-modal';

export class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      error: '',
      isOpen: false
    }
  }
  handleMessageRemoval() {
    Meteor.call('messages.remove', this.props.message._id)
  }
  handleModalClose() {
    return this.setState({ isOpen: false, error: '' })
  }
  scrollToBottom() {
    return this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
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
            <div className="stat2">
              <Ionicon icon="ios-arrow-down" beat={true} className="ios-arrow-down" fontSize="2rem" onClick={() => this.setState({ isOpen: true })} />
              <FlipMove
                maintainContainerHeight={true}
              >
                <Modal
                  isOpen={this.state.isOpen}
                  onRequestClose={this.handleModalClose.bind(this)}
                  ariaHideApp={false}
                  className="boxed-view__box2 box-align1"
                  overlayClassName="boxed-view1 boxed-view--modal1"
                >
                  <a className="button1">Star</a>
                  <a className="button1">Copy</a>
                  <a className="button1" onClick={() => Meteor.call('messages.remove', this.props.message._id)}>Delete</a>
                </Modal>
              </FlipMove>
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

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    message: Messages.findOne(selectedNoteId)
  }
})(ChatList)
