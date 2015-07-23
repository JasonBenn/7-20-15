import React from 'react';
import { getSpiralPoints } from '../get-spiral-points'
import { List } from 'immutable'
import '../styles/canvas.scss'

export class Canvas extends React.Component {
  componentDidMount() {
    const $el = React.findDOMNode(this)
    const ctx = $el.getContext('2d')

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
    const spiralPoints = getSpiralPoints(this.props.gridSize)
    spiralPoints.forEach(([row, col]) => {
      ctx.lineTo((col * widthScaleFactor) + topLeftX, (row * heightScaleFactor) + topLeftY)
    })
    ctx.stroke()
  }

  render() {
    return (
      <canvas height={this.props.height} width={this.props.width}></canvas>
    );
  }
}
