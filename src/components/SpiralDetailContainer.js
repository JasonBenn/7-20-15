import React from 'react';
import $ from 'jquery'
import { SpiralCanvas } from './SpiralCanvas'
import { SpiralForm } from './SpiralForm'
import { camelizeKeys } from '../utils'

export class SpiralDetailContainer extends React.Component {
  componentDidMount() {
    $.get('/api/spirals/1').done(data => this.setState(() => camelizeKeys(data)))
  }

  saveCanvas = (e) => {
    e.preventDefault()
    const formData = new FormData();
    const image = this.refs.canvas.getImage()
    const args = this.refs.form.serialize()
    formData.append('image', image)
    formData.append('args', JSON.stringify(args))
    const req = new XMLHttpRequest()
    req.open('POST', 'http://localhost:4567/api/spirals')
    req.send(formData)

    // To test serialize, comment the above and uncomment this:
    // const args = this.refs.form.serialize()
    // console.log('saveCanvas', args)
  }

  patch = (attrs) => {
    // persist to backend?
    this.setState(attrs)
  }

  render() {
    return (
      <div>
        <SpiralCanvas ref='canvas' {...this.state}></SpiralCanvas>
        <SpiralForm patch={this.patch} ref='form' {...this.state} onSubmit={this.saveCanvas}></SpiralForm>
      </div>
    )
  }
}
