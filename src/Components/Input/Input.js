import { Component } from 'react';
import React from 'react';

class Input extends Component {
  state = {
    text: '',
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: '' });
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <div className="bg-blue-500 fixed bottom-0 w-full py-10 shadow-lg">
        <form
          onSubmit={(e) => this.onSubmit(e)}
          className="px-2 containerWrap flex"
        >
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            className="input w-full focus:outline-none bg-gray-100 rounded-r-none text-black"
            type="text"
            placeholder="Enter your message..."
            autoFocus={true}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
