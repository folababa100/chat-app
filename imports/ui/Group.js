import React from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import { withTracker } from "meteor/react-meteor-data";

export class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      error: ''
    }
  }
  onChange(e) {
    this.setState({
      description: e.target.value
    })
  }
  onSubmit(e) {
    const { description } = this.state;

    e.preventDefault()

    this.props.call('groups.insert', description, (err, res) => {
      if (!err) {
        this.setState({ error: '', description: '' })
      } else {
        this.setState({ error: err.reason })
      }
    })
  }
  render() {
    return (
      <div className="sidebar__content">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" placeholder="Type a group subject" onChange={this.onChange.bind(this)} ref="description" value={this.state.description}/>
          <button onSubmit={this.onSubmit.bind(this)}>Create</button>
        </form>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    call: Meteor.call
  }
})(Group)
