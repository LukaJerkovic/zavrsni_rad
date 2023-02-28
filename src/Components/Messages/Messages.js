import { Component } from 'react';
import React from 'react';

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map((m) => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const { member, text } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? 'Messages-message currentMember'
      : 'Messages-message';
    return (
      <li className={className} key={text}>
        <div className="Message-content flex flex-col">
          <div className="flex items-center">
            <div className="username inline-flex text-lg">
              {member.clientData.username}
            </div>
            <span
              className="inline-block w-4 h-4 rounded-full bg-gray-500 ml-2"
              style={{ backgroundColor: member.clientData.color }}
            />
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
