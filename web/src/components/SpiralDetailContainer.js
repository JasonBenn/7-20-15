import React from 'react';
import http from '../http'
import { SpiralCanvas } from './SpiralCanvas'
import { SpiralForm } from './SpiralForm'
import { parseSpiralData } from '../utils'

export class SpiralDetailContainer extends React.Component {
  componentDidMount() {
    http.get('/api/spirals/' + this.props.params.id).done(data =>
      this.setState(() => parseSpiralData(data))
    )
  }

  save = (e) => {
    e.preventDefault()
    const canvasComponent = this.refs.canvas
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
