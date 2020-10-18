import React from "react";
import "./Header.css";
import logo from "./logo.svg";
const Header = () => {
  return (
    <div className="App">
      <header padding-top="10%" className="App-header" margin="0">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <div width="100vp">
          <hr width="100%"></hr>

          <h1 >Now Playing.......</h1>


          <hr width="100%"></hr>
        </div>




        <iframe class="if" width="1000" height="50" src="https://editor.p5js.org/p5user1/embed/aOT3dzdd1"></iframe>

      </header>

    </div>

  );
}


export default Header;
