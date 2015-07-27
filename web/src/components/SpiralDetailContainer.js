import React from 'react';
import http from '../http'
import { SpiralCanvas } from './SpiralCanvas'
import { SpiralForm } from './SpiralForm'
import { parseSpiralData } from '../utils'

export class SpiralDetailContainer extends React.Component {
  componentDidMount() {
    // dynamic id...
    http.get('/api/spirals/1').done(data => this.setState(() => parseSpiralData(data)))
  }

  save = (e) => {
    const canvasComponent = this.refs.canvas
    e.preventDefault()
    const image = canvasComponent.getImage()
    http.multiPartPost('/api/spirals', {...this.state, image}, (err, res) => {
      console.log(arguments)
    })
  }

  patch = (attrs) => {
    this.setState(attrs)
  }

  render() {
    return (
      <div>
        <SpiralCanvas ref='canvas' {...this.state}></SpiralCanvas>
        <SpiralForm onFieldChange={this.patch} {...this.state} onSubmit={this.save}></SpiralForm>
      </div>
    )
  }
}
