import { Layer, Stage, Text } from 'react-konva';
import MagicCard from './MagicCard';
import Card from '../card.png';
import React from 'react';

//TODO тут мутки со стартовой точкой
class Stager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrame: 0,
      frames: [{
        x: () => this.props.stageWidth,
        y: () => this.props.stageHeight / 2,
      }, {
        x: () => this.props.stageWidth / 2,
        y: () => this.props.stageHeight / 2,
      }, {
        x: () => 0,
        y: () => this.props.stageHeight / 2,
      },
      ],
    }
  }

  increaseCounter = () => {
    let { currentFrame } = this.state;
    currentFrame += 1;
    if (currentFrame > (this.state.frames.length - 1)) {
      currentFrame = 0;
    }
    this.setState({ currentFrame });
  }

  decreaseCounter = () => {
    let { currentFrame } = this.state;
    currentFrame -= 1;
    if (currentFrame < 0) {
      currentFrame = this.state.frames.length - 1;
    }
    this.setState({ currentFrame });
  }

  render() {
    const { stageWidth, stageHeight, height, width, reference } = this.props;
    const { currentFrame, frames } = this.state;
    const framesLength = this.state.frames.length - 1;

    const nextStep = currentFrame + 1 > framesLength ? 0 : currentFrame + 1;
    const prevFrame = currentFrame - 1 < 0 ? framesLength : currentFrame - 1;

    return (

      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <MagicCard
            x={frames[currentFrame].x()}
            y={frames[currentFrame].y()}

            height={height}
            width={width}

            ref={reference}
            src={Card}

            increaseCounter={this.increaseCounter}
            decreaseCounter={this.decreaseCounter}
            nextStep={frames[nextStep]}
            prevStep={frames[prevFrame]}
          />
        </Layer>
        <Layer>
          <Text
            offsetX={20}
            text={`${currentFrame}|${this.state.frames.length - 1}`}
            x={stageWidth / 2}
            y={stageHeight - 30}/>
        </Layer>
      </Stage>

    )
  }
}

export default Stager