import React from 'react';
import $ from 'jquery'
import { SpiralCanvas } from './SpiralCanvas'
import { SpiralForm } from './SpiralForm'
import { camelizeKeys } from '../utils'

export class SpiralDetailContainer extends React.Component {
  componentDidMount() {
    $.get('/api/spirals/1').done(data => this.setState(() => camelizeKeys(data)))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <SpiralCanvas {...this.state}></SpiralCanvas>
        <SpiralForm></SpiralForm>
      </div>
    )
  }
}
