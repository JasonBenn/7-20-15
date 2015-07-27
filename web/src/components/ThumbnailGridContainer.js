import React from 'react'
import http from '../http'
import { ThumbnailGrid } from './ThumbnailGrid'
import { parseSpiralData } from '../utils'

export class ThumbnailGridContainer extends React.Component {
  componentDidMount() {
    http.get('/api/spirals').done(data => this.setState({ spiralsData: data.map(spiral => parseSpiralData(spiral)) }))
  }

  state = { spiralsData: [] }

  render() {
    return (
      <ThumbnailGrid spiralsData={this.state.spiralsData} />
    )
  }
}
