import React from "react";
import { Meteor } from "meteor/meteor";

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: ''
    }
  }
  onSubmit(e) {
    const { text } = this.state;
    e.preventDefault();
    Meteor.call("messages.insert", text, (err, res) => {
      if (!err) {
        this.setState({ error: '', text: '' })
      } else {
        this.setState({ error: err.reason })
      }
    })
  }
  onChange(e) {
    this.setState({
      text: e.target.value
    })
  }
  render() {
    return (
      <div className="page-content__footer">
        <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
          <input 
            type="text" 
            placeholder="Type a message and hit Enter"
            ref="text"
            onChange={this.onChange.bind(this)}
            value={this.state.text} 
            className="page-content__input"
          />
          {/* <button className="button button__mar">Send</button> */}
          {/* <button className="button">Send Location</button> */}
        </form>
      </div>
    )
  }
}