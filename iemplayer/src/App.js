import React, { Component } from 'react';
import './App.css';
import Navigation from './components/nav/nav';
import Logo from './components/logo/logo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        {/*<ImageLink />
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
