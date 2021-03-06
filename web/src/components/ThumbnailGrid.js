import React from 'react';
import '../styles/grid.scss'
import { imageURLFromID } from '../utils'

export class ThumbnailGrid extends React.Component {
  render() {
    const spirals = this.props.spiralsData.map((spiralData, i) => this.renderThumbnail(spiralData, i))
    return (
      <div className="grid">
        {spirals}
      </div>
    )
  }

  renderThumbnail(spiralData, key) {
    return (
      <div className="grid-item" key={key}>
        <img src={spiralData.id + '.png'} />
        <p>gridSize {spiralData.gridSize}</p>
        <p>id {imageURLFromID(spiralData.id)}</p>
      </div>
    )
  }
}
