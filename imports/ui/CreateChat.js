import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Modal from 'react-modal'
import { Meteor } from "meteor/meteor";
import PropTypes from 'prop-types';
import PrivateHeader from './PrivateHeader';

export default class CreateChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      name: '',
      description: '',
      isOpen: false
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let name = this.refs.name.value.trim();
    let description = this.refs.description.value.trim();

    Meteor.call('groups.insert', name, description, (err, res) => {
      if (!err) {
        this.handleModalClose()
      } else {
        this.setState({ error: err.reason })
      }
    })
  }
  onChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  handleModalClose() {
    this.setState({ isOpen: false, name: '', description: '', error: "" })
  }
  onChanger(e) {
    this.setState({
      description: e.target.value
    })
  }
  render() {
    return (
      <div>
        <PrivateHeader/>
        <button className="button button--bottom" onClick={() => this.setState({ isOpen: true })}>
          Create Group
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onRequestClose={this.handleModalClose.bind(this)}
          ariaHideApp={false}
          className="boxed-view__box"
          overlayClassName="boxed-view1 boxed-view--modal"
        >
          <form noValidate onSubmit={this.onSubmit.bind(this)} className="boxed-view__form1">
            <input type="name" ref="name" placeholder="Group Name" name="name" onChange={this.onChange.bind(this)} />
            <input type="description" ref="description" placeholder="Description of the Group" name="description" onChange={this.onChanger.bind(this)} />
            <button className="button">Create Group</button>
          </form>
        </Modal>
      </div>
    )
  }
}
