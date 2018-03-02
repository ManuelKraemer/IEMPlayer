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
      value: 100,
      density:{
        enable: true,
        value_area: 600 
      }
    },
    "move": {
      "enable": false,  //Just for testing!
      "speed": 2,
      "direction": "bottom",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 3447.335930860874,
        "rotateY": 3607.6771369474263
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    },
    "modes": {
      "repulse": {
        "distance": 60
      }
    }
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageURL: '',
      box: {}
    }
  }

  calculateFace = (data) => {
    const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - boundingBox.right_col * width,
      bottomRow: height - boundingBox.bottom_row * height,
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () =>{
    this.setState({imageURL: this.state.input});
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      this.displayFaceBox(this.calculateFace(response));
    }).catch((err)=>{
      console.log("something went wrong");
    });

  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLink onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} ImageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
