import React, { Component } from 'react';
import './App.css';
import Navigation from './components/nav/nav';
import Logo from './components/logo/logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'f33c934d5fb24ea2855d949b1684c618'
 });

const particleOptions = {
  particles: {
    number:{
      value: 150,
      density:{
        enable: true,
        value_area: 600 
      }
    }
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageURL: ''
    }
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () =>{
    this.setState({imageURL: this.state.input});
    console.log(this.state.imageURL);
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );

  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLink onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition ImageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
