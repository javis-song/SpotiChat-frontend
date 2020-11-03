import React, { Component } from 'react';
import './ChatRoom.css';
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const adjectives = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
    "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
    "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
    "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
    "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
    "ancient", "purple", "lively", "nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class ChatRoom extends Component {
  state = {
    messages: [
      {
        text: "Please wait for others to come!", 
        member: {self: false}
      }],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }

  // constructor(props) {
  //   super();
  //   this.drone = new window.Scaledrone("IWSTlGBpcJLDYyhH", {
  //     data: this.state.member
  //   });
  //   this.drone.on('open', error => {
  //     if (error) {
  //       return console.error(error);
  //     }
  //     const member = {...this.state.member};
  //     member.id = this.drone.clientId;
  //     this.setState({member});
  //   });
  //   const room = this.drone.subscribe("observable-room");
  //   room.on('data', (data, member) => {
  //     const messages = this.state.messages;
  //     messages.push({member, text: data});
  //     this.setState({messages});
  //   });
  // }

  // shouldComponentUpdate(newProps, newState) {
  //   if (newState.messages.length === this.state.messages.length && newProps.socket === this.props.socket) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    return (
      <div className="ChatRoom">
        {/*<div className="ChatRoom-header">*/}
        {/*  <h1>Chat Room</h1>*/}
        {/*</div>*/}
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.socket !== undefined && this.props.username !== null && (prevProps.socket !== this.props.socket || prevProps.username !== this.props.username)) {
      const socket = this.props.socket;
      socket.on("message", message => {
        this.setState({
          messages: [...this.state.messages, message]
        })
      });
    }
  }

  onSendMessage = (message) => {
    const newMessage = {
      member: {
        self: true,
        username: this.props.username,
      },
      text: message
    };
    this.setState({messages: [...this.state.messages, newMessage]});

    let socket = this.props.socket;
    if (socket === undefined) return;
    let messageToOther = {
      member: {
        self: true,
        username: this.props.username,
      },
      text: message
    };
    messageToOther.member.self = false;
    socket.emit('message', messageToOther);
    // this.drone.publish({
    //   room: "observable-room",
    //   message
    // });
  }

}

export default ChatRoom;
