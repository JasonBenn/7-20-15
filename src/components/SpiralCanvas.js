import React from 'react';
import { getSpiralPoints } from '../get-spiral-points'
import { List } from 'immutable'
import '../styles/canvas.scss'

export class SpiralCanvas extends React.Component {
  static propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    lineWidth: React.PropTypes.number,
    gridSize: React.PropTypes.number,
    color: React.PropTypes.string
  }

  static defaultProps = {
    height: 500,
    width: 500,
    lineWidth: 1,
    gridSize: 10,
    color: 'black'
  }

  paint(ctx) {
    ctx.clearRect(0, 0, this.props.height, this.props.width)
    ctx.strokeStyle = this.props.color;
    ctx.lineWidth = this.props.lineWidth

    const paddingRatio = .1
    const spiralHeight = this.props.height * (1 - paddingRatio * 2)
    const spiralWidth = this.props.width * (1 - paddingRatio * 2)
    const topLeftX = this.props.width * paddingRatio
    const topLeftY = this.props.height * paddingRatio
    const heightScaleFactor = spiralHeight / this.props.gridSize
    const widthScaleFactor = spiralWidth / this.props.gridSize

    ctx.beginPath()
    ctx.moveTo(topLeftX, topLeftY)
    getSpiralPoints(this.props.gridSize).forEach(([row, col]) => {
      ctx.lineTo(
        (col * widthScaleFactor) + topLeftX, 
        (row * heightScaleFactor) + topLeftY
      )
    })
    ctx.stroke()
  }

  componentDidUpdate(prevProps, prevState) {
    const $el = React.findDOMNode(this)
    const ctx = $el.getContext('2d')
    this.paint(ctx)    
  }

  componentDidMount() {
    const $el = React.findDOMNode(this)
    const ctx = $el.getContext('2d')
    this.paint(ctx)

    // const formData = new FormData();
    // const image = $el.toDataURL("image/png");
    // formData.append('image', image)
    // const req = new XMLHttpRequest()
    // req.open('POST', 'http://localhost:4567/api/spirals')
    // req.send(formData)
  }

  render() {
    return (
      <canvas height={this.props.height} width={this.props.width}></canvas>
    );
  }
}
