import React from 'react';
import { getSpiralPoints } from '../get-spiral-points'
import { List } from 'immutable'
import '../styles/canvas.scss'

export class SpiralCanvas extends React.Component {
  static propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    thickness: React.PropTypes.number,
    gridSize: React.PropTypes.number,
    color: React.PropTypes.string
  }

  static defaultProps = {
    height: 500,
    width: 500,
    thickness: 2,
    gridSize: 5,
    color: 'black'
  }

  paddingRatio = .1
  getSpiralTopLeft() {
    const topLeftX = this.props.width * this.paddingRatio
    const topLeftY = this.props.height * this.paddingRatio
    return [topLeftX, topLeftY]
  }

  getWidthAndHeightScaleFactors() {
    return ['width', 'height'].map(dim => {
      const spiralLengthAlongDim = this.props[dim] * (1 - this.paddingRatio * 2)
      return spiralLengthAlongDim / this.props.gridSize
    })
  }

  clearCanvas(ctx) {
    ctx.clearRect(0, 0, this.props.height, this.props.width)
  }

  paint(ctx) {
    this.clearCanvas(ctx)
    ctx.strokeStyle = this.props.color;
    ctx.lineWidth = this.props.thickness
    ctx.beginPath()
    ctx.moveTo(topLeftX, topLeftY)

    const [topLeftX, topLeftY] = this.getSpiralTopLeft()
    const [widthScaleFactor, heightScaleFactor] = this.getWidthAndHeightScaleFactors()

    getSpiralPoints(this.props.gridSize).forEach(([row, col]) => {
      ctx.lineTo(
        (col * widthScaleFactor) + topLeftX,
        (row * heightScaleFactor) + topLeftY
      )
    })

    ctx.stroke()
  }

  componentDidUpdate() {
    this.unfurl()
  }

  componentDidMount() {
    this.unfurl()
  }

  unfurl() {
    this.$el = React.findDOMNode(this)
    const ctx = this.$el.getContext('2d')
    this.paint(ctx)
  }

  getImage() {
    return this.$el.toDataURL("image/png");
  }

  render() {
    return (
      <canvas height={this.props.height} width={this.props.width}></canvas>
    );
  }
}
