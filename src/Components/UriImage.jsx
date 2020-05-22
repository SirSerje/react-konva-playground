import React from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';


class URLImage extends React.Component {
  state = {
    image: null,
  };

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }

  loadImage() {
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({ image: this.image })
  };


  render() {

    return (
      <Image
        width={this.props.width}
        height={this.props.height}
        image={this.state.image}
        offsetX={this.props.width / 2}
        offsetY={this.props.height / 2}
        onClick={this.props.onClick}
      />
    );
  }
}


export default URLImage