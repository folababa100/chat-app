import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import FlipMove from 'react-flip-move';
import Ionicon from 'react-ionicons';
import Modal from 'react-modal';
import PropTypes from 'prop-types'

export class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isOpen: false
    }
  }
  handleMessageRemoval() {
    this.props.call('messages.remove', this.props.message._id)
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
  render() {
    return (
      <div>
        <div key={this.props.message._id} className="card">
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
              <p className="card-text">{this.props.message.text}</p>
            </div>
            <div className="stat">
              <p className="card-recieved">{this.props.message.whenMessageRecievied}</p>
              <p className="card-username">{Meteor.user().username}</p>
            </div>
          </div>
        </div>
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}
        >
        </div>
      </div>
    )
  }
}

ChatList.propTypes = {
  call: PropTypes.func.isRequired,
  track: PropTypes.func.isRequired
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    call: Meteor.call
  }
})(ChatList)
