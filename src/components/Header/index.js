import React from "react";
import "./Header.css";
import logo from "./logo.svg";
import logo2 from "./spotichat.gif"
import UserDetails from '../UserDetails/index.js';

const Header = (props) => {
  return (
    <div className="Header">
      <UserDetails image={props.image} username={props.username} />
        {/* // <header className="App-header">
        //   <img src={logo2}  alt="logo" />
        // </header> */}
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <hr></hr>
          <h1 >Now Playing.......</h1>
          <hr class="hr"></hr>

        <iframe class="if" src="https://editor.p5js.org/p5user1/embed/aOT3dzdd1"></iframe>

      </header>

    </div>

  );
}


export default Header;
