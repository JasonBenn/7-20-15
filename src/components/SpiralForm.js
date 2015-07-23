import React from 'react';
import $ from 'jquery'
import {TextInput} from './TextInput'

export class SpiralForm extends React.Component {
  serialize() {
    // Grab each child's state (using refs?), merge into one object. Meanwhile, placeholder:
    return { email: 'sup' }
  }

  render() {
    return (
      <form action="/api/spirals" method="POST" encType="multipart/form-data" onSubmit={this.props.onSubmit}>
        <TextInput initialValue={this.props.email} name="email" />
        <TextInput initialValue={this.props.thickness} name="thickness" />
        <TextInput initialValue={this.props.gridSize} name="gridSize" />
        <TextInput initialValue={this.props.color} name="color" />
        <input type="submit" value="Save" />
      </form>
    )
  }
}
