import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import Ionicon from 'react-ionicons';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isOpen: false
    }
  }
  handleModalClose() {
    return this.setState({ isOpen: false, error: '' })
  }
  render() {
    return (
      <div>
        <Ionicon className="icon__search1" icon="md-more" onClick={() => this.setState({ isOpen: true })} fontSize="35px" color="#fff" beat={true}/>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleModalClose.bind(this)}
          ariaHideApp={false}
          className="boxed-view__box1 box-align"
          overlayClassName="boxed-view1 boxed-view--modal1"
        >
          <Link className="a button1" to="/create">New Group</Link>
          <a className="button1">Starred Messages</a>
          <a className="button1">Settings</a>
          <a className="button1" onClick={() => Accounts.logout()}>Logout</a>
        </Modal>
      </div>
    )
  }
}

// Header.PropTypes = {
//   title: PropTypes.string.isRequired
// }
