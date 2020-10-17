import React from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import Header from './components/Header/index';
import Footer from './components/Footer/index';

const url = "http://127.0.0.1:8080";

class App extends React.Component {
  componentDidMount() {
    const socket = socketIOClient(url);
    socket.emit('chat message', "client");
    socket.on("chat message", data => {
      console.log(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Header />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
