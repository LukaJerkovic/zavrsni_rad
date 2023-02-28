import React, { Component } from 'react';
import './App.css';
import Messages from './Components/Messages/Messages';
import Input from './Components/Input/Input';
import L from './assets/L.png';

const names = [
  'Olivia',
  'Ethan',
  'Sophia',
  'Liam',
  'Ava',
  'Jackson',
  'Isabella',
  'Lucas',
  'Mia',
  'Aiden',
  'Charlotte',
  'Noah',
  'Amelia',
  'Caden',
  'Harper',
  'Grayson',
  'Abigail',
  'Mason',
  'Emily',
  'Logan',
  'Madison',
  'Elijah',
  'Sofia',
  'Oliver',
  'Scarlett',
  'Jacob',
  'Victoria',
  'Ethan',
  'Zoe',
];

const lastnames = [
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Perez',
  'Smith',
  'Lee',
  'Wilson',
  'Anderson',
  'Thompson',
  'Nguyen',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Moore',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
];

function randomName() {
  const name = names[Math.floor(Math.random() * names.length)];
  const lastname = lastnames[Math.floor(Math.random() * lastnames.length)];
  return name + ' ' + lastname;
}

function randomImage() {
  const imageDirectory = './profile_pics/';
  const images = [
    'Profile2.png',
    'Profile3.png',
    'Profile5.png',
    'Profile6.png',
    'Profile7.png',
    'Profile8.png',
    'Profile9.png',
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return imageDirectory + randomImage;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  constructor() {
    super();
    this.image = randomImage();
  }

  componentDidMount() {
    if (this.drone) return;

    this.drone = new window.Scaledrone('YuWwUvSIMjwkbzvA', {
      data: this.state.member,
    });
    this.drone.on('open', (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe('observable-room');
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="navbar bg-blue-500">
          <div className="flex-1">
            <a
              className="btn btn-ghost normal-case text-xl flex items-center gap-2"
              href="https://github.com/LukaJerkovic"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', width: 'auto', height: 'auto' }}
            >
              <img src={L} alt="GitHub Profile" className="h-14 w-auto" />
            </a>
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl text-white">Algebra chat</p>
          </div>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={this.image} alt="Avatar" />
            </div>
          </div>
        </div>

        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: 'observable-room',
      message,
    });
  };
}

export default App;
