import React from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import ChatRoom from "./components/ChatRoom/ChatRoom";


const url = "http://127.0.0.1:8080";

class App extends React.Component {
  state = {
    username: "song",
  }
  componentDidMount() {

    const socket = socketIOClient(url);
    socket.emit("username", this.state.username);
    socket.on("chat message", data => {
      console.log(data);
    });
    socket.emit('chat message', "hello");
    // CLEAN UP THE EFFECT
  }
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Header />
          {/*<Footer />*/}
          <ChatRoom />
        </div>
      </div>
    );
  }
}

export default App;
