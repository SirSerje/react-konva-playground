import React from 'react';
import { Group, Text } from 'react-konva';
import URLImage from './UriImage';
import Card from '../card.png';
import Konva from 'konva'

const TWEEN_TIME = .3;

class MagicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [
        { id: 1, text: 'Eat apples', hover: false },
        { id: 2, text: 'Walk around', hover: false },
        { id: 3, text: 'Do nothing', hover: false },
        { id: 4, text: 'Breathe deeply', hover: false }],
    };
  }


  togglePrevTween = (e) => {
    const { x, y } = this.props.prevStep;
    const tween = new Konva.Tween({
      node: this.imageNode,
      duration: TWEEN_TIME,
      easing: Konva.Easings.EaseInOut,
      x: x(),
      y: y(),
    });
    tween.play();
    this.props.decreaseCounter();
  }

  toggleNextTween = (e) => {
    const { x, y } = this.props.nextStep;
    const tween = new Konva.Tween({
      node: this.imageNode,
      duration: TWEEN_TIME,
      easing: Konva.Easings.EaseInOut,
      x: x(),
      y: y(),
    });
    tween.play();
    this.props.increaseCounter();
  }

  hoverOn = (e) => {
    console.log(e.target);
  }

  hoverOf = (e) => {
    console.log(e.target);
  }

  render() {
    const textOffsetX = 24;
    const textOffsetY = 260
    const deltaY = 34;
    const fontSize = 30;
    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        ref={node => this.imageNode = node}
      >
        <URLImage
          ref={node => this.mainCard = node}
          src={Card}
          width={this.props.width}
          height={this.props.height}
          onClick={this.props.onClick}
        />
        {this.state.elements.map((item) => {
          return (
            <Text
              id={item.id}
              text={item.text}
              fill={'green'}
              fontSize={fontSize}
              x={-this.props.width / 2 + textOffsetX}
              y={-this.props.height / 2 + textOffsetY + deltaY * item.id}
              onClick={(e) => console.log(e.target)}
              onMouseOver={(e) => {
                const currentId = e.target.id()
                const { elements } = this.state;
                const newElements = elements.map(({ id, text, hover }) => {
                  if (currentId === id) {
                    return ({ id, text, hover: true })
                  } else {
                    return ({ id, text, hover })
                  }
                })
                this.setState({ elements: newElements })
              }}
              onMouseOut={(e) => {
                const currentId = e.target.id()
                const { elements } = this.state;
                const newElements = elements.map(({ id, text, hover }) => {
                  if (currentId === id) {
                    return ({ id, text, hover: false })
                  } else {
                    return ({ id, text, hover })
                  }
                })
                this.setState({ elements: newElements })
              }}
              shadowBlur={item.hover ? 10 : 0}
              shadowOpacity={.35}
            />

          )
        })}
      </Group>
    )
  }
}

export default MagicCard;
