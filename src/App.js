import React from 'react';
import './App.css';
import Stager from './Components/Stage';



class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      stageWidth: 0,
      stageHeight: 0,
    }
  }
  prevTween = (e) => {
    this.mainCard.togglePrevTween()
  }

  nextTween = (e) => {
    this.mainCard.toggleNextTween()
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({stageWidth: window.innerWidth, stageHeight: window.innerHeight})
  }


  render() {
    const height = 450
    const width = 300;

    const {stageWidth, stageHeight} = this.state
    return (
      <div>
        <Stager
          stageWidth={stageWidth}
          stageHeight={stageHeight}
          width={width}
          height={height}
          reference={node => this.mainCard = node}
        />

        <div className="home">
          <button onClick={this.nextTween}>nextTween</button>
          <button onClick={this.prevTween}>prevTween</button>
        </div>

      </div>
    );
  }
}

export default App;

