import React from 'react';
import $ from 'jquery'
import {TextInput} from './TextInput'

export class SpiralForm extends React.Component {
  serialize() {
    // Grab each child's state (using refs?), merge into one object. Meanwhile, placeholder:
    return { email: 'sup' }
  }
  static fields = ['email', 'thickness', 'gridSize', 'color']

  render() {
    return (
      <form action="/api/spirals" method="POST" encType="multipart/form-data" onSubmit={this.props.onSubmit}>
        {this.constructor.fields.map((field, i) => {
          return <TextInput onChange={this.props.onFieldChange} value={this.props[field]} name={field} key={i} />
        })}
        <input type="submit" value="Save" />
      </form>
    )
  }
}
