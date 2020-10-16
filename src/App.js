import React from 'react';
import './App.css';
import Header from './components/Header/index';
import Footer from './components/Footer/index';

class App extends React.Component {
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
